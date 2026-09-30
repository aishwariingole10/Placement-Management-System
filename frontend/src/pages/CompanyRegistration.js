import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CompanyRegistration() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [website, setWebsite] = useState("");
    const [jobRole, setJobRole] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:5000/api/companies",
                {
                    name,
                    email,
                    location,
                    website,
                    jobRole
                }
            );

            alert("Company registered successfully!");

            setName("");
            setEmail("");
            setLocation("");
            setWebsite("");
            setJobRole("");

            navigate("/companies");

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Company registration failed"
            );
        }
    };

    return (
        <div className="form-container">
            <h2>🏢 Company Registration</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Enter Company Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Enter Company Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Enter Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Enter Website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Enter Job Role"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    required
                />

                <button type="submit">
                    Register Company
                </button>

            </form>
        </div>
    );
}

export default CompanyRegistration;