const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const { Booking } = require("../models/Booking")
const { Seat } = require("../models/Seat")
const { Season } = require("../models/Season")

class BookingController {
    async create(req, res) {
        const { seatId, seatNumber, seasonId, seasonName, studentId, fullName, email, phoneNumber, qrCodeImageSrc } = req.body

        // Get booking by seat id
        const bookingBySeatId = await Booking.getBookingBySeatId(seatId)
        if (bookingBySeatId.rowCount > 0) {
            return res.status(500).json({
                error: 'Seat is already booked'
            })
        }

        // Save to database
        const booking = await Booking.create(seatId, studentId, fullName, email, phoneNumber)
        if (booking.rowCount === 0) {
            return res.status(500).json({
                error: 'Booking failed'
            })
        }

        // Change seat status
        const seat = await Seat.updateStatus(seatId, true)
        if (seat.rowCount === 0) {
            return res.status(500).json({
                error: 'Seat status update failed'
            })
        }

        // Send mail
        // Create a transporter object for sending emails
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        let htmlContent = '';
        try {
            // Get the current working directory
            const currentDirectory = process.cwd();
            // Construct a file path using the current directory
            const pathEmailTemplate = path.join(currentDirectory, 'src', 'template', 'email.html');
            // Read the HTML file content
            htmlContent = fs.readFileSync(pathEmailTemplate, 'utf-8');

            // Replace placeholders with actual data
            htmlContent = htmlContent.replace('{{booking_id}}', booking.rows[0].id);
            htmlContent = htmlContent.replace('{{season_name}}', seasonName);
            htmlContent = htmlContent.replace('{{seat_number}}', seatNumber);
            htmlContent = htmlContent.replace('{{full_name}}', fullName);
            htmlContent = htmlContent.replace('{{email}}', email);
            htmlContent = htmlContent.replace('{{phone_number}}', phoneNumber);
            htmlContent = htmlContent.replace('{{student_id}}', studentId === '' ? 'N/A' : studentId);
        } catch (err) {
            console.error(err)
            return res.status(500).json({
                error: 'Email template not found'
            })
        }

        // Define the email options
        let mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: 'QR Code Email',
            html: htmlContent,
            attachments: [
                {
                    filename: 'qrcode.png',
                    content: qrCodeImageSrc.split(',')[1],  // extract base64 content from data URL
                    encoding: 'base64'
                }
            ]
        };

        // Send the email with QR code attachment
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    error: 'Email sending failed'
                })
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return res.status(200).json({
            data: booking.rows[0]
        })
    }

    async searchByEmail(req, res) {
        const { bookingId } = req.query
        var result = [];

        const booking = await Booking.getBookingById(bookingId)
        if (booking.rowCount === 0) {
            return res.status(500).json({
                error: 'Booking not found'
            })
        }
        const bookingData = {
            id: booking.rows[0].id,
            studentId: booking.rows[0].student_id,
            fullName: booking.rows[0].full_name,
            email: booking.rows[0].email,
            phoneNumber: booking.rows[0].phone_number,
            seat: {}
        };
        result.push(bookingData);

        const seats = await Seat.getSeatById(booking.rows[0].seat_id);
        if (seats.rowCount === 0) {
            return res.status(500).json({
                error: 'Seats not found'
            })
        }
        const seatData = {
            id: seats.rows[0].id,
            number: seats.rows[0].seat_number,
            season: {}
        };
        bookingData.seat = seatData;

        const season = await Season.getSeasonById(seats.rows[0].season_id);
        if (season.rowCount === 0) {
            return res.status(500).json({
                error: 'Season not found'
            })
        }
        const seasonData = {
            id: season.rows[0].id,
            name: season.rows[0].name,
        };
        bookingData.seat.season = seasonData;

        return res.status(200).json({
            data: result
        })
    }

    async deleteBooking(req, res) {
        const { id } = req.params

        const booking = await Booking.getBookingById(id)
        if (booking.rowCount === 0) {
            return res.status(500).json({
                error: 'Booking not found'
            })
        }

        const seat = await Seat.updateStatus(booking.rows[0].seat_id, false)
        if (seat.rowCount === 0) {
            return res.status(500).json({
                error: 'Seat status update failed'
            })
        }

        const deleteBooking = await Booking.deleteBookingById(id)
        if (deleteBooking.rowCount === 0) {
            return res.status(500).json({
                error: 'Booking delete failed'
            })
        }

        return res.status(200).json({
            data: 'Delete success'
        })
    }

    async truncate(req, res) {
        const booking = await Booking.truncate()
        if (booking.rowCount === 0) {
            return res.status(500).json({
                error: 'Booking truncate failed'
            })
        }

        const seat = await Seat.setSeatIsBookedToFalse()
        if (seat.rowCount === 0) {
            return res.status(500).json({
                error: 'Seat status update failed'
            })
        }

        return res.status(200).json({
            data: 'Truncate success'
        })
    }
}

module.exports = new BookingController