const tbl = 'tbl_bookings';

const bookingServices = {
    getAllBookings(knex) {
        return knex.select('*').from(tbl)
    },

    insertBooking(knex, booking) {
        return knex
            .insert(booking)
            .into(tbl)
            .then(rows => {
                return rows[0]
            })
    },
    
    getBookingById(knex, bookingid) {
        return knex.from(tbl).select('*').where('bookingId', bookingid).first()
    },
}

module.exports = bookingServices