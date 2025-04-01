const User = require('../models/User');

// Get All Users (Patients & Doctors)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: { $in: ['patient', 'doctor'] } });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
