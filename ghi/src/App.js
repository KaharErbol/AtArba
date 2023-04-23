import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import MainPage from "./MainPage.js";

function App() {
  const [launchInfo, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/items`;
      console.log("fastapi url: ", url);
      let response = await fetch(url);
      console.log("------- hello? -------");
      let data = await response.json();

      if (response.ok) {
        console.log("got launch data!");
        setLaunchInfo(data.launch_details);
      } else {
        console.log("drat! something happened");
        setError(data.message);
      }
    }
    getData();
  }, []);

  return (
    <div>
      {/* <ErrorNotification error={error} />
      <Construct info={launchInfo} /> */}
      <MainPage />
    </div>
  );
}

export default App;
