const { generateSlug } = require("../helpers/utils");
const projectSchema = require("../models/projectSchema");

const createProject = async (req, res) => {
  const {title, description} = req.body;

  try {
    const slug = generateSlug(title);
    const project = await projectSchema({
     title,
     description,
     slug,
     author: req.user._id,
    });

    project.save();
   res.status(200).send({ message: "Project created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server is error" });
  }
};

const projectList = async (req, res) => {
  try {
    const { search } = req.query;
    const projects = await projectSchema.find({ 
      $or: [
        {author:  req.user._id }, 
        { members: req.user._id },
      ],
      title: {
      $regex: search || " ", $options: "i"
    }
  }).populate("author", "fullName avatar");
    if(!projects) return res.status(400).send({ message: "project not found" });
     res.status(200).send({ projects })
  } catch (error) {
    res.status(500).send({ message: "Internal server is error" });
  }
}

const addTeamMembersToProject = async (req, res) => {
  const { email, projectId } =  req.body;
  try {
    const existEmail = await authSchema.findOne({ email });
    if(!existEmail) return res.status(400).send({ message: "email is not exist" });


    const existMembers = await projectSchema.findOne({ 
      $or: [
        { author:  existEmail._id }, 
        { members: existEmail._id },
      ],
    });

    if(existMembers) return res.status(400).send({message: "this member is already exit"});
    const project = await projectSchema.findOneAndUpdate({ _id: projectId }, { members: existEmail._id }, {new: true});
    if(!project) return res.status(400).send({ message: "invalid request" });

    res.status(200).send({ message: "team members added successfully" });

  } catch (error) {
     console.log(error);
     res.status(500).send({ message: "Internal server is error" });
  }
}


module.exports = { createProject, projectList, addTeamMembersToProject };