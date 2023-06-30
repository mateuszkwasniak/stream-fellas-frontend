import { useState, useEffect } from "react";
import { useContext } from "react";
import FormContext from "../context/FormProvider";
import axios from "../api/axios";
import { MdOutlineWarningAmber } from "react-icons/md";
import { MdCheckCircleOutline } from "react-icons/md";
import Spinner from "./Spinner";
import { streamingPlatforms } from "../utils/data/streamingPlatforms.js";

const initInputsValidState = {
  name: false,
  description: false,
  platform: false,
};

const initStreamerState = {
  name: "",
  description: "",
  platform: "",
};

const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const DESC_REGEX = /^(?! )(?!\s)(.{20,300})(?<!\s)(?! )$/;

export default function StreamerUploadForm() {
  const [streamer, setStreamer] = useState(initStreamerState);
  const [nameFocus, setNameFocus] = useState(false);
  const [descriptionFocus, setDescriptionFocus] = useState(false);
  const [platformFocus, setPlatformFocus] = useState(false);
  const [invalidInputs, setInvalidInputs] = useState(initInputsValidState);
  const [allInputsValid, setAllInputsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { showForm, setShowForm } = useContext(FormContext);

  const handleInputChange = (e) =>
    setStreamer((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    setInvalidInputs(initInputsValidState);
    setError("");

    const validName = NAME_REGEX.test(streamer.name);
    const validDescription = DESC_REGEX.test(streamer.description);
    const validPlatform = streamingPlatforms.includes(streamer.platform);

    if (!validName || !validDescription || !validPlatform) {
      return;
    }

    setIsLoading(true);

    try {
      await axios.post("/streamers", JSON.stringify(streamer));
      setStreamer(initStreamerState);
      setSuccess(true);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    !descriptionFocus &&
      setStreamer((prev) => ({
        ...prev,
        description: prev.description.trim(),
      }));
  }, [descriptionFocus]);

  useEffect(() => {
    !nameFocus &&
      setStreamer((prev) => ({
        ...prev,
        name: prev.name.trim(),
      }));
  }, [nameFocus]);

  useEffect(() => {
    let timeout;
    if (success) {
      timeout = setTimeout(() => {
        setSuccess(false);
        setShowForm(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [success, setShowForm]);

  useEffect(() => {
    const valid = NAME_REGEX.test(streamer.name);
    setInvalidInputs((prev) => ({ ...prev, name: !valid }));
  }, [streamer.name]);

  useEffect(() => {
    const valid = DESC_REGEX.test(streamer.description);
    setInvalidInputs((prev) => ({ ...prev, description: !valid }));
  }, [streamer.description]);

  useEffect(() => {
    const valid = streamingPlatforms.includes(streamer.platform);
    setInvalidInputs((prev) => ({ ...prev, platform: !valid }));
  }, [streamer.platform]);

  useEffect(() => {
    for (const val in invalidInputs) {
      if (invalidInputs[val] === true) {
        setAllInputsValid(false);
        return;
      }
    }

    setAllInputsValid(true);
  }, [invalidInputs]);

  return (
    <form
      className={`${
        !showForm ? "absolute left-[-9999px]" : "top-26"
      } p-6 md:p-12 md:sticky md:top-32 flex w-[95%] h-[fit] md:w-[400px] lg:w-[500px] flex-col border border-purple-100 rounded-md shadow-lg bg-purple-50 text-slate-800 z-40`}
      onSubmit={handleFormSubmission}
    >
      <h2 className="text-xl md:text-3xl font-semibold text-slate-500 mb-5 md:mb-10">
        Create your Streamer
      </h2>
      <label htmlFor="name" className="mb-2 text-sm md:text-base">
        Name
      </label>
      <input
        required
        type="text"
        id="name"
        name="name"
        placeholder="Kyle Jackson"
        maxLength={24}
        className={`${
          invalidInputs.name && streamer.name && "outline-red-600"
        } p-3 rounded-md outline-none focus:outline-purple-300 border border-fuchsia-100 ease-in-out duration-300`}
        value={streamer.name}
        onChange={handleInputChange}
        onFocus={() => setNameFocus(true)}
        onBlur={() => setNameFocus(false)}
        autoComplete="off"
      />
      <div className="h-5">
        <p
          className={`${
            ((invalidInputs.name && nameFocus) ||
              !invalidInputs.name ||
              !streamer.name) &&
            "absolute left-[-9999px] opacity-0"
          } flex gap-2 items-center mt-2 text-sm text-red-700 ease-in-out duration-300 opacity-1`}
        >
          <MdOutlineWarningAmber /> Please enter streamer&apos;s name in the
          correct format
        </p>
        <p
          className={`${
            !nameFocus && "absolute left-[-9999px] opacity-0"
          } flex gap-2 items-center mt-2 text-xs text-slate-600 ease-in-out duration-300 opacity-1`}
        >
          4 to 24 characters, starting with a letter; letters, numbers,
          underscores, hyphens allowed.
        </p>
      </div>

      <label htmlFor="description" className="mb-2 mt-8 text-sm md:text-base">
        Description
      </label>
      <textarea
        required
        id="description"
        name="description"
        placeholder="He is a passionate gamer and visual creator who loves to stream."
        rows="5"
        cols="50"
        maxLength={300}
        className={`${
          invalidInputs.description && streamer.description && "outline-red-600"
        } p-3 rounded-md outline-none focus:outline-purple-300 border border-fuchsia-100 ease-in-out duration-300 resize-none`}
        value={streamer.description}
        onChange={handleInputChange}
        onFocus={() => setDescriptionFocus(true)}
        onBlur={() => setDescriptionFocus(false)}
        spellCheck="false"
      />
      <div className="h-5">
        <p
          className={`${
            ((invalidInputs.description && descriptionFocus) ||
              !invalidInputs.description ||
              !streamer.description) &&
            "absolute left-[-9999px] opacity-0"
          } flex gap-2 items-center mt-2 text-sm text-red-700 ease-in-out duration-300 opacity-1`}
        >
          <MdOutlineWarningAmber /> Please enter your description using correct
          format.
        </p>
        <p
          className={`${
            !descriptionFocus && "absolute left-[-9999px] opacity-0"
          } flex gap-2 items-center mt-2 text-xs text-slate-600 ease-in-out duration-300 opacity-1`}
        >
          20-300 characters.
        </p>
      </div>

      <label htmlFor="platform" className="mb-2 mt-8 text-sm md:text-base">
        Platform
      </label>
      <select
        className={`${
          invalidInputs.platform && streamer.platform && "outline-red-600"
        } p-3 rounded-md outline-none focus:outline-purple-300 border border-fuchsia-100 ease-in-out duration-300 bg-white`}
        required
        name="platform"
        id="platform"
        value={streamer.platform}
        onChange={handleInputChange}
        onFocus={() => setPlatformFocus(true)}
        onBlur={() => setPlatformFocus(false)}
      >
        <option value=""></option>
        {streamingPlatforms.map((platform) => (
          <option key={platform} value={platform}>
            {platform}
          </option>
        ))}
      </select>
      <div className="h-5">
        <p
          className={`${
            ((invalidInputs.platform && platformFocus) ||
              !invalidInputs.platform ||
              !streamer.platform) &&
            "absolute left-[-9999px] opacity-0"
          } flex gap-2 items-center mt-2 text-sm text-red-700 ease-in-out duration-300 opacity-1`}
        >
          <MdOutlineWarningAmber /> Please select the streaming platform.
        </p>
      </div>

      <button
        type="submit"
        disabled={!allInputsValid || isLoading ? true : false}
        className={`w-full h-10 text-xl border-fuchsia-800 rounded-lg bg-fuchsia-700 text-white font-semibold mt-9 px-5 py-2 flex items-center justify-center  hover:bg-fuchsia-600 duration-700 ease-in-out shadow-md  cursor-pointer disabled:bg-slate-500 disabled:cursor-not-allowed`}
      >
        {isLoading ? <Spinner /> : "Submit"}
      </button>
      <div className="flex items-center justify-center h-2 mt-5">
        <p
          className={`${
            !error && "absolute left-[-9999px] opacity-0"
          } flex gap-2 items-center justify-center mt-5 text-md text-red-700 ease-in-out duration-300 opacity-1`}
        >
          <MdOutlineWarningAmber /> {error}
        </p>
        <p
          className={`${
            !success && "absolute left-[-9999px] opacity-0"
          } flex gap-2 items-center justify-center mt-5 text-md text-green-700 ease-in-out duration-300 opacity-1`}
        >
          <MdCheckCircleOutline /> Streamer uploaded successfully
        </p>
      </div>
    </form>
  );
}
