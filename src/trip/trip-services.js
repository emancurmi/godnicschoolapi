const TripServices = {
    getAllTrips(knex) {
        return knex.select('*').from('tbl_trips')
    },

    getTripsById(knex, tripid) {
        return knex.from('tbl_trips').select('*').where('tripid', tripid).first()
    },

    getTripsbyOperator(knex, operatorid) {
        return knex.from('tbl_trips').select('*').where('operatorid', operatorid)
    },

    insertTrip(knex, newtrip) {
        return knex
            .insert(newtrip)
            .into('tbl_trips')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    deleteTrip(knex, tripid) {
        return knex('tbl_trips')
            .where('tripid', tripid)
            .delete()
    },

    updateTrip(knex, tripid, newtrip) {
        return knex('tbl_trips')
            .where('tripid', tripid)
            .update(newtrip)
    },
}

module.exports = TripServices
