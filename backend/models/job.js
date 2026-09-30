const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: true
        },

        jobRole: {
            type: String,
            required: true
        },

        package: {
            type: String,
            required: true
        },

        location: {
            type: String,
            required: true
        },

        eligibility: {
            type: String,
            required: true
        },

        lastDate: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Job", jobSchema);
