import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getFilteredEvents } from "../../util/api-util";
import EventList from "../../Components/events/EventList";
import ResultsTitle from "../../Components/events/ResultsTitle";
import Button from "../../Components/ui/Button";
import ErrorAlert from "../../Components/ui/ErrorAlert";

const FilteredEventsPage = (props) => {
  const [events, setEvents] = useState();
  const router = useRouter();
  const filterData = router.query.slug;

  const { data, error } = useSWR(
    "https://next-js-dummy-370d1-default-rtdb.firebaseio.com/events.json",
    (url) => fetch(url).then((response) => response.json())
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({ id: key, ...data[key] });
      }

      setEvents(events);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`All Events For A Particular Date`} />
    </Head>
  );
  if (!events) {
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>
      </>
    );
  }

  const [year, month] = filterData;

  const numYear = +year;
  const numMonth = +month;

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All Events For ${numMonth}/${numYear}`}
      />
    </Head>
  );

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid Filter, Please Adjust Your Values</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No Events Found For That Date</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.slug;

//   const [year, month] = filterData;

//   const numYear = +year;
//   const numMonth = +month;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12 ||
//     error
//   ) {
//     return {
//       props: { notFound: true },
//       // notFound: true
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         numYear: numYear,
//         numMonth: numMonth,
//       },
//     },
//   };
// }

export default FilteredEventsPage;
