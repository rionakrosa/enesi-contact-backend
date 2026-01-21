import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/sendmail', async (req, res) => {
  const { name, email, phone, message, makina } = req.body;

  const makinaHtml = makina
    ? `<strong style="color:#8b0000;">${makina}</strong>`
    : '<em>None selected</em>';

  const htmlBody = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || '<em>Not provided</em>'}</p>
    <p><strong>Selected Machines:</strong> ${makinaHtml}</p>
    <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
  `;

  try {
    await resend.emails.send({
      from: 'Your Website <onboarding@resend.dev>',
      to: process.env.MAIL_USER, // your business email
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: htmlBody,
    });
    res.send('success');
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).send('error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
