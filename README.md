Josephine Mwenswa | Software Developer Portfolio
A modern, responsive portfolio built with a clean HTML5/CSS3 frontend and a Node.js backend. This project showcases my journey in software development, featuring my tech stack, service offerings, and a curated selection of projects.

Features
Clean & Minimal Design: Focused on readability and professional UI/UX.

Fully Responsive: Optimized for all screen sizes from mobile to desktop.

Node.js Contact Form: Integrated with a backend to handle client inquiries.

Service Overview: Sections highlighting Web Development, UI/UX, API Development, and AI Integration.

Project Cards: Detailed project snapshots with live links and source code access.

Tech Stack
Frontend
HTML5 & CSS3: Semantic structure and custom styling.

JavaScript (ES6+): For interactivity and form handling.

FontAwesome: For professional iconography.

Backend (Serverless)
Node.js: Powers the contact functionality.

Nodemailer: Handles automated email delivery.

Vercel: Unified hosting for both static frontend and serverless backend.

Project Structure

├── index.html          # Main portfolio structure
├── styles.css/                # Custom styling
├── Images/             # Images, icons
├── script.js/                 # Frontend logic (e.g., scroll effects), fetch for the form
└── api/
    └── contact.js      # Node.js Serverless Function (Backend)

The Backend Serveless(netlify/functions/mail.js)

Node.js: Executed via Netlify Functions.
Nodemailer: For processing and sending contact form email

JavaScript

require('dotenv').config();
const nodemailer = require("nodemailer");

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://josephinemwende.github.io",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

exports.handler = async (event, context) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: "OK"
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  const { name, email, message } = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const adminMail = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "Message from Portfolio Contact Form",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  const confirmationMail = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Confirmation Email",
    text: `Hello ${name},\n\nThank you for reaching out! I have received your message and will get back to you shortly.\n\nBest regards,\nJosephine Mwenswa`
  };

  try {
    await transporter.sendMail(adminMail);
    await transporter.sendMail(confirmationMail);

    return {
      statusCode: 200,
      headers: corHeaders,
      body: JSON.stringify({
      status: "success",
      title: "Message Sent",
      message: `Thank you, ${name}! Your message has been sent successfully. A confirmation email has been sent to ${email}.`
    })
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
      status: "error",
      title: "Message Failed",
      message: error.message
    })
    };
  }
};

Setup & Deployment
Clone the Repo

Bash

git clone https://github.com/josephinemwende/portfolio.git

Environment Variables In your Netlify Dashboard, go to Site Settings > Build & Deploy > Environment Variables and add:

EMAIL_USER: Your Gmail address.

EMAIL_PASS: Your Gmail App Password.

Frontend Connection The frontend fetch request should point to /.netlify/functions/mail.js.
