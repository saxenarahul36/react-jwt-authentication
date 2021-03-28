import { Switch, Route, Redirect } from "react-router-dom";
import Dhashboard from "../components/Dashboard";
import Public from "../components/Public";
import Search from "../components/Search";
import Login from "../components/user/login";
import Register from "../components/user/register";
import AuthService from "../services/api/auth.service";
import BoardUser from "../components/BoardUser";
import BoardModerator from "../components/BoardModerator";
import BoardAdmin from "../components/BoardAdmin";
import Profile from "../components/Profile";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = AuthService.getCurrentUser();
  return (
    <Route
      {...rest}
      render={(props) =>
        user?.username ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
const UnauthenticatedRoute = ({ component: Component, ...rest }) => {
  const user = AuthService.getCurrentUser();
  let isAuth = user?.accessToken;
  if (isAuth) {
    window.history.back();
    return;
  }
  return (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  );
};
const Routes = () => (
  /* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */
  <Switch>
    <UnauthenticatedRoute exact path="/register" component={Register} />
    <UnauthenticatedRoute path="/login" component={Login} />
    <Route exact path={["/", "/public"]} component={Public} />
    <ProtectedRoute path="/dashboard" component={Dhashboard} />
    <ProtectedRoute path="/search" component={Search} />
    <ProtectedRoute path="/profile" component={Profile} />
    <ProtectedRoute path="/user" component={BoardUser} />
    <ProtectedRoute path="/mod" component={BoardModerator} />
    <ProtectedRoute path="/admin" component={BoardAdmin} />
  </Switch>
);

export default Routes;
