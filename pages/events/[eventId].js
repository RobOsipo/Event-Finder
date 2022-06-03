import { getEventById, getAllEvents } from "../../util/api-util";
import EventSummary from "../../Components/event-detail/event-summary";
import EventLogistics from "../../Components/event-detail/event-logistics";
import EventContent from "../../Components/event-detail/event-content";
import ErrorAlert from "../../Components/ui/ErrorAlert";

const SingleEventDetail = (props) => {

  const event = props.selectedEvent;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No Event Found!</p>
      </ErrorAlert>
    );
  }
  return (
    <>
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
    </>
  );
};

export async function getStaticProps(context) {
  const {eventId} = context.params

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event
    }
  }

}

export async function getStaticPaths(context) {

  const events = await getAllEvents()

  const paths = events.map(event => ({ params: { eventId: event.id}}))

  return {
    paths: paths,
    fallback: false
  }
}

export default SingleEventDetail;
