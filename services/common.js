const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "lenovok8plus38@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
});

async function sendMail({ to, subject, text, html }) {
  const info = await transporter.sendMail({
    from: '"BookTheShow 🎬" <lenovok8plus38@gmail.com>',
    to,
    subject,
    text,
    html,
  });

  return info;
}

function confirmBookingTemplate(bookingData, userData) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Movie Booking Confirmation</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
              text-align: center;
              padding: 10px 0;
              background-color: #ff5733;
              border-radius: 10px 10px 0 0;
          }
          .header img {
              max-width: 150px;
          }
          .content {
              padding: 20px;
          }
          .content h2 {
              color: #ff5733;
              margin-top: 0;
          }
          .content p {
              color: #555555;
              line-height: 1.6;
          }
          .movie-details {
              display: flex;
              margin-top: 20px;
          }
          .movie-details img {
              max-width: 150px;
              border-radius: 5px;
              margin-right: 20px;
          }
          .movie-details div {
              max-width: 400px;
          }
          .movie-details h3 {
              color: #333333;
              margin: 0;
          }
          .movie-details p {
              margin: 5px 0;
              color: #333333;
          }
          .footer {
              text-align: center;
              padding: 20px;
              background-color: #ff5733;
              color: white;
              border-radius: 0 0 10px 10px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <img src="https://res.cloudinary.com/ds0ojjzzd/image/upload/v1717600658/ddi3awa0booi7qv4ymez.png" alt="Company Logo">
          </div>
          <div class="content">
              <h2>Booking Confirmation</h2>
              <p>Dear ${userData.name},</p>
              <p>Thank you for booking with us! Here are your booking details:</p>
              <p>ID #${bookingData.id}</p>
              <div class="movie-details">
                  <img src=${bookingData.movie.poster} alt="Movie Poster">
                  <div>
                      <h3>Movie: ${bookingData.movie.title}</h3>
                      <p><strong>Seat Number:</strong> ${bookingData.seat}</p>
                      <p><strong>Booking Date:</strong> ${bookingData.bookingDate}</p>
                  </div>
              </div>
              <p>We hope you enjoy the movie!</p>
              <p>Sincerely,</p>
              <p>BookTheShow</p>
          </div>
          <div class="footer">
              &copy; 2024 BookTheShow. All rights reserved.
          </div>
      </div>
  </body>
  </html>
  `;
}

function cencelledBookingTemplate(cancelBookingData, userData) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Cancellation Confirmation</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
              text-align: center;
              padding: 10px 0;
              background-color: #ff4c4c;
              color: white;
              border-radius: 10px 10px 0 0;
          }
          .header img {
              max-width: 150px;
          }
          .content {
              padding: 20px;
          }
          .content h2 {
              color: #ff4c4c;
              margin-top: 0;
          }
          .content p {
              color: #555555;
              line-height: 1.6;
          }
          .movie-details {
              display: flex;
              margin-top: 20px;
          }
          .movie-details img {
              max-width: 150px;
              border-radius: 5px;
              margin-right: 20px;
          }
          .movie-details div {
              max-width: 400px;
          }
          .movie-details h3 {
              color: #333333;
              margin: 0;
          }
          .footer {
              text-align: center;
              padding: 20px;
              color: #777777;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <img src="https://res.cloudinary.com/ds0ojjzzd/image/upload/v1717600658/ddi3awa0booi7qv4ymez.png" alt="Company Logo">
          </div>
          <div class="content">
              <h2>Booking Cancellation Confirmation</h2>
              <p>Dear ${userData.name},</p>
              <p>This is to confirm that your booking has been successfully cancelled. Here are the details of your cancelled booking:</p>
              <p>ID #${cancelBookingData.id}</p>
              <div class="movie-details">
                  <img src=${cancelBookingData.movie.poster} alt="Movie Poster">
                  <div>
                      <h3>Movie: ${cancelBookingData.movie.title}</h3>
                      <p><strong>Seat Number:</strong> ${cancelBookingData.seat}</p>
                      <p><strong>Booking Date:</strong> ${cancelBookingData.bookingDate}</p>
                  </div>
              </div>
              <p>If you have any questions or need further assistance, please don't hesitate to contact our support team.</p>
              <p>We hope to serve you again in the future.</p>
              <p>Sincerely,</p>
              <p>BookTheShow</p>
          </div>
          <div class="footer">
              &copy; 2024 BookTheShow. All rights reserved.
          </div>
      </div>
  </body>
  </html>
    `;
}

module.exports = {
  sendMail,
  confirmBookingTemplate,
  cencelledBookingTemplate,
};
