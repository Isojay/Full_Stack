import { NavLink, Link } from "react-router-dom";
import React, { Fragment } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../utils/spinner";


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}


function Navbar() {
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) {
    return <SpinnerLoading />;
  }

  const handleLogout = async () => oktaAuth.signOut();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid custom-width-80">
          <img
            src={"Logo.png"}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt=""
          />
          <a className="navbar-brand m-2 " href="/">
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
                {/* <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        <div className="px-4 py-2 text-sm text-gray-900 dark:text-white">
                          <div>{authState.idToken?.claims.name}</div>
                          <div className="font-medium truncate">
                            {authState.idToken?.claims.email}
                          </div>
                        </div>
                      </Menu.Item>
                      <div className="border-b border-gray-300 my-2"></div>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            History
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={handleLogout}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu> */}
                {/* <button
                  className="btn btn-secondary text-white m-2"
                  disabled
                >
                  Cart
                </button> */}
                <button
                  className="btn btn-secondary text-white m-2"
                  onClick={handleLogout}
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
