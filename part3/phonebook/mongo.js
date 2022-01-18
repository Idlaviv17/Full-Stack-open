const mongoose = require('mongoose')

if (process.argv.length < 3 || process.argv.length === 4) {
  console.log(
    'Please provide the data as arguments: node mongo.js <password> <name> <number>'
  )
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.tuaek.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const Person = mongoose.model(
  'Person',
  new mongoose.Schema({
    name: String,
    number: String,
  })
)

if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name,
    number,
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
