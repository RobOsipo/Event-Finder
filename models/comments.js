const mongoose = require('mongoose')
const { Schema, model} = mongoose

const commentsSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

mongoose.models = {}

export default mongoose.models.EventModel || model('Comment', commentsSchema)

