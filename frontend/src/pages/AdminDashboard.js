import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
    const [applications, setApplications] = useState([]);

    const [stats, setStats] = useState({
        totalStudents: 0,
        totalCompanies: 0,
        totalJobs: 0,
        totalApplications: 0,
        selectedStudents: 0
    });

    useEffect(() => {
        fetchApplications();
        fetchStats();
    }, []);

    // Fetch all applications
    const fetchApplications = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/applications"
            );

            setApplications(response.data);

        } catch (error) {
            console.log(error);
            alert("Failed to load applications");
        }
    };

    // Fetch dashboard statistics
    const fetchStats = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/admin/stats"
            );

            setStats(response.data);

        } catch (error) {
            console.log(error);
            alert("Failed to load statistics");
        }
    };

    // Update application status
    const updateStatus = async (id, status) => {
        try {
            await axios.put(
                `http://localhost:5000/api/applications/${id}`,
                {
                    status: status
                }
            );

            alert("Status updated successfully!");

            fetchApplications();
            fetchStats();

        } catch (error) {
            console.log(error);
            alert("Failed to update status");
        }
    };

    return (
        <div className="admin-container">

            <h1>Admin Dashboard</h1>

            {/* ================= STATISTICS ================= */}

            <div className="stats-container">

                <div className="stat-card">
                    <h3>👨‍🎓 Total Students</h3>
                    <h2>{stats.totalStudents}</h2>
                </div>

                <div className="stat-card">
                    <h3>🏢 Total Companies</h3>
                    <h2>{stats.totalCompanies}</h2>
                </div>

                <div className="stat-card">
                    <h3>💼 Total Jobs</h3>
                    <h2>{stats.totalJobs}</h2>
                </div>

                <div className="stat-card">
                    <h3>📝 Applications</h3>
                    <h2>{stats.totalApplications}</h2>
                </div>

                <div className="stat-card">
                    <h3>🏆 Selected</h3>
                    <h2>{stats.selectedStudents}</h2>
                </div>

            </div>

            {/* ================= APPLICATIONS ================= */}

            <h2>Student Applications</h2>

            {applications.length === 0 ? (
                <p>No applications available.</p>
            ) : (

                <div className="admin-applications">

                    {applications.map((application) => (

                        <div
                            className="admin-card"
                            key={application._id}
                        >

                            {/* Student Information */}

                            <h3>
                                👨‍🎓 Student Information
                            </h3>

                            <p>
                                <strong>Name:</strong>{" "}
                                {application.studentDetails?.name ||
                                    "N/A"}
                            </p>

                            <p>
                                <strong>Email:</strong>{" "}
                                {application.studentDetails?.email ||
                                    "N/A"}
                            </p>

                            <hr />

                            {/* Job Information */}

                            <h3>
                                💼 Job Information
                            </h3>

                            <p>
                                <strong>Company:</strong>{" "}
                                {application.jobDetails?.company ||
                                    "N/A"}
                            </p>

                            <p>
                                <strong>Job Role:</strong>{" "}
                                {application.jobDetails?.jobRole ||
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

                            <hr />

                            {/* Application Status */}

                            <p>
                                <strong>Current Status:</strong>{" "}
                                {application.status}
                            </p>

                            <label>
                                <strong>
                                    Update Status:
                                </strong>
                            </label>

                            <select
                                value={application.status}
                                onChange={(e) =>
                                    updateStatus(
                                        application._id,
                                        e.target.value
                                    )
                                }
                            >
                                <option value="Applied">
                                    Applied
                                </option>

                                <option value="Shortlisted">
                                    Shortlisted
                                </option>

                                <option value="Interview">
                                    Interview
                                </option>

                                <option value="Selected">
                                    Selected
                                </option>

                                <option value="Rejected">
                                    Rejected
                                </option>
                            </select>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default AdminDashboard;