import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";

const profilePic = new URL(
  "../assets/images/streamer/profile.jpg",
  import.meta.url
).href;

export default function StreamerProfile() {
  const { streamerId } = useParams();
  const { data, fetchError, isLoading } = useFetch(`/streamer/${streamerId}`);
  const [streamer, setStreamer] = useState({});

  //pobrac z localstorage stan zaglosowania dla danego streamera??
  const [marked, setMarked] = useState(
    localStorage.getItem(streamerId) || null
  );

  useEffect(() => {
    setStreamer(data);
  }, [data]);

  const voteClickHandler = async (vote) => {
    const previousOperation = marked;
    let operation;

    if (marked === "upvote" && vote === "upvote") {
      operation = "resetUpvote";
      setMarked(null);
      localStorage.setItem(streamerId, null);
    } else if (marked === "upvote" && vote === "downvote") {
      operation = "toggleNeg";
      setMarked(vote);
      localStorage.setItem(streamerId, vote);
    } else if (marked === "downvote" && vote === "downvote") {
      operation = "resetDownvote";
      setMarked(null);
      localStorage.setItem(streamerId, null);
    } else if (marked === "downvote" && vote === "upvote") {
      operation = "togglePos";
      setMarked(vote);
      localStorage.setItem(streamerId, vote);
    } else {
      operation = vote;
      setMarked(vote);
      localStorage.setItem(streamerId, vote);
    }

    try {
      const response = await axios.put(
        `/streamers/${streamerId}/vote`,
        JSON.stringify({ type: operation })
      );

      setStreamer(response?.data);
    } catch (error) {
      setMarked(previousOperation);
      localStorage.setItem(streamerId, previousOperation);
    }
  };

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (fetchError) {
    content = (
      <p>
        Something went wrong, please try visiting this streamer&apos;s profile
        later
      </p>
    );
  } else {
    content = (
      <section className="w-full mx-auto flex flex-col items-center text-slate-800 mb-10">
        <div className="md:w-80 md:h-80 mb-5 rounded-full overflow-hidden flex items-center justify-center shadow-md">
          <img
            src={profilePic}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-3xl mb-2 font-bold">{streamer?.name}</h1>
        <p className="text-md text-slate-500 mb-3">
          Streamer on <b>{streamer?.platform}</b>
        </p>
        <hr className="w-[15%] border-slate-300 mb-8" />
        <div className="sm:w-[60%] md:w-[50%] lg:w-[40%] mb-10">
          <h4 className="text-md text-slate-500 mb-3">About</h4>
          <p className="break-words mb-4">{streamer?.description}</p>
          <h4 className="text-md text-slate-500 mb-3">Statistics</h4>
          <p>
            Upvotes: <b className="text-slate-500">{streamer?.upvotes}</b>
          </p>
          <p>
            Downvotes: <b className="text-slate-500">{streamer?.downvotes}</b>
          </p>
        </div>
        <div className="flex gap-5 items-center">
          <button
            className={`p-4 lg:w-32 font-semibold border rounded-md transform duration-300 hover:bg-purple-500 hover:text-slate-50 hover:shadow-md ${
              marked === "upvote" && "bg-purple-500 text-slate-50"
            }`}
            onClick={() => voteClickHandler("upvote")}
          >
            UPVOTE
          </button>
          <button
            className={`p-4 lg:w-32 font-semibold border rounded-md transform duration-300 hover:bg-slate-600 hover:text-slate-50 hover:shadow-md ${
              marked === "downvote" && "bg-slate-600 text-slate-50"
            }`}
            onClick={() => voteClickHandler("downvote")}
          >
            DOWNVOTE
          </button>
        </div>
      </section>
    );
  }

  return content;
}
