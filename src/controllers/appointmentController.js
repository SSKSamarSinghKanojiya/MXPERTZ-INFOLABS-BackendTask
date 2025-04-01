const Appointment = require("../models/Appointment");
const User = require("../models/User");

exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date } = req.body;

    console.log("Request Body:", req.body);
    console.log("Doctor ID:", doctorId);
    console.log("Date:", date);

    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== "doctor") {
      return res
        .status(404)
        .json({ message: "Doctor not found or invalid role" });
    }
    console.log("Found Doctor:", doctor);

    const appointment = new Appointment({
      patient: req.userId,
      doctor: doctorId,
      date,
    });

    await appointment.save();
    res
      .status(201)
      .json({ message: "Appointment booked successfully", appointment });
  } catch (err) {
    console.error("Booking Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Cancel an Appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });
    if (!appointment.patient.equals(req.userId)) {
      return res.status(403).json({ message: "Not authorized" });
    }
    appointment.status = "cancelled";
    await appointment.save();
    res.json({ message: "Appointment cancelled" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Appointments for Logged-In User
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.userId,
    }).populate("doctor");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
