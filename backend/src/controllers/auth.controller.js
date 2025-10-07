import { generateToken } from "../lib/utils.js"
import User from "../models/User.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body

  try {
    // Check for missing fields
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" })
    }

    // Check if email already exists
    const user = await User.findOne({ email }) // ✅ fixed typo: findOnne → findOne
    if (user) {
      return res.status(400).json({ message: "Email already exists" })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    })

    // await newUser.save()

    
    if (!newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res)
    }

    // Generate token and send response
    generateToken(newUser._id, res)

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    })
  } catch (error) {
    console.error("Error in signup controller:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}



//login

export const login = async (req, res) => {
  res.send("login endpoint")
}

export const logout = async (req, res) => {
  res.send("logout endpoint")
}
