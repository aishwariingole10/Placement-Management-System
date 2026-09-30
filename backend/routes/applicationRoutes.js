const express = require("express");
const Application = require("../models/Application");

const router = express.Router();

// Apply for Job
router.post("/", async (req, res) => {
    try {
        const { student, job } = req.body;

        const existingApplication = await Application.findOne({
            student,
            job
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "Student already applied for this job"
            });
        }

        const application = new Application({
            student,
            job
        });

        await application.save();

        res.status(201).json({
            message: "Job application submitted successfully",
            application
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to apply for job",
            error: error.message
        });
    }
});

// Get All Applications
router.get("/", async (req, res) => {
    try {
        const applications = await Application.aggregate([
            {
                $lookup: {
                    from: "jobs",
                    localField: "job",
                    foreignField: "_id",
                    as: "jobDetails"
                }
            },
            {
                $unwind: {
                    path: "$jobDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "students",
                    let: { studentId: "$student" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: [
                                        "$_id",
                                        {
                                            $convert: {
                                                input: "$$studentId",
                                                to: "objectId",
                                                onError: null,
                                                onNull: null
                                            }
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                password: 0
                            }
                        }
                    ],
                    as: "studentDetails"
                }
            },
            {
                $unwind: {
                    path: "$studentDetails",
                    preserveNullAndEmptyArrays: true
                }
            }
        ]);

        res.status(200).json(applications);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch applications",
            error: error.message
        });
    }
});

// Get Application by ID
router.get("/", async (req, res) => {
    try {
        const applications = await Application.aggregate([
            {
                $lookup: {
                    from: "jobs",
                    localField: "job",
                    foreignField: "_id",
                    as: "jobDetails"
                }
            },
            {
                $unwind: {
                    path: "$jobDetails",
                    preserveNullAndEmptyArrays: true
                }
            }
        ]);

        res.status(200).json(applications);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch applications",
            error: error.message
        });
    }
});

// Update Application Status
router.put("/:id", async (req, res) => {
    try {
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { returnDocument: "after" }
        );

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.status(200).json({
            message: "Application status updated successfully",
            application
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update application",
            error: error.message
        });
    }
});

module.exports = router;