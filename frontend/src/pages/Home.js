import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-container">

            <div className="home-content">

                <h1>Welcome to Placement Opportunities</h1>

                <p>
                    A simple platform to manage college placements,
                    job opportunities, and student applications.
                </p>

                <div className="home-buttons">
                    <Link to="/login" className="home-btn">
                        Student Login
                    </Link>

                    <Link to="/register" className="home-btn register-btn">
                        Register Now
                    </Link>
                </div>

            </div>

            <div className="home-features">

                <div className="feature-card">
                    <div className="feature-icon">🎓</div>
                    <h3>For Students</h3>
                    <p>
                        Register, login and explore available
                        placement opportunities.
                    </p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">💼</div>
                    <h3>Job Opportunities</h3>
                    <p>
                        View company jobs and apply for suitable
                        positions.
                    </p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">📊</div>
                    <h3>Track Applications</h3>
                    <p>
                        Check your application and placement status
                        easily.
                    </p>
                </div>

            </div>

        </div>
    );
}

export default Home;