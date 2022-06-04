
function handler(req, res) {
    if (req.method === 'POST') {
        const { email } = req.body
        
        if(!email || !email.includes('@')) { return res.status(422).json({ message: 'Invalid E-Mail' }) }



        res.status(201).json({ message: 'Successful Register To Newsletter', email: email })
    }

}

export default handler