import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Helper database abstraction layer for fallback mock support
const findUserByEmail = async (email) => {
  const normEmail = email.toLowerCase().trim();
  if (global.dbMode === "mock") {
    return global.mockUsers.find((u) => u.email === normEmail);
  }
  return await User.findOne({ email: normEmail });
};

const findUserById = async (id) => {
  if (global.dbMode === "mock") {
    return global.mockUsers.find((u) => u._id === id);
  }
  return await User.findById(id);
};

const createUser = async (email, hashedPassword) => {
  const normEmail = email.toLowerCase().trim();
  if (global.dbMode === "mock") {
    const newUser = {
      _id: `mock_user_${Date.now()}`,
      email: normEmail,
      password: hashedPassword,
      placementKitUnlocked: false,
      createdAt: new Date(),
    };
    global.mockUsers.push(newUser);
    return newUser;
  }
  const newUser = new User({ email: normEmail, password: hashedPassword });
  return await newUser.save();
};

// @route   POST /api/auth/signup
// @desc    Register a new user
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const savedUser = await createUser(email, hashedPassword);

    const token = jwt.sign(
      { id: savedUser._id, email: savedUser.email },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      token,
      user: {
        id: savedUser._id,
        email: savedUser.email,
        placementKitUnlocked: savedUser.placementKitUnlocked,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user and get token
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        placementKitUnlocked: user.placementKitUnlocked,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/auth/me
// @desc    Get user data from token
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Omit password from output
    const userResponse = {
      id: user._id,
      email: user.email,
      placementKitUnlocked: user.placementKitUnlocked,
    };
    
    res.json(userResponse);
  } catch (err) {
    console.error("Fetch user error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
