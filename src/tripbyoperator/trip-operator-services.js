const tbl = 'tbl_trips';

const TripOperatorServices = {

    getTripbyOperator(knex, routeOperatorId) {
        return knex.from(tbl).select('*').where('routeOperatorId', routeOperatorId)
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

module.exports = TripOperatorServices
