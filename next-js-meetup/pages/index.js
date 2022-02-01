import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
const uri =
  "mongodb+srv://hippolev:gilbertrocks95@cluster0.ob3jg.mongodb.net/meetups?retryWrites=true&w=majority";

const HomePage = (props) => {
  return <MeetupList meetups={props.meetups} />;
};

export const getStaticProps = async () => {
  const client = await MongoClient.connect(uri);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  let meetups = await meetupsCollection.find().toArray();

  meetups = meetups.map((meetup) => {
    return {
      title: meetup.title,
      address: meetup.address,
      image: meetup.image,
      id: meetup._id.toString(),
    };
  });
  client.close();
  return {
    props: {
      meetups: meetups,
    },
    revalidate: 10,
  };
};

export default HomePage;
