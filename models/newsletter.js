const mongoose = require('mongoose')
const {Schema, model, models} = mongoose

const emailSchema = new Schema({
    email: {
        type: String,
        required: true
    }
})

const EmailModel = models.EmailModel || model('Email', emailSchema)

export default EmailModel