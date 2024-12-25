import USER from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.JWT_KEY;

if (!SECRET_KEY) {
  throw new Error("JWT_KEY is not defined in the environment variables");
}

// SignUp Controller
export const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const imageFile = req.file;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "These fields are required" });
    }

    const existingUser = await USER.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "This Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new USER({
      name,
      email,
      password: hashedPassword,
      image: imageFile ? imageFile.path : null,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Account Created Successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        image: newUser.image,
      },
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// SignIn Controller
export const SignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await USER.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      user: { id: user._id, name: user.name, email: user.email, image: user.image },
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};
