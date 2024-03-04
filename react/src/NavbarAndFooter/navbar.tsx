import {useOktaAuth} from "@okta/okta-react";
import {SpinnerLoading} from "../utils/spinner";
import {LogOutModal} from "../Modal/LogOutModal";
import {Link, NavLink} from "react-router-dom";
import {useState} from "react";

function Navbar() {
    const {oktaAuth, authState} = useOktaAuth();

    const [logoutPrompt, setLogOutPrompt] = useState(false);

    const handleLogout = async () => {
        await oktaAuth.signOut();
        setLogOutPrompt(false);
    };

    if (!authState) {
        return <SpinnerLoading/>;
    }

    return (
        <>
            {logoutPrompt && (
                <LogOutModal
                    onClose={() => setLogOutPrompt(false)}
                    from={"logOut"}
                    onOkay={handleLogout}
                />
            )}

            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-sm ">
                    <img
                        src={"/Logo.png"}
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                        alt=""
                    />
                    <a className="navbar-brand m-2 " href="/home">
                        Lorem Ipsum
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/home">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">
                                    New Arrivals
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/search">
                                    Search
                                </NavLink>
                            </li>
                            {authState.isAuthenticated && (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/shelf">
                                        Shelf
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                        <form className="d-flex" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                onChange={(e) => console.log(e.target.value)}
                            />
                            <button className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </form>

                        {authState.isAuthenticated ? (
                            <div>
                                <button
                                    className="btn btn-secondary text-white m-2"
                                    onClick={() => setLogOutPrompt(true)}
                                >
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <Link className="btn btn-secondary text-white m-2" to="/login">
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;