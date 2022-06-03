import {getFeaturedEvents} from '../util/api-util'
import EventList from '../Components/events/EventList'

const HomePage = (props) => {
    

    return (
        <div>
        <h1 className="center pad-top">Featured Events</h1>
            <EventList items={props.featuredEvents} />
        </div>
    )
}

export async function getStaticProps(context) {
    const featuredEvents = await getFeaturedEvents()


    return {
        props: {
            featuredEvents: featuredEvents
        },
        revalidate: 1800
    }
}

export default HomePage