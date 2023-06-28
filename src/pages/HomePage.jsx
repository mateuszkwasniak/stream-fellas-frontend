import Background from "../components/Background";
import StreamerUploadForm from "../components/StreamerUploadForm";
import StreamerList from "../components/StreamerList";

const HomePage = () => {
  return (
    <>
      <StreamerUploadForm />
      <StreamerList />
      <Background />
    </>
  );
};

export default HomePage;
