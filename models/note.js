const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to mongoDB')
  })
  .catch((err) => {
    console.log('error connecting mongoDB', err.message)
  })

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedOject) => {
    returnedOject.id = returnedOject._id.toJSON()
    delete returnedOject._id
    delete returnedOject.__v
  },
})

module.exports = mongoose.model('Note', noteSchema)
