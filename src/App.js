import { Route, Routes, BrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";
import Enter from "./pages/Enter.jsx";
import Core from "./pages/Core.jsx";
import BufferDataDisplay from "./components/BufferDataDisplay.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/stage" element={<BufferDataDisplay />} />
        <Route path="/enter" element={<Enter />} />
        <Route path="/core" element={<Core />} />
      </Routes >
    </BrowserRouter>
  );
}

export default App;
