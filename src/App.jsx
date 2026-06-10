import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auction from "./pages/Auction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auction/:id" element={<Auction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
