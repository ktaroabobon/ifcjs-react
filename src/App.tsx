import "./App.css";
import { Header } from "./components/Header/Header";
import { Index } from "./pages/Index";

export function App() {
  return (
    <div className="App">
      <Header />
      <Index />
    </div>
  );
}
