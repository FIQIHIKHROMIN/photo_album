

const config = {
    "development": {
      "username": "postgres",
      "password": "fiqih",
      "database": "photo_album",
      "host": "127.0.0.1",
      "dialect":  "postgres"
    },
    "test": {
        "username": process.env.DB_USERNAME_TEST || "postgres",
        "password": process.env.DB_PASSWORD_TEST || "fiqih" ,
        "database": process.env.DB_NAME_TEST || "photo_album_test",
        "host": process.env.DB_HOST_TEST || "127.0.0.1",
        "dialect": process.env.DB_DIALECT_TEST || "postgres"
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
  }
  
module.exports = config