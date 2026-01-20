
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/sendmail', async (req, res) => {
  const { name, email, phone, message, makina } = req.body;

  // Format makina for HTML
  const makinaHtml = makina
    ? `<strong style="color:#8b0000;">${makina}</strong>`
    : '<em>None selected</em>';

  const htmlBody = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || '<em>Not provided</em>'}</p>
    <p><strong>Selected Machines:</strong> ${makinaHtml}</p>
    <p><strong>Message:</strong><br>${message}</p>
  `;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: process.env.MAIL_SECURE === 'true', // true for 465, false for 587
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    await transporter.sendMail({
      from: `Website Contact <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER, // send to business owner
      subject: 'New Contact Form Submission',
      html: htmlBody
    });

    res.send('success');
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).send('error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
