import Footer from "src/components/Footer";
import Header from "src/components/Header";
import Home from "src/components/Home";
import MovieDetail from "src/components/MovieDetail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />}/>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;