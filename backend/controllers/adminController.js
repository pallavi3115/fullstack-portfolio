const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Admin login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password - ALWAYS USE bcrypt.compare
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
};

// Create default admin
exports.createDefaultAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ email: 'admin@portfolio.com' });
    
    if (!adminExists) {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      const defaultAdmin = new Admin({
        email: 'admin@portfolio.com',
        password: hashedPassword
      });
      
      await defaultAdmin.save();
      console.log('✅ Default admin created');
    } else {
      console.log('✅ Admin already exists');
    }
  } catch (error) {
    console.error('Note: Admin creation issue -', error.message);
    // Don't crash the server for this
  }
};