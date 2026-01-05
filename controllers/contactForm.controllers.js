import nodemailer from "nodemailer";

const contactForm = async (req, res) => {

    console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
console.log("PASS LENGTH:", process.env.ADMIN_EMAIL_PASS?.length);
  try {
    const { name, email, phone, subject, message } = req.body;

    // 1️⃣ Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // 2️⃣ Create transporter (ADMIN GMAIL)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS,
      },
    });

    // 3️⃣ Send mail (sender = receiver, replyTo = user)
    await transporter.sendMail({
      from: `"Kokan Community Forum" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: email, // 👈 USER EMAIL
      subject: `New Contact Form: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // 4️⃣ Response to frontend
    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.error("❌ Contact form error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

export default contactForm;
