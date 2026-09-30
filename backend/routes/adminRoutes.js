const express = require("express");
const Student = require("../models/Student");
const Company = require("../models/Company");
const Job = require("../models/Job");
const Application = require("../models/Application");

const router = express.Router();

router.get("/stats", async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();
        const totalCompanies = await Company.countDocuments();
        const totalJobs = await Job.countDocuments();
        const totalApplications = await Application.countDocuments();
        const selectedStudents = await Application.countDocuments({
            status: "Selected"
        });

        res.status(200).json({
            totalStudents,
            totalCompanies,
            totalJobs,
            totalApplications,
            selectedStudents
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch statistics",
            error: error.message
        });
    }
});

module.exports = router;