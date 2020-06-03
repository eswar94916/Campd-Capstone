import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Style.scss';

class LogNavbar extends Component {
  constructor(props) {
        super(props);
        this.state = {
            activeClasses: [],
            indexval: 0,
            log: localStorage.getItem("jwtToken")
        };
        this.addActiveClass = this.addActiveClass.bind(this);
    }

    addActiveClass(index) {
      let activeClasses = []


        switch(index) {
          case 0:
            activeClasses = [true, false, false, false]
            break;
          case 1:
            activeClasses = [false, true, false, false]
            break;
          case 2:
            activeClasses = [false, false, true, false]
            break;
          case 3:
            activeClasses = [false, false, false, true]
            break;
          default:
            activeClasses = [true, false, false, false]
            break;
          }
          this.setState({activeClasses, index});
        }

  render() {
    const activeClasses = this.state.activeClasses.slice();
    return (
      <div className="topnav">
        <section className="header">
          <div>
            <h3 className="title">Research and Project Portal</h3>
          </div>
          <div className="banner">
            <img className="unt-banner" alt={ 'University of North Texas logo' } src={ require('./unt-banner.svg') }/>
          </div>
        </section>
        <nav>
          <div>
            <Link to="/" className={activeClasses[0]? "active" : "inactive"} onClick={() => this.addActiveClass(0)} >Home</Link>
            <Link to="/addproject" className={activeClasses[1]? "active" : "inactive"} onClick={() => this.addActiveClass(1)} > Add project</Link>
            <Link to="/projects" className={activeClasses[2]? "active" : "inactive"} onClick={() => this.addActiveClass(2)} >Projects</Link>
            <Link to="/profile" className={activeClasses[3]? "active" : "inactive"} onClick={() => this.addActiveClass(3)} >Profile</Link>

          </div>
        </nav>
      </div>
    );
  }
}
export default LogNavbar;
