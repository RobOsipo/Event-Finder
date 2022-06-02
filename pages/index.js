import {getFeaturedEvents} from '../util/api-util'
import EventList from '../Components/events/EventList'

const HomePage = (props) => {
    

    return (
        <div>
        
            <EventList items={props.featuredEvents} />
        </div>
    )
}

export async function getStaticProps(context) {
    const featuredEvents = await getFeaturedEvents()


    return {
        props: {
            featuredEvents: featuredEvents
        }
    }
}

export default HomePage