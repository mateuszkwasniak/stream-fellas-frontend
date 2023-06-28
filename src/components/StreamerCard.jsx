import { useNavigate } from "react-router-dom";
import {
  HiOutlineArrowUpCircle,
  HiOutlineArrowDownCircle,
} from "react-icons/hi2";

/* eslint-disable react/prop-types */
export default function Streamer({ data }) {
  const navigate = useNavigate();

  return (
    <article
      className="h-fit min-w-fit w-[60%] gap-4 p-6 flex flex-col text-slate-800 bg-fuchsia-50 rounded-md shadow-lg transition duration-300 hover:bg-fuchsia-100 hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={() => navigate(`/streamer/${data._id}`)}
    >
      <h4 className="text-xl  text-center font-semibold">{data.name}</h4>
      <hr className="border-slate-300 w-[65%] self-center" />

      <div className="flex items-center justify-between mt-auto">
        <div className="flex gap-10">
          <div className="flex gap-2 items-center">
            <button className="text-4xl">
              <HiOutlineArrowUpCircle />
            </button>
            <span>{data.upvotes}</span>
          </div>
          <div className="flex gap-2 items-center">
            <button className="text-4xl">
              <HiOutlineArrowDownCircle />
            </button>
            <span>{data.downvotes}</span>
          </div>
        </div>
        <div className="w-10 h-6">
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
      </div>
    </article>
  );
}
