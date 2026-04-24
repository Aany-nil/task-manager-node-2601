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
    const projects = await projectSchema.find({ author: req.user._id });
    if(!projects) return res.status(400).send({ message: "project not found" });
     res.status(200).send({ projects })
  } catch (error) {
    res.status(500).send({ message: "Internal server is error" });
  }
}


module.exports = { createProject }