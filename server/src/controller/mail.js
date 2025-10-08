import nodemailer from "nodemailer";

export const sendMails = async (req, res) => {
  const { name, email, message } = req.body;
  const myEmail = process.env.MY_EMAIL;
  const googleAppPassword = process.env.MY_GOOGLE_PASS;

  if (!myEmail || !googleAppPassword) {
    res
      .status(500)
      .json({ message: "Email credentials not set in environment variables" });
    return;
  }

  if (!name || !email || !message) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: myEmail,
        pass: googleAppPassword,
      },
    });

    await transport.verify();
    console.log("✅ SMTP connection successful");

    await transport.sendMail({
      from: `Portfolio <${myEmail}>`,
      to: myEmail,
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div>
          <h3>You have a new message!</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};
