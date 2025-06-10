"use strict";

const mongoose = require("mongoose");
const {
  db: { host, port, name },
} = require("../configs/mongodb.config");

const connectString = `mongodb://${host}:${port}/${name}`;
console.log("ConnectString::::", connectString);

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", {
        color: true,
      });
    }
    mongoose
      .connect(connectString, {
        maxPoolSize: 50,
      })
      .then((_) => {
        console.log("Connected DB Successfully");
      })
      .catch((err) => {
        console.error("Connecting DB Failure");
      });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
