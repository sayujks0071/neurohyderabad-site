const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4002;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Data storage
const BOOKINGS_FILE = path.join(__dirname, 'bookings.json');

// Initialize bookings file if it doesn't exist
if (!fs.existsSync(BOOKINGS_FILE)) {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([], null, 2));
}

// Helper function to read bookings
function readBookings() {
  try {
    const data = fs.readFileSync(BOOKINGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading bookings:', error);
    return [];
  }
}

// Helper function to write bookings
function writeBookings(bookings) {
  try {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
  } catch (error) {
    console.error('Error writing bookings:', error);
  }
}

// Webhook endpoint for receiving appointments
app.post('/webhooks/appointments', (req, res) => {
  console.log('📥 Received webhook:', req.body);
  
  try {
    const { booking, confirmationMessage, usedAI, source } = req.body;
    
    // Validate required fields
    if (!booking || !booking.patientName) {
      return res.status(400).json({ error: 'Invalid booking payload' });
    }
    
    // Create booking record
    const bookingRecord = {
      id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      receivedAt: new Date().toISOString(),
      source: source || 'website',
      booking: {
        patientName: booking.patientName,
        age: booking.age,
        gender: booking.gender,
        appointmentDate: booking.appointmentDate,
        appointmentTime: booking.appointmentTime,
        reason: booking.reason
      },
      confirmationMessage: confirmationMessage || 'Appointment request received',
      usedAI: usedAI || false
    };
    
    // Read existing bookings
    const bookings = readBookings();
    
    // Add new booking
    bookings.unshift(bookingRecord);
    
    // Write back to file
    writeBookings(bookings);
    
    console.log('✅ Booking stored:', bookingRecord.id);
    
    res.status(202).json({
      status: 'accepted',
      id: bookingRecord.id
    });
    
  } catch (error) {
    console.error('❌ Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to get all bookings
app.get('/api/bookings', (req, res) => {
  try {
    const bookings = readBookings();
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Webhook backend running on http://localhost:${PORT}`);
  console.log(`📡 Webhook endpoint: http://localhost:${PORT}/webhooks/appointments`);
  console.log(`📊 Bookings API: http://localhost:${PORT}/api/bookings`);
});
