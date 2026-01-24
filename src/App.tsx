import './App.css'
import {useEffect} from "react";
import app from "./config/firebase.ts";

function App() {
  useEffect(() => {
    console.log(app);
  },[])
  return (
    <>
      <h1 className="h-1 fill-gray-900">
        Verified Campaigns
      </h1>
    </>
  )
}

export default App
