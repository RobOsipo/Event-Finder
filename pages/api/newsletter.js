import EmailModel from "../../models/newsletter";
import connectMongo from "../../mongo/connect";


async function handler(req, res) {

    try {
        await connectMongo()
      } catch {
        console.log('mongo connection failed')
        res.status(500).json({ message: 'failed to connect to Mongo'})
       
      }


    if (req.method === 'POST') {
        const { email } = req.body
        
        if(!email || !email.includes('@')) { return res.status(422).json({ message: 'Invalid E-Mail' }) }

        const emailInput = new EmailModel({
            email: email
        })

        try {
            await emailInput.save()
        } catch {
            console.log('failed saving email')
             res.status(422).json({ message: 'failed to Save Email to DB'})
             return
        }


        res.status(201).json({ message: 'Successful Register To Newsletter', email: email })
    }

}

export default handler