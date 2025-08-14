// const express = require('express')
// const router = express.Router()
// const Contact = require('../models/Contact')

// // POST /api/contact
// router.post('/', async (req, res) => {
//   try{
//     const { name, email, company, role, message } = req.body
//     if (!name || !email) return res.status(400).json({ error: 'Name and email are required' })

//     const lead = new Contact({ name, email, company, role, message })
//     await lead.save()
//     return res.status(201).json({ message: 'Thanks — we have received your request.' })
//   }catch(err){
//     console.error('Contact save error', err)
//     return res.status(500).json({ error: 'Server error saving contact' })
//   }
// })

// module.exports = router
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, company, role, message } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Save to MongoDB
    const lead = new Contact({ name, email, company, role, message });
    await lead.save();

    // Nodemailer setup
    let transporter = nodemailer.createTransport({
      service: 'gmail', // You can also use SMTP config
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail
        pass: process.env.EMAIL_PASS  // Your Gmail App Password
      }
    });

    // Email content
  const mailOptions = {
  from: `"Website Contact" <${process.env.EMAIL_USER}>`,
  to: `${process.env.EMAIL_USER}, ${process.env.PARTNER_EMAIL}`, // You + Partner from .env
  subject: 'New Contact Form Submission to your A9VA Website',
  html: `
    <h3>New Lead from Website</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Company:</strong> ${company || 'N/A'}</p>
    <p><strong>Role:</strong> ${role || 'N/A'}</p>
    <p><strong>Message:</strong> ${message || 'No message'}</p>
    <p><small>Submitted on ${new Date().toLocaleString()}</small></p>
  `
};


    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(201).json({ message: 'Thanks — we have received your request.' });

  } catch (err) {
    console.error('Contact save/email error', err);
    return res.status(500).json({ error: 'Server error saving contact or sending email' });
  }
});

module.exports = router;
