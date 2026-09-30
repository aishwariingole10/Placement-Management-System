import React, { useEffect, useState } from "react";
import axios from "axios";

function AvailableJobs() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/jobs"
            );

            setJobs(response.data);
        } catch (error) {
            console.log(error);
            alert("Failed to load jobs");
        }
    };

    const applyJob = async (jobId) => {
        try {
            const student = JSON.parse(
                localStorage.getItem("student")
            );

            if (!student) {
                alert("Please login first");
                return;
            }

            await axios.post(
                "http://localhost:5000/api/applications",
                {
                    student: student.id,
                    job: jobId
                }
            );

            alert("Application submitted successfully!");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to apply for job"
            );
        }
    };

    return (
        <div className="jobs-container">

            <div className="jobs-header">
                <h1>Available Job Opportunities</h1>
                <p>
                    Explore the latest placement opportunities
                    and apply for suitable positions.
                </p>
            </div>

            {jobs.length === 0 ? (
                <div className="no-jobs">
                    <h3>📭 No Jobs Available</h3>
                    <p>
                        There are currently no job opportunities
                        available.
                    </p>
                </div>
            ) : (

                <div className="jobs-list">

                    {jobs.map((job) => (

                        <div
                            className="job-card"
                            key={job._id}
                        >

                            <div className="job-card-header">

                                <div className="company-icon">
                                    🏢
                                </div>

                                <div>
                                    <h2>{job.jobRole}</h2>
                                    <p className="company-name">
                                        {job.company}
                                    </p>
                                </div>

                            </div>

                            <div className="job-details">

                                <p>
                                    <strong>💰 Package</strong>
                                    <span>{job.package}</span>
                                </p>

                                <p>
                                    <strong>📍 Location</strong>
                                    <span>{job.location}</span>
                                </p>

                                <p>
                                    <strong>🎓 Eligibility</strong>
                                    <span>{job.eligibility}</span>
                                </p>

                                <p>
                                    <strong>📅 Last Date</strong>
                                    <span>
                                        {new Date(
                                            job.lastDate
                                        ).toLocaleDateString()}
                                    </span>
                                </p>

                            </div>

                            <button
                                className="apply-button"
                                onClick={() =>
                                    applyJob(job._id)
                                }
                            >
                                Apply Now →
                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default AvailableJobs;