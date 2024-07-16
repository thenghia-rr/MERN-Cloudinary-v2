import "./App.css";
import Upload from "../src/components/Upload";
import { ShowUsers } from "./components/ShowUsers";

function App() {
  return (
    <>
      <div className="App">
        <h1>Upload files using Cloudinary Service in MERN stack project</h1>
        <Upload />
        <ShowUsers/>

      </div>
    </>
  );
}

export default App;
