const mongoose = require("mongoose");
const connect = async () => {
  mongoose.set("strictQuery", false);
  return mongoose.connect("mongodb+srv://sarvaiya:pratik@first-project.52mrdfn.mongodb.net/gymcom");
};
module.exports = connect;
