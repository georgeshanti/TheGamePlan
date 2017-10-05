import React, { Component } from "react";

export default class Player extends Component {
	render() {
		let player = this.props.player;
		return (
			<div className="player-card">
                <img className="player-img" src={player.pic}/>
                <div className="player-det">
					<span className="rank-name">{player.name}</span>
					<div className="player-stats">
						<span className="player-stat">Age:</span><span className="stat-val">{player.age}</span><br/>
						<span className="player-stat">Position:</span><span className="stat-val">{player.position}</span><br/>
						<span className="player-stat">Base Price:</span><span className="stat-val">{player.basePrice}M</span><br/>
					</div>
				</div>
			</div>
		);
	}
}
