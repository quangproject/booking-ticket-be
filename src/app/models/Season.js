const db = require("../../config/db");

const TABLE_NAME = "seasons";
const COLUMN_ID = "id";
const COLUMN_NAME = "name";

// EMPTY OBJECT
const Season = {};

// GET ALL SEASONS
Season.getAllSeason = () => {
    return db.query(`SELECT * FROM ${TABLE_NAME} ORDER BY ${COLUMN_ID} ASC`);
};

// GET SEASON BY ID
Season.getSeasonById = (season_id) => {
    return db.query(`SELECT * FROM ${TABLE_NAME} WHERE ${COLUMN_ID} = $1`, [season_id]);
};

module.exports = { Season };