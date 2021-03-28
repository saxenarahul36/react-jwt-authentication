import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Routes from "./routes/route";

export default function App() {
  return (
    <Router>
      <Header />
      <div className="content">
        <main>
          <Routes />
        </main>
      </div>
      <Footer />
    </Router>
  );
}
