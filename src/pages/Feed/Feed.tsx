import React, { useState, useContext, useEffect } from "react";
import { EventData } from "web3-eth-contract";
import Loading from "../../components/Loading/Loading";
import { Context as EthContext } from "../../Context/EthereumProvider";
import api from "../../api";

import "./styles.css";

const Feed: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<EventData[]>([]);
  const { contract } = useContext(EthContext);

  useEffect(() => {
    (async () => {
      const pastEvents = await contract?.getPastEvents("allEvents", {
        fromBlock: 1,
      });
      if (pastEvents) {
        const finalPastEvents: EventData[] = [];
        for (let event of pastEvents) {
          const {
            data: { title },
          } = await api.get(`/movie/${event.returnValues.movieID}`);
          finalPastEvents.push({
            ...event,
            returnValues: { ...event.returnValues, title },
          });
        }
        setEvents(finalPastEvents);
        setLoading(false);
      }

      contract?.events.MovieEnlisted().on("data", async (e: EventData) => {
        const {
          data: { title },
        } = await api.get(`/movie/${e.returnValues.movieID}`);
        console.log("eai");
        setEvents((prevState) => [
          { ...e, returnValues: { ...e.returnValues, title } },
          ...prevState,
        ]);
      });
    })();
  }, [contract]);

  return (
    <>
      {loading && <Loading centered />}
      {!loading && (
        <>
          <h1 className="page-title fadeFromTop">FEED</h1>
          <div className="table-container">
            <table className="events-table">
              <thead>
                <tr>
                  <th className="enlister" style={{ width: "100px" }}>
                    Account
                  </th>
                  <th className="type">Event</th>
                  <th className="movie">Movie</th>
                </tr>
              </thead>
              <tbody>
                {events
                  .sort((a, b) => b.blockNumber - a.blockNumber)
                  .map((e, index) => (
                    <tr
                      key={`${e.returnValues.enlister}-${e.returnValues.movieID}-${e.event}`}
                      className="fadeFromTop"
                      style={{ animationDelay: `${0.1 * index}s` }}
                    >
                      <td className="enlister">{e.returnValues.enlister}</td>
                      <td className="type">{e.event}</td>
                      <td className="movie">{e.returnValues.title}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default Feed;
