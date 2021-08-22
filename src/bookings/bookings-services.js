const tbl = 'tbl_bookings';

const BookingsServices = {
    getBookingsById(knex, bookingid) {
        return knex.from(tbl).select('*').where('ID', bookingid).first()
    },
}

module.exports = BookingsServices