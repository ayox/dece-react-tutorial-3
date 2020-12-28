import { Button } from "antd";
import React, { useContext, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import Login from "./Login";
import TodoList from "./Todo";
import Profile from "./Profile";

const authContext = createContext();

function useAuth() {
  return useContext(authContext);
}

function AuthButton() {
  let history = useHistory();
  let auth = useAuth();

  return (
    auth.user && (
      <p>
        Welcome! {auth.user.email}
        <Link style={{ marginLeft: 20 }} to="/profile">
          Profile
        </Link>
        <Link style={{ marginLeft: 20 }} to="/">
          Home
        </Link>
        <Button
          style={{ marginLeft: 20 }}
          onClick={() => {
            auth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </Button>
      </p>
    )
  );
}
export default function AuthExample() {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <div style={{ margin: 20 }}>
            <AuthButton />
          </div>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
             <PrivateRoute path="/profile">
              <Profile />
            </PrivateRoute>
            <PrivateRoute path="/">
              <TodoList />
            </PrivateRoute> 
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}
const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const signin = (cb, u) => {
    return fakeAuth.signin(() => {
      setUser(u);
      cb();
    });
  };

  const signout = (cb) => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout,
  };
}
function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = (user) => {
    auth.signin(() => {
      history.replace(from);
    }, user);
  };

  return (
    <div className="App">
      <div className="login">
        <h1>Login</h1>
        <Login setUser={login} />
      </div>
    </div>
  );
}
