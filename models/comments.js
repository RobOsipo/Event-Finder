const mongoose = require('mongoose')
const { Schema, model, models } = mongoose

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

const EventModel = models.EventModel || model('Comment', commentsSchema)

export default EventModel