const express = require("express");
const { createProject, projectList, addTeamMembersToProject, addTaskToProject } = require("../controllers/projectController");
const router = express.Router();

router.post("/create", createProject);
router.get("/list", projectList);
router.post("/addmembers", addTeamMembersToProject)
router.post("/addtask", addTaskToProject);

module.exports = router;