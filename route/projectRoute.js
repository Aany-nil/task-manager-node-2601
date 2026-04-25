const express = require("express");
const { createProject, projectList, addTeamMembersToProject } = require("../controllers/projectController");
const router = express.Router();

router.post("/create", createProject);
router.get("/list", projectList);
router.post("/addmembers", addTeamMembersToProject)

module.exports = router;