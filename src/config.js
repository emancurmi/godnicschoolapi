module.exports = {
    ADDRESS: process.env.ADDRESS || 'https://godnicshoolapi.godnickgarage.com/',
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'production',
    API_TOKEN: process.env.API_TOKEN || '$2a$10$ra1z0n2XnSnbMP/ipTMHeOqqrI7i8Rssm/z8MHTxgb7LamV7LpfXu',
    DATABASE_URL: process.env.DB_URL,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
}
