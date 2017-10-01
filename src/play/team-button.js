import React, { Component } from "react";

export default class Team extends Component {

	changeTeam(i){
		this.props.func(this.props.click);
	}

	render() {
		let style = "team-button";
		let func = this.changeTeam.bind(this);
		if(this.props.bid>this.props.team.amount || this.props.team.players.length==11){
			style += " inactive";
			func = function(){console.log("Insufficient Funds")};
		}
		else if(this.props.state=="active")
			style += " active";
        return (
			<div className={style} onClick={func}>
                {this.props.team.name}
			</div>
		);
	}
}
