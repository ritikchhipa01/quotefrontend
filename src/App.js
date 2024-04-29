import { Route, Routes } from "react-router-dom";
import QuoteMain from "./Components/QuoteMain";
import Login from "./Components/Login";

function App() {

  return (
    <Routes>
      <Route  path="/" element={<QuoteMain/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
  );
}

export default App;
