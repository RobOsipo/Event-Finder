import Head from "next/head";
import Comments from '../../Components/input/Comments'
import {
  getEventById,
  getAllEvents,
  getFeaturedEvents,
} from "../../util/api-util";
import EventSummary from "../../Components/event-detail/EventSummary";
import EventLogistics from "../../Components/event-detail/EventLogistics";
import EventContent from "../../Components/event-detail/EventContent";
import ErrorAlert from "../../Components/ui/ErrorAlert";

const SingleEventDetail = (props) => {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loading.....</p>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
};

export async function getStaticProps(context) {
  const { eventId } = context.params;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
      revalidate: 30,
    },
  };
}

export async function getStaticPaths(context) {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default SingleEventDetail;
