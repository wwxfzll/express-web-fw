let app = {
    user: 'userwwx',
    password: 'strong123',
    server: 'localhost',
    database: 'Record',
    port: 1433,
    options: {
        encrypt: false // Use this if you're on Windows Azure
    },
    pool: {
        min: 0,
        max: 10,
        idleTimeoutMillis: 3000
    }
};

module.exports = app;