import React, { useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AvailableJobs from "./pages/availableJobs";
import MyApplications from "./pages/MyApplications";
import AdminDashboard from "./pages/AdminDashboard";
import CompanyRegistration from "./pages/CompanyRegistration";
import CompanyList from "./pages/CompanyList";

function App() {

    const [studentOpen, setStudentOpen] = useState(true);
    const [companyOpen, setCompanyOpen] = useState(false);

    return (
        <BrowserRouter>

            <div className="app-layout">

                {/* ================= SIDEBAR ================= */}

                <aside className="sidebar">

                    <div className="sidebar-title">
                        <h2>Placement</h2>
                        <p>Management System</p>
                    </div>


                    {/* HOME */}

                    <Link to="/" className="home-link">
                        🏠 Home
                    </Link>


                    {/* ================= STUDENT ================= */}

                    <div className="menu-section">

                        <button
                            className="menu-title"
                            onClick={() =>
                                setStudentOpen(!studentOpen)
                            }
                        >
                            <span>🎓 Student</span>
                            <span>
                                {studentOpen ? "▲" : "▼"}
                            </span>
                        </button>


                        {studentOpen && (
                            <div className="submenu">

                                <Link to="/login">
                                    🔐 Login
                                </Link>

                                <Link to="/register">
                                    📝 Register
                                </Link>

                                <Link to="/dashboard">
                                    📊 Dashboard
                                </Link>

                                <Link to="/available-jobs">
                                    💼 Jobs
                                </Link>

                                <Link to="/my-applications">
                                    📋 My Applications
                                </Link>

                            </div>
                        )}

                    </div>


                    {/* ================= COMPANIES ================= */}

                    <div className="menu-section">

                        <button
                            className="menu-title"
                            onClick={() =>
                                setCompanyOpen(!companyOpen)
                            }
                        >
                            <span>🏢 Companies</span>
                            <span>
                                {companyOpen ? "▲" : "▼"}
                            </span>
                        </button>


                        {companyOpen && (
                            <div className="submenu">

                                <Link to="/admin">
                                    📊 Admin
                                </Link>

                                <Link to="/company-registration">
                                    📝 Company Registration
                                </Link>

                                <Link to="/companies">
                                    🏢 Companies
                                </Link>

                            </div>
                        )}

                    </div>

                </aside>


                {/* ================= MAIN CONTENT ================= */}

                <main className="main-content">

                    <Routes>

                        <Route
                            path="/"
                            element={<Home />}
                        />

                        <Route
                            path="/login"
                            element={<Login />}
                        />

                        <Route
                            path="/register"
                            element={<Register />}
                        />

                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/available-jobs"
                            element={<AvailableJobs />}
                        />

                        <Route
                            path="/my-applications"
                            element={<MyApplications />}
                        />

                        <Route
                            path="/admin"
                            element={<AdminDashboard />}
                        />

                        <Route
                            path="/company-registration"
                            element={<CompanyRegistration />}
                        />

                        <Route
                            path="/companies"
                            element={<CompanyList />}
                        />

                    </Routes>

                </main>

            </div>

        </BrowserRouter>
    );
}

export default App;