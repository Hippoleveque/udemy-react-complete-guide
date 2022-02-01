import { MongoClient, ObjectId } from "mongodb";
const uri =
  "mongodb+srv://hippolev:gilbertrocks95@cluster0.ob3jg.mongodb.net/meetups?retryWrites=true&w=majority";

import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  return (
    <MeetupDetail
      image={props.image}
      title={props.title}
      address={props.address}
      description={props.description}
    />
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(uri);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  const paths = meetups.map((meetup) => {
    return { params: { meetupId: meetup._id.toString() } };
  });
  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(uri);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
  client.close();
  return {
    props: {
      image: meetup.image,
      title: meetup.title,
      address: meetup.address,
      description: meetup.description,
    },
  };
};

export default MeetupDetails;
