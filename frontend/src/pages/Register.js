import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [course, setCourse] = useState("");
    const [college, setCollege] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/students/register",
                {
                    name,
                    email,
                    password,
                    phone,
                    course,
                    college
                }
            );

            console.log(response.data);

            alert("Registration successful!");

            // Registration ke baad Login page
            navigate("/login");

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div className="form-container">

            <h2>📝 Student Registration</h2>

            <form onSubmit={handleRegister}>

                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    required
                />

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    required
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    required
                />

                <input
                    type="tel"
                    placeholder="Enter Phone Number"
                    value={phone}
                    onChange={(e) =>
                        setPhone(e.target.value)
                    }
                    required
                />

                <input
                    type="text"
                    placeholder="Enter Course"
                    value={course}
                    onChange={(e) =>
                        setCourse(e.target.value)
                    }
                    required
                />

                <input
                    type="text"
                    placeholder="Enter College"
                    value={college}
                    onChange={(e) =>
                        setCollege(e.target.value)
                    }
                    required
                />

                <button type="submit">
                    Register
                </button>

            </form>

        </div>
    );
}

export default Register;