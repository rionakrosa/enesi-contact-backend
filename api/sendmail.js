import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

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
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: process.env.MAIL_SECURE === 'true',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: `Website Contact <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: 'New Contact Form Submission',
      html: htmlBody,
    });

    res.status(200).send('success');
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).send('error');
  }
}
