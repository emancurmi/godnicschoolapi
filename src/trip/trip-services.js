const tbl = 'tbl_trips';

const TripServices = {
    getAllTrips(knex) {
        return knex.select('*').from(tbl)
    },

    getTripbyId(knex, routeId) {
        return knex.from(tbl).select('*').where('routeId', routeId).first()
    },

    insertTrip(knex, newtrip) {
        return knex
            .insert(newtrip)
            .into(tbl)
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
}

module.exports = TripServices
