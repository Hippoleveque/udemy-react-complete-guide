import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://hippolev:gilbertrocks95@cluster0.ob3jg.mongodb.net/meetups?retryWrites=true&w=majority";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(uri);
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);

    client.close()
    res.status(201).json({message: "Meetup Inserted !"})
  }
};

export default handler;
