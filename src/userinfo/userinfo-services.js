const tbl = 'tbl_userinfo';

const UserinfoServices = {

    getUserinfobyId(knex, userId) {
        return knex.from(tbl).select('*').where('userId', userId)
    },

    insertUserinfo(knex, userinfo) {
        return knex
            .insert(userinfo)
            .into(tbl)
            .then(rows => {
                return rows[0]
            })
    },
}

module.exports = UserinfoServices