const { Booking } = require("../models/Booking")
const { Seat } = require("../models/Seat")
const { Season } = require("../models/season")

class BookingController {
    async create(req, res) {
        const { seatId, seasonId, studentId, fullName, email, phoneNumber } = req.body

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

        return res.status(200).json({
            data: booking.rows[0]
        })
    }

    async searchByEmail(req, res) {
        const { email } = req.query
        var result = [];

        const booking = await Booking.getBookingByEmail(email)
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
}

module.exports = new BookingController