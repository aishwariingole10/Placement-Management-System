import React, { useEffect, useState } from "react";
import axios from "axios";

function CompanyList() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/companies"
            );

            setCompanies(response.data);
        } catch (error) {
            console.log(error);
            alert("Failed to load companies");
        }
    };

    const deleteCompany = async (id) => {
        if (!window.confirm("Are you sure you want to delete this company?")) {
            return;
        }

        try {
            await axios.delete(
                `http://localhost:5000/api/companies/${id}`
            );

            alert("Company deleted successfully!");
            fetchCompanies();

        } catch (error) {
            console.log(error);
            alert("Failed to delete company");
        }
    };

    return (
        <div className="companies-container">

            <div className="companies-header">
                <h1>🏢 Companies</h1>
                <p>View and manage registered companies</p>
            </div>

            {companies.length === 0 ? (
                <div className="no-companies">
                    <h3>🏢 No Companies Registered</h3>
                    <p>No company records are available.</p>
                </div>
            ) : (
                <div className="companies-list">

                    {companies.map((company) => (

                        <div
                            className="company-card"
                            key={company._id}
                        >

                            <div className="company-card-header">

                                <div className="company-big-icon">
                                    🏢
                                </div>

                                <div>
                                    <h2>{company.name}</h2>
                                    <p>{company.jobRole}</p>
                                </div>

                            </div>

                            <div className="company-details">

                                <p>
                                    <strong>📧 Email</strong>
                                    <span>{company.email}</span>
                                </p>

                                <p>
                                    <strong>📍 Location</strong>
                                    <span>{company.location}</span>
                                </p>

                                <p>
                                    <strong>🌐 Website</strong>
                                    <span>
                                        {company.website || "N/A"}
                                    </span>
                                </p>

                            </div>

                            <div className="company-actions">

                                <button>
                                    ✏️ Edit
                                </button>

                                <button
                                    className="delete-button"
                                    onClick={() =>
                                        deleteCompany(company._id)
                                    }
                                >
                                    🗑️ Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default CompanyList;