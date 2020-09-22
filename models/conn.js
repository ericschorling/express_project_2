const host = "lallah.db.elephantsql.com",
    user = "xhksbwev",
    database = "xhksbwev",
    password = "q_1MapypBtaUTJwXS1TwOvxVAQ4CLhMi";

const pgp = require('pg-promise')({
    query: function (e) {
        console.log('QUERY: ', e.query)
    }
});

const options = {
    host: host,
    database: database,
    user: user,
    password: password
}

const db = pgp(options)

module.exports = db;