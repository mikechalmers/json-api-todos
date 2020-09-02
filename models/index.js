var mongoose = require('mongoose');
var url = process.env.DATABASEURL || "mongodb://localhost/json-api";

// debug mode shows entries being added to the db etc.
// remove for production

mongoose.set('debug', true);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.Promise = Promise;

module.exports.Todo = require("./todo");
