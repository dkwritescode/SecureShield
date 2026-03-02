const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { companyName, email, password } = req.body;

        if (!companyName || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            companyName,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;

// const express = require("express");
// const router = express.Router();

// router.post("/signup", (req, res) => {
//     console.log(">>> SIGNUP ROUTE HIT <<<");
//     res.json({ message: "Signup route working" });
// });

// module.exports = router;