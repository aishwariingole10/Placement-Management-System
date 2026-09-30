import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
    const student = JSON.parse(
        localStorage.getItem("student")
    );

    return (
        <div className="dashboard-container">

            {/* Page Title */}
            <div className="dashboard-header">
                <h1>Student Dashboard</h1>
                <p>
                    Welcome back,{" "}
                    <strong>
                        {student?.name || "Student"}
                    </strong>{" "}
                    👋
                </p>
            </div>

            {/* Student Information */}
            <div className="student-info">

                <h2>👤 Student Information</h2>

                <div className="student-details">

                    <div>
                        <strong>Name</strong>
                        <p>{student?.name || "N/A"}</p>
                    </div>

                    <div>
                        <strong>Email</strong>
                        <p>{student?.email || "N/A"}</p>
                    </div>

                    <div>
                        <strong>Phone</strong>
                        <p>{student?.phone || "N/A"}</p>
                    </div>

                    <div>
                        <strong>Course</strong>
                        <p>{student?.course || "N/A"}</p>
                    </div>

                    <div>
                        <strong>College</strong>
                        <p>{student?.college || "N/A"}</p>
                    </div>

                </div>

            </div>

            {/* Dashboard Options */}
            <h2 className="section-title">
                Placement Services
            </h2>

            <div className="dashboard-options">

                {/* Available Jobs */}
                <div className="dashboard-card">

                    <div className="card-icon">
                        💼
                    </div>

                    <h3>Available Jobs</h3>

                    <p>
                        Explore the latest job opportunities
                        available for placement.
                    </p>

                    <Link to="/available-jobs">
                        View Jobs →
                    </Link>

                </div>

                {/* My Applications */}
                <div className="dashboard-card">

                    <div className="card-icon">
                        📝
                    </div>

                    <h3>My Applications</h3>

                    <p>
                        View your applied jobs and check
                        your application status.
                    </p>

                    <Link to="/my-applications">
                        View Applications →
                    </Link>

                </div>

                {/* Placement Status */}
                <div className="dashboard-card">

                    <div className="card-icon">
                        🏆
                    </div>

                    <h3>Placement Status</h3>

                    <p>
                        Track your final placement and
                        selection status.
                    </p>

                    <button type="button">
                        View Status →
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;