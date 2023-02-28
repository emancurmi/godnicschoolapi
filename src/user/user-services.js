const tbl = 'tbl_users';

const UserServices = {
    getAllUsers(knex) {
        return knex.select('*').from(tbl)
    },

    getUserbyId(knex, userid) {
        return knex.from(tbl).select('*').where('id', userid).first()
    },

    getUserbyId(knex, email, passcode) {
        return knex.from(tbl).select('*').where('email', email) .where ('passcode', passcode).first()
    },

    insertUser(knex, user) {
        return knex
            .insert(user)
            .into(tbl)
            .then(rows => {
                return rows[0]
            })
    },
}

module.exports = UserServices