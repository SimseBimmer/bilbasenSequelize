import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { userModel } from "../models/userModel.js"; // Ensure this line is correct

dotenv.config();

// Function to generate a JWT token
export const generateToken = (user, type) => {
  const expTime = Math.floor(Date.now() / 1000) + +process.env[`TOKEN_${type.toUpperCase()}_EXPIRATION_SECS`];
  return jwt.sign({ exp: expTime, data: { id: user.id } }, process.env[`TOKEN_${type.toUpperCase()}_KEY`]);
};

// Function to authenticate the user
export const Authenticate = async (req, res) => {
  const { email, password } = req.body;
  console.log(`Login attempt: email=${email}, password=${password}`);
  if (!email || !password) return res.sendStatus(400); // Bad request if credentials are missing

  try {
    // Find user in the database
    const user = await userModel.findOne({
      attributes: ["id", "firstname", "lastname", "password"],
      where: { email: email, is_active: 1 },
    });

    if (!user) {
      console.log("User not found");
      return res.sendStatus(401); // Unauthorized if user does not exist
    }

    // Validate password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid password");
      return res.sendStatus(401); // Unauthorized if password is incorrect
    }

    // Generate JWT tokens
    const refresh_token = generateToken(user, "refresh");
    const access_token = generateToken(user, "access");

    // Store the refresh token in the database
    await userModel.update({ refresh_token }, { where: { id: user.id } });

    // Send tokens and user data to the client
    console.log("Login successful");
    res.json({ access_token, user: { id: user.id, firstname: user.firstname, lastname: user.lastname } });
  } catch (error) {
    console.log("Server error", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};