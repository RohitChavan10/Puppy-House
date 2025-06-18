import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Ngo from '../models/Ngo.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// USER Register
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    res.status(201).json({ token: generateToken(user._id), user });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// NGO Register
export const registerNgo = async (req, res) => {
  const { organizationName, contactEmail, password } = req.body;
  try {
    const ngoExists = await Ngo.findOne({ contactEmail });
    if (ngoExists) return res.status(400).json({ msg: 'NGO already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const ngo = await Ngo.create({ organizationName, contactEmail, password: hashed });

    res.status(201).json({ token: generateToken(ngo._id), ngo });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// USER Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid password' });

    res.json({ token: generateToken(user._id), user });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// NGO Login
export const loginNgo = async (req, res) => {
  const { contactEmail, password } = req.body;
  try {
    const ngo = await Ngo.findOne({ contactEmail });
    if (!ngo) return res.status(400).json({ msg: 'NGO not found' });

    const isMatch = await bcrypt.compare(password, ngo.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid password' });

    res.json({ token: generateToken(ngo._id), ngo });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
