require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Configure Namecheap Private Mail SMTP
const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com", // Namecheap SMTP server
    port: 465,                     // SSL Port
    secure: true,                  // Use SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Where you want to receive the mail
        subject: `New Contact Form Message from ${name}`,
        text: `You have a new message from: ${name} (${email})\n\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send("Error sending email");
        }
        res.status(200).send("Message sent successfully!");
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
