const express = require("express");
const Company = require("../models/Company");

const router = express.Router();

// Add Company
router.post("/", async (req, res) => {
    try {
        const company = new Company(req.body);

        await company.save();

        res.status(201).json({
            message: "Company added successfully",
            company
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add company",
            error: error.message
        });
    }
});

// Get All Companies
router.get("/", async (req, res) => {
    try {
        const companies = await Company.find();

        res.status(200).json(companies);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch companies",
            error: error.message
        });
    }
});

// Get Company by ID
router.get("/:id", async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({
                message: "Company not found"
            });
        }

        res.status(200).json(company);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch company",
            error: error.message
        });
    }
});

// Update Company
router.put("/:id", async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!company) {
            return res.status(404).json({
                message: "Company not found"
            });
        }

        res.status(200).json({
            message: "Company updated successfully",
            company
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update company",
            error: error.message
        });
    }
});

// Delete Company
router.delete("/:id", async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);

        if (!company) {
            return res.status(404).json({
                message: "Company not found"
            });
        }

        res.status(200).json({
            message: "Company deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete company",
            error: error.message
        });
    }
});

module.exports = router;