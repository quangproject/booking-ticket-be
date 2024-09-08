const db = require("../../config/db");

const TABLE_NAME = "bookings";
const COLUMN_ID = "id";
const COLUMN_SEAT_ID = "seat_id";
const COLUMN_STUDENT_ID = "student_id";
const COLUMN_FULL_NAME = "full_name";
const COLUMN_EMAIL = "email";
const COLUMN_PHONE_NUMBER = "phone_number";
const COLUMN_BOOKING_DATE = "booking_date";

// EMPTY OBJECT
const Booking = {};

// GET ALL BOOKING
Booking.getAllBooking = () => {
    return db.query(`SELECT * FROM ${TABLE_NAME} ORDER BY ${COLUMN_BOOKING_DATE} DESC`);
};

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

// GET BOOKING BY Id
Booking.getBookingById = (id) => {
    return db.query(`SELECT * FROM ${TABLE_NAME} WHERE ${COLUMN_ID} = $1`, [id]);
};

// GET BOOKING BY SEAT ID
Booking.getBookingBySeatId = (seatId) => {
    return db.query(`SELECT * FROM ${TABLE_NAME} WHERE ${COLUMN_SEAT_ID} = $1`, [seatId]);
}

// DELETE BOOKING BY ID
Booking.deleteBookingById = (id) => {
    return db.query(`DELETE FROM ${TABLE_NAME} WHERE ${COLUMN_ID} = $1`, [id]);
}

// TRUNCATE BOOKING
Booking.truncate = () => {
    return db.query(`TRUNCATE ${TABLE_NAME} RESTART IDENTITY CASCADE`);
};

module.exports = { Booking };