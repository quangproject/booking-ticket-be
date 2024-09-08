const { Seat } = require("../models/Seat");
const { Season } = require("../models/Season");

class HomeController {
    async index(req, res) {
        try {
            var result = [];

            const seasons = await Season.getAllSeason();
            if (seasons.rowCount === 0) {
                return res.status(404).json({
                    error: 'Seasons not found'
                })
            }

            for (const season of seasons.rows) {
                const seasonData = {
                    id: season.id,
                    name: season.name,
                    seats: []
                };
                result.push(seasonData);

                const seats = await Seat.getSeatBySeasonId(season.id);
                if (seats.rowCount === 0) {
                    return res.status(404).json({
                        error: 'Seats not found'
                    })
                }

                for (const seat of seats.rows) {
                    const seatData = {
                        id: seat.id,
                        number: seat.seat_number,
                        isBooked: seat.is_booked
                    };
                    seasonData.seats.push(seatData);
                }
            }

            return res.status(200).json({
                data: result
            })
        } catch (error) {
            console.log("🚀 ~ HomeController ~ index ~ error:", error)
            return res.status(500).json({
                error: "Internal Server Error"
            })
        }
    }
}

module.exports = new HomeController