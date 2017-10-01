import React, { Component } from "react";
import { Link } from "react-router-dom";

import './root.css'

export default class Root extends Component {
	render() {
		return (
			<div className="row about-container" style={{background: "#292929", width:"100vw", height: "100vh", textAlign: "center"}}>
				<img src="/images/game-plan.png" /><br / >
				<Link to="/play"><span className="enter-button">Enter &nbsp;Auction</span></Link>
			</div>
		);
	}
}
