import React, { Component } from "react";
import AnimatedNumber from 'react-animated-number';

export default class Team extends Component {
	render() {
		let players = [];
		players = this.props.team.players.map((obj,i) => (
			<li key={i}>{obj.name}({obj.position})</li>
		));
		let style={};
		if(players.length==11)
			style={color:"#A532C7"};
		else if(this.props.team.amount==0)
			style={opacity:"0.1"};
		return (
			<div className="team-card" style={style}>
                <img className="team-img" src={this.props.team.image}/>
                <div className="team-det">
					<div><span className="team-name">{this.props.team.name}</span><span className="team-count">{players.length} / 11</span></div>
					<div>
						<span className="budget-text">Remaining Budget:</span>
						<span className="team-budget">$<AnimatedNumber component="text" value={this.props.team.amount} style={{fontSize: 20}} duration={1000} stepPrecision={0}/>M</span>
					</div>
				</div>
				<div className="team-roster">
					<ul>
						{players}
					</ul>
				</div>
			</div>
		);
	}
}
