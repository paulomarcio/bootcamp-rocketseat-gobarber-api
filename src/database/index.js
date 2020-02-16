import Sequelize from 'sequelize';
import mongoose from 'mongoose';

// Importing models
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

// Database configuration
import databaseConfig from '../config/database';

// Adding imported models to a constant to be maped by Sequelize
const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    // Making a connection and returning an connection object
    this.connection = new Sequelize(databaseConfig);

    // Attaching connection object to each imported model and making associations
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
