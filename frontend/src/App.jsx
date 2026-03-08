import './App.css';
import "./index.css";
import Body from './components/Body.jsx';
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <div className="App">
      {/* ab humm na app.jsx ko dynamic bana diya hai ke jo click karo ga uss hisab sa frontend show ho ga */}
      <Body />
      <Toaster />
    </div>
  );
}

export default App;
