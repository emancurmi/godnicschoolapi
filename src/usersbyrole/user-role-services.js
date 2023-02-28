const tbl = 'tbl_users';

const UserRoleServices = {

    getUserbyRolePower(knex, rolePower) {
        return knex.from(tbl).select('*').where('rolePower', rolePower)
    }
}

module.exports = UserRoleServices