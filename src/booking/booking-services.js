const tbl = 'tbl_bookings';

const BookingServices = {
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
}

module.exports = BookingServices