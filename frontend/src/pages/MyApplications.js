import React, { useEffect, useState } from "react";
import axios from "axios";

function MyApplications() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/applications"
            );

            const student = JSON.parse(
                localStorage.getItem("student")
            );

            const myApplications = response.data.filter(
                (application) =>
                    application.student === student?.id
            );

            setApplications(myApplications);

        } catch (error) {
            console.log(error);
            alert("Failed to load applications");
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "Selected":
                return "status selected";

            case "Rejected":
                return "status rejected";

            case "Shortlisted":
                return "status shortlisted";

            case "Interview":
                return "status interview";

            default:
                return "status applied";
        }
    };

    return (
        <div className="applications-container">

            <h1>My Applications</h1>

            {applications.length === 0 ? (
                <p>You have not applied for any job yet.</p>
            ) : (

                <div className="applications-list">

                    {applications.map((application) => (

                        <div
                            className="application-card"
                            key={application._id}
                        >

                            <h2>
                                {application.jobDetails?.jobRole ||
                                    "Job"}
                            </h2>

                            <p>
                                <strong>Company:</strong>{" "}
                                {application.jobDetails?.company ||
                                    "N/A"}
                            </p>

                            <p>
                                <strong>Package:</strong>{" "}
                                {application.jobDetails?.package ||
                                    "N/A"}
                            </p>

                            <p>
                                <strong>Location:</strong>{" "}
                                {application.jobDetails?.location ||
                                    "N/A"}
                            </p>

                            <p>
                                <strong>Applied Date:</strong>{" "}
                                {new Date(
                                    application.createdAt
                                ).toLocaleDateString()}
                            </p>

                            <p>
                                <strong>Status:</strong>{" "}

                                <span
                                    className={getStatusClass(
                                        application.status
                                    )}
                                >
                                    {application.status}
                                </span>

                            </p>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}

export default MyApplications;