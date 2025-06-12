import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Meals from "./pages/Meals";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout children={<Home />} />} />
        <Route path="/about" element={<Layout children={<About />} />} />
        <Route path="/meals" element={<Layout children={<Meals />} />} />
        <Route path="/contact" element={<Layout children={<Contact />} />} />
        <Route
          path="*"
          element={
            <Layout
              children={
                <div className="container mx-auto px-4 py-8 text-center">
                  <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
                  <p>The page you're looking for doesn't exist.</p>
                </div>
              }
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
