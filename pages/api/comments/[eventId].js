import EventModel from "../../../models/comments";
import connectMongo from "../../../mongo/connect";

async function handler(req, res) {

  try {
    await connectMongo()
  } catch {
    console.log('mongo connection failed')
    res.status(500).json({ message: 'failed to connect to Mongo'})
  }



  const { eventId } = req.query;

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input" });
      return;
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };
    const createdComment = new EventModel(newComment);

    try {
      await createdComment.save()
    } catch (err) {
      console.log('creating and saving user failed')
      res.status(422).json({ message: 'Could Not Save Comment To Mongo' })
    }

   

    res.status(201).json({ message: "Added Comment", comment: newComment });
  }

  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "Rob", text: "A Comment brahhhhh" },
      { id: "c2", name: "Rob", text: "A Comment brahhhhh" },
      { id: "c3", name: "Rob", text: "A Comment brahhhhh" },
    ];

    let comments 
    try {
      comments = await EventModel.find()
    } catch(err) {
      console.log('could not find comments')
      res.status(401).json({ message: 'Finding comments failed'})
    }

    res
      .status(200)
      .json({ message: "Retrive Comment Successful", comments: comments });
  }
}

export default handler;
