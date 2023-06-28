import Streamer from "./Streamer";
import Spinner from "./Spinner";
import { useContext } from "react";
import StreamersContext from "../context/StreamersProvider";

export default function StreamerList() {
  const { isLoading, fetchError, streamers } = useContext(StreamersContext);

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (fetchError) {
    content = <p className="text-slate-800">{fetchError}</p>;
  } else {
    content = (
      <ul className="mb-10 flex flex-col items-center gap-8">
        {streamers.length > 0 ? (
          streamers.map((streamer) => (
            <Streamer key={streamer._id} data={streamer} />
          ))
        ) : (
          <p className="text-slate-800">No streamers have been uploaded yet</p>
        )}
      </ul>
    );
  }

  return <section className="w-[50%]">{content}</section>;
}
