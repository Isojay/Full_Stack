import "./App.css";
import "./index.css";

import Navbar from "./NavbarAndFooter/navbar";
import {Footer} from "./NavbarAndFooter/footer";
import {SearchPage} from "./Components/Search/SearchBooksPage";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import {Helmet} from 'react-helmet';
import {BookCheckout} from "./Components/BookDetail/BookDetail";
import {oktaConfig} from "./lib/okta-config";
import {OktaAuth, toRelativeUrl} from "@okta/okta-auth-js"
import {LoginCallback, SecureRoute, Security} from "@okta/okta-react";
import LogInWidget from "./Auth/LogInWidget";
import {ShelfPage} from "./Components/ShelfPage/ShelfPage";
import {NotFound} from "./utils/pageNotFound";
import HomePage from "./Components/Homepage/homepage";
import ErrorBoundary from './utils/ErrorBoundary';
import '@fortawesome/fontawesome-free/css/all.css';
import "./css/SimilarBookRecomCSS.css"
import {useEffect} from "react";
import {ToastContainer} from "react-toastify";

const oktaAuth = new OktaAuth(oktaConfig);

function App() {

    const customAuthHandler = () => {
        history.push('/login');
    }
    useEffect(() => {
        const routeName = location.pathname.split("/").pop();
        document.title = `BookishBazaar - ${routeName}`;
    }, [location]);

    const history = useHistory();

    const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
        history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
    }
    console.log(oktaAuth)

    return (
        <>
            <ToastContainer
                autoClose={1500}/>
            <div className="d-flex flex-column min-vh-100">
                <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}
                          onAuthRequired={customAuthHandler}>
                    <Navbar/>
                    <div className="flex-grow-1">
                        <ErrorBoundary> {/* ErrorBoundary added here */}
                            <Switch>
                                <Route path="/" exact>
                                    <Redirect to="/home"/>
                                </Route>
                                <Route path="/home">
                                    <Helmet>
                                        <title>BookishBazaar - Homepage</title>
                                    </Helmet>
                                    <HomePage/>
                                </Route>
                                <Route path="/search">
                                    <Helmet>
                                        <title>BookishBazaar - Search</title>
                                    </Helmet>
                                    <SearchPage/>
                                </Route>
                                <Route path="/viewDetails/:id">
                                    <Helmet>
                                        <title>BookishBazaar - Homepage</title>
                                    </Helmet>
                                    <BookCheckout/>
                                </Route>

                                <Route path='/login' render={() => <LogInWidget config={oktaConfig}/>}/>
                                <Route path='/login/callback' component={LoginCallback}/>

                                <SecureRoute path="/shelf">
                                    <Helmet>
                                        <title>BookishBazaar - Shelf</title>
                                    </Helmet>
                                    <ShelfPage/>

                                </SecureRoute>
                                {/*<SecureRoute path="/test">*/}
                                {/*    <Helmet>*/}
                                {/*        <title>BookishBazaar - Test</title>*/}
                                {/*    </Helmet>*/}
                                {/*    <Test/>*/}

                                {/*</SecureRoute>*/}
                                <Route path="/*">
                                    <Helmet>
                                        <title>BookishBazaar - Not Found</title>
                                    </Helmet>
                                    <NotFound/>
                                </Route>
                            </Switch>
                        </ErrorBoundary> {/* Closing ErrorBoundary */}
                    </div>
                    <br/>
                    <Footer/>
                </Security>
            </div>
        </>
    );
}

export default App;
