const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

const router = express.Router();

// Student Registration
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, phone, course, college } = req.body;

        // Check if student already exists
        const existingStudent = await Student.findOne({ email });

        if (existingStudent) {
            return res.status(400).json({
                message: "Student already registered with this email"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new student
        const student = new Student({
            name,
            email,
            password: hashedPassword,
            phone,
            course,
            college
        });

        await student.save();

        res.status(201).json({
            message: "Student registered successfully",
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                phone: student.phone,
                course: student.course,
                college: student.college
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
});


// Get All Students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find().select("-password");

        res.status(200).json(students);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch students",
            error: error.message
        });
    }
});


// Student Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const student = await Student.findOne({ email });

        if (!student) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            student.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: student._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token: token,
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                phone: student.phone,
                course: student.course,
                college: student.college
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
});

module.exports = router;