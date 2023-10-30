import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Navbar from "./NavbarAndFooter/navbar";
import { Footer } from "./NavbarAndFooter/footer";
import { HomePage } from "./Components/homepage";
import { SearchPage } from "./Components/SearchBooksPage";
import { Redirect, Route, Switch } from "react-router-dom";
import { BookCheckout } from "./Components/BookDetail/BookDetail";

function App() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="flex-grow-1">
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="/home">
              <HomePage />
            </Route>
            <Route path="/search">
              <SearchPage />
            </Route>
            <Route path="/viewDetails/:id">
              <BookCheckout />
            </Route>
          </Switch>
        </div>
        <br />
        <Footer />
      </div>
    </>
  );
}

export default App;
