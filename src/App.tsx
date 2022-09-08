import "./App.css";
import {Index} from "./pages/Index";
import {CssBaseline} from "@mui/material";
import {Navibar} from "./components/Navibar/Navibar";

export function App() {
  return (
    <div className="App">
      <CssBaseline/>
      <Navibar/>
      <Index/>
    </div>
  );
}
