const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost/paws-app';

mongoose.connect(connectionString, { useNewUrlParser: true,
                                     useUnifiedTopology: true,
                                     useCreateIndex: true,
                                     useFindAndModify: false
                                    });


mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${connectionString}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose error: ', err);
});

const User = require('./User');
exports.User = User;

const Animal = require('./Animal');
exports.Animal = Animal;

const Description = require('./Description');
exports.Description = Description;

const Post = require('./Post');
exports.Post - Post;