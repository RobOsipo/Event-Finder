import Head from 'next/head'
import Newsletter from '../Components/input/Newsletter'
import {getFeaturedEvents} from '../util/api-util'
import EventList from '../Components/events/EventList'

const HomePage = (props) => {
    

    return (
        <div>
        <Head> 
            <title>Event Finder Home Page</title>
            <meta name="description" content="Find some events here" />
        </Head>
        <Newsletter />
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