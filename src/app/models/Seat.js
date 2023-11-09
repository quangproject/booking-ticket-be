const db = require("../../config/db");

const TABLE_NAME = "seats";
const COLUMN_ID = "id";
const COLUMN_SEASON_ID = "season_id";
const COLUMN_SEAT_NUMBER = "seat_number";
const COLUMN_SEAT_IS_BOOKED = "is_booked";

// EMPTY OBJECT
const Seat = {};

// GET SEAT BY SEASON ID
Seat.getSeatBySeasonId = (season_id) => {
    return db.query(`SELECT * FROM ${TABLE_NAME} WHERE ${COLUMN_SEASON_ID} = $1 ORDER BY ${COLUMN_ID} ASC`, [season_id]);
};

// UPDATE SEAT STATUS
Seat.updateStatus = (seat_id, is_booked) => {
    return db.query(`UPDATE ${TABLE_NAME} SET ${COLUMN_SEAT_IS_BOOKED} = $1 WHERE ${COLUMN_ID} = $2`, [is_booked, seat_id]);
};

// GET SEAT BY ID
Seat.getSeatById = (seat_id) => {
    return db.query(`SELECT * FROM ${TABLE_NAME} WHERE ${COLUMN_ID} = $1`, [seat_id]);
};

module.exports = { Seat };