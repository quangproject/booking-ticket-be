const db = require("../../config/db");

const TABLE_NAME = "bookings";
const COLUMN_ID = "id";
const COLUMN_SEAT_ID = "seat_id";
const COLUMN_STUDENT_ID = "student_id";
const COLUMN_FULL_NAME = "full_name";
const COLUMN_EMAIL = "email";
const COLUMN_PHONE_NUMBER = "phone_number";
const COLUMN_BOOKING_TIME = "booking_time";
const COLUMN_STATUS = "status";

// EMPTY OBJECT
const Booking = {};

// CREATE BOOKING
Booking.create = (seatId, studentId, fullName, email, phoneNumber) => {
    return db.query(`INSERT INTO ${TABLE_NAME} (
            ${COLUMN_SEAT_ID}, 
            ${COLUMN_STUDENT_ID}, 
            ${COLUMN_FULL_NAME}, 
            ${COLUMN_EMAIL}, 
            ${COLUMN_PHONE_NUMBER}
        ) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [seatId, studentId, fullName, email, phoneNumber]);
};

// SEARCH BOOKING BY EMAIL
Booking.getBookingByEmail = (email) => {
    return db.query(`SELECT * FROM ${TABLE_NAME} WHERE ${COLUMN_EMAIL} = $1`, [email]);
};

module.exports = { Booking };