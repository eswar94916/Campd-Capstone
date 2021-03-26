import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavbarCustom from "./components/NavBars/NavbarCustom";
import LogNavbar from "./components/NavBars/LogNavbar";
import Landing from "./components/LandingPage/Landing";

import Login from "./components/LoginPage/Login";
import Projects from "./components/ProjectsPage/ProjectsRedux";
import AddProject from "./components/AddProjectPage/AddProject";
import PrivateRoute from "./actions/PrivateRoute";
import Profile from "./components/ProfilePage/Profile";
import PageNotFound404 from "./components/PageNotFound404/PageNotFound404";
import ViewAProject from "./components/ViewProjectPage/ViewAProjectContainer"
import ViewAProfileProject from "./components/ProfilePage/ViewAProfileProjectContainer";
import AdminDashboard from "./components/AdminPage/AdminPage";
import EditAProfileProject from "./components/ProfilePage/EditAProfileProjectContainer";

class App extends Component {
  constructor(props) {
        super(props);
        this.state = {
            log: (localStorage.jwtToken),

        };

    }


  render() {



    return (
      <Router>
            <div className="App">
                { localStorage.jwtToken ? <LogNavbar /> : <NavbarCustom /> }
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <PrivateRoute exact path="/viewprofileproject" component={ViewAProfileProject} />
                    <PrivateRoute exact path="/editprofileproject" component={EditAProfileProject} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/projects" component={Projects} />
                    <PrivateRoute exact path="/addproject" component={AddProject} />
                    <PrivateRoute exact path="/viewproject" component={ViewAProject} />
                    <PrivateRoute exact path="/profile" component={Profile} />
                    <PrivateRoute exact path="/admin" component={AdminDashboard} />
                    <Route path="/*" component={PageNotFound404} />
                </Switch>
            </div>
      </Router>
    );
  }
}
export default App;
