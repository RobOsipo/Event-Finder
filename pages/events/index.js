import {useRouter} from 'next/router';
import {getAllEvents} from '../../util/api-util'
import EventList from '../../Components/events/EventList'
import EventsSearch from '../../Components/events/EventsSearch'

const AllEventsPage = (props) => {
    const {events} = props
    const router = useRouter()

    const onSearch = (year, month) => {

        const fullPath = `/events/${year}/${month}`

        router.push(fullPath)
    }

    return (
        <>
            <EventsSearch onSearch={onSearch} />
            <EventList items={events} />
        </>
    )
}


export async function getStaticProps(context) {
    const events = await getAllEvents()

    return {
        props: {
            events: events
        },
        revalidate: 60
    }

}

export default AllEventsPage