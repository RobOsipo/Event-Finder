import EventModel from "../../../models/comments";
import connectMongo from "../../../mongo/connect";

async function handler(req, res) {

  try {
    await connectMongo()
  } catch {
    console.log('mongo connection failed')
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

    try {
      const createdComment = await new EventModel(newComment);
      await createdComment.save()
    } catch (err) {
      console.log('creating and saving user failed')
    }

   

    res.status(201).json({ message: "Added Comment", comment: newComment });
  }

  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "Rob", text: "A Comment brahhhhh" },
      { id: "c2", name: "Rob", text: "A Comment brahhhhh" },
      { id: "c3", name: "Rob", text: "A Comment brahhhhh" },
    ];

    res
      .status(200)
      .json({ message: "Retrive Comment Successful", comments: dummyList });
  }
}

export default handler;
