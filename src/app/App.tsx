import Footer from "src/components/Footer";
import Header from "src/components/Header";
import Home from "src/components/Home";
import MovieDetail from "src/components/MovieDetail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="bg-zinc-950 w-full h-full min-h-screen flex flex-col">
      <Router>
        <Header />
        <div className="flex flex-1 flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
