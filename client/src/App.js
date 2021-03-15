import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavbarCustom from "./components/NavBars/NavbarCustom";
import LogNavbar from "./components/NavBars/LogNavbar";
import Landing from "./components/LandingPage/Landing";

import Login from "./components/LoginPage/Login";
import Projects from "./components/ProjectsPage/ProjectsRedux";
import Signup from "./components/SignupPage/SignupRedux";
import AddProject from "./components/AddProjectPage/AddProjectRedux";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/ProfilePage/Profile";
import ViewProject from "./components/ViewProjectPage/ViewProjectRedux"
import ViewProfileProject from "./components/ProfilePage/ViewProfileProjectRedux"

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
                    <Route exact path="/viewprofileproject" component={ViewProfileProject} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/projects" component={Projects} />
                    <Route exact path="/addproject" component={AddProject} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/viewproject" component={ViewProject} />
                </Switch>
                
                <Switch>
                    <PrivateRoute exact path="/profile" component={Profile} />
                </Switch>
            </div>
      </Router>
    );
  }
}
export default App;
