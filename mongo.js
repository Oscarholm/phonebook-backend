const mongoose = require("mongoose");
require("dotenv").config();

const arguments = Number(process.argv.length);

if (arguments < 3 || arguments > 5 || arguments === 4) {
  console.log("Please provide password: node mongo.js <password>");
  process.exit(1);
}

const password = process.argv[2];

const uri = process.env.MONGODB_URI;

const url = `mongodb+srv://oscar:${password}@cluster0.qs0uv.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (arguments === 3) {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (arguments === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((result) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
}
