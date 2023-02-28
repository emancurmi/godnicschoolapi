const tbl = 'tbl_trips';

const TripDriverServices = {

    getTripbyDriver(knex, routeDriverId) {
        return knex.select('*').from(tbl).where('routeDriverId', routeDriverId)
    },
}

module.exports = TripDriverServices
