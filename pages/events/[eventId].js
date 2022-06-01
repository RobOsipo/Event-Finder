import { useRouter } from 'next/router'
import { getEventById } from '../../dummy-data'
import EventSummary from '../../Components/event-detail/event-summary'
import EventLogistics from '../../Components/event-detail/event-logistics'
import EventContent from '../../Components/event-detail/event-content'

const SingleEventDetail = () => {
    const router = useRouter()
   const {eventId} = router.query
   const event = getEventById(eventId)

   if (!event) {
       return <p>No Event Found!</p>
   }
    return (
        <>
            <EventSummary title={event.title} />
            <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </>
    )
}

export default SingleEventDetail