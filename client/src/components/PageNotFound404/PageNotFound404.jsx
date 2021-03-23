import React from "react";
import "./PageNotFound404.css";

export default class PageNotFound404 extends React.Component {
    
    render() {
        return (
            <div className={"pagenotfound-outer-container"}>
                <div className="wrapper">
                    <h1>Hmm.</h1>
                    <p>It seems that you're lost in a perpetual black hole. Let us help guide you out and get you back home.</p>
                    <div className="buttons"><a href="# " onClick={()=> this.props.history.goBack()}>back</a><a href="/">home</a><br /><span>Help me out</span></div>
                </div>
                <div className="space">
                    <div className="blackhole"></div>
                    <div className="ship"></div>
                </div>
            </div>
        )
    }
}