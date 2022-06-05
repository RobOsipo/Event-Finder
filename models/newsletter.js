const mongoose = require('mongoose')
const {Schema, model} = mongoose

const emailSchema = new Schema({
    email: {
        type: String,
        required: true
    }
})

mongoose.models = {}

export default mongoose.models.EmailModel || model('Email', emailSchema)

