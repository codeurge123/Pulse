import './App.css';
import "./index.css";
import Body from './components/Body.jsx';
import { Toaster } from "react-hot-toast";
import AuthHandler from "./components/AuthHandler";

function App() {
  return (
    <div className="App">

      <AuthHandler />
      <Body />
      <Toaster />

    </div>
  );
}

export default App;