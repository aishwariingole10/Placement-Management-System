const express = require("express");
const Job = require("../models/Job");

const router = express.Router();

// Add Job
router.post("/", async (req, res) => {
    try {
        const job = new Job(req.body);

        await job.save();

        res.status(201).json({
            message: "Job added successfully",
            job
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add job",
            error: error.message
        });
    }
});

// Get All Jobs
router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find();

        res.status(200).json(jobs);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch jobs",
            error: error.message
        });
    }
});

// Get Job by ID
router.get("/:id", async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.status(200).json(job);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch job",
            error: error.message
        });
    }
});

// Update Job
router.put("/:id", async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after" }
        );

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.status(200).json({
            message: "Job updated successfully",
            job
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update job",
            error: error.message
        });
    }
});

// Delete Job
router.delete("/:id", async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.status(200).json({
            message: "Job deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Job deleted successfully"
        });
    }
});

module.exports = router;