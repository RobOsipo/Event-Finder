import {getFeaturedEvents} from '../dummy-data.js'
import EventList from '../Components/events/EventList'

const HomePage = () => {
    const featuredEvents = getFeaturedEvents()

    return (
        <div>
            <EventList items={featuredEvents} />
        </div>
    )
}

export default HomePage