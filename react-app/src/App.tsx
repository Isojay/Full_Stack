import "./App.css";
import Navbar from "./NavbarAndFooter/navbar";
import { Footer } from "./NavbarAndFooter/footer";
import { HomePage } from "./Components/homepage";
import { SearchPage } from "./Components/SearchBooksPage";
import { Redirect, Route, Switch , useHistory } from "react-router-dom";
import { BookCheckout } from "./Components/BookDetail/BookDetail";
import {oktaConfig} from "./lib/okta-config";
import {OktaAuth, toRelativeUrl} from "@okta/okta-auth-js"
import {LoginCallback, Security} from "@okta/okta-react";
import LogInWidget from "./Auth/LogInWidget";


const oktaAuth = new OktaAuth(oktaConfig);
function App() {

  const customAuthHandler =()=>{
    history.push('/login');
  }

  const history = useHistory();

  const restoreOriginalUri = async ( _oktaAuth : any, originalUri: any) =>{
      history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  }

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
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
            <Route path='/login' render={() =><LogInWidget config={oktaConfig}/> }/>
            <Route path='/login/callback' component={LoginCallback}/>
          </Switch>
        </div>
        <br />
        <Footer />
        </Security>
      </div>
    </>
  );
}

export default App;
