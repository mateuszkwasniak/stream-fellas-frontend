import { useNavigate } from "react-router-dom";

import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";

import PropTypes from "prop-types";

export default function Streamer({ data }) {
  const navigate = useNavigate();

  return (
    <article
      className="h-fit min-w-fit w-full p-4 flex flex-col text-slate-800 bg-purple-50 border-purple-100 rounded-md shadow-lg transition duration-300 hover:bg-purple-100 hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={() => navigate(`/streamer/${data._id}`)}
    >
      <div className="w-10 h-6 ml-auto">
        <img
          src={
            new URL(
              `../assets/images/platforms/${data.platform}.svg`,
              import.meta.url
            ).href
          }
          alt="StreamingPlatform"
          className="object-cover h-full opacity-80"
        />
      </div>
      <h4 className="text-xl text-center font-semibold mb-2">{data.name}</h4>

      <hr className="border-slate-300 w-[65%] mb-4 self-center" />

      <div className="flex items-center justify-center gap-4 flex-wrap mt-auto">
        <div className="flex gap-1 items-center">
          <BiUpArrowAlt className="text-2xl lg:text-4xl" />
          <span>{data.upvotes}</span>
        </div>
        <div className="flex gap-1 items-center">
          <BiDownArrowAlt className="text-2xl lg:text-4xl" />
          <span>{data.downvotes}</span>
        </div>
      </div>
    </article>
  );
}

Streamer.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    platform: PropTypes.string,
    name: PropTypes.string,
    upvotes: PropTypes.number,
    downvotes: PropTypes.number,
  }).isRequired,
};
