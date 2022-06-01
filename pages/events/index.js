import {useRouter} from 'next/router';
import {getAllEvents} from '../../dummy-data'
import EventList from '../../Components/events/EventList'
import EventsSearch from '../../Components/events/EventsSearch'

const AllEventsPage = () => {
    const events = getAllEvents()
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

export default AllEventsPage