import React, { Component } from "react";

import Player from './player';
import Team from './team';
import TeamButton from './team-button';
import { FaArrowRight, FaDollar, FaArrowLeft } from 'react-icons/lib/fa';

import './play.css'

export default class Play extends Component {
	constructor(props){
		super(props);
		this.state = {
			"playerId": 0,
			"biddingTeam": 6,
			"teams": [
				{"name": "Manchester United", "image":"/images/teams/manchester.png", "amount":400, "players": []},
				{"name": "FC Barcelona", "image":"/images/teams/barcelona.png", "amount":400, "players": []},
				{"name": "Chelsea", "image":"/images/teams/chelsea.png", "amount":400, "players": []},
				{"name": "Real Madrid", "image":"/images/teams/realmadrid.png", "amount":400, "players": []},
				{"name": "Arsenal", "image":"/images/teams/arsenal.png", "amount":400, "players": []}
			],
			"players": [{
				"id": 49,
				"name": "Marek Hamsik",
				"pic": "images/hamsik.jpg",
				"basePrice": 25,
				"height": "6.0",
				"position": "MF",
				"rank": 41
			}],
			"currentBid": 25
		};
		if(!(localStorage.getItem('started'))){
			localStorage.setItem('playerId', this.state.playerId);
			localStorage.setItem('biddingTeam', this.state.biddingTeam);
			localStorage.setItem('current-bid', this.state.currentBid);
			localStorage.setItem('teams', JSON.stringify(this.state.teams));
			localStorage.setItem('players', JSON.stringify(this.state.players));
			localStorage.setItem('started', 'true');
		}
		else{
			this.state = {
				"playerId": localStorage.getItem('playerId'),
				"biddingTeam": localStorage.getItem('biddingTeam'),
				"currentBid": localStorage.getItem('current-bid'),
				"teams": JSON.parse(localStorage.getItem('teams')),
				"players": JSON.parse(localStorage.getItem('players'))
			};
		}
	}

	componentWillMount() {
		let players = JSON.parse(localStorage.getItem('players'));
		let length = players.length;
		if(length==1){
			fetch('/players.json').then(response => response.json()).then(data => {
				let players = data;
				//players.sort(function(a,b){return 0.5 - Math.random()});
				console.log(players);
				this.setState({"players": players});
			});
		}
	}

	changeTeam(i){
		this.setState({"biddingTeam": i});
	}

	buyPlayer(){
		let teams = this.state.teams;
		let players = this.state.players;
		let bid = this.state.currentBid;
		let team = this.state.biddingTeam;
		if( team>=0 && team<=4 ){
			let amount = teams[team].amount - bid;
			players[this.state.playerId].sellingPrice = bid;
			teams[team].amount = amount;
			teams[team].players.push(players[this.state.playerId]);
			this.setState({"teams": teams, "players": players});
		}
	}

	changeBid(event){
		console.log(event.target.value);
		this.setState({"currentBid": event.target.value});
	}

	nextPlayer(){
		let players = this.state.players;
		let playerId = parseInt(this.state.playerId);
		if(players[playerId].sellingPrice>0){
			players.splice(this.state.playerId, 1);
			playerId = (playerId) % (players.length);
			let currentBid = (players[playerId]).basePrice;
			this.setState({"playerId": playerId, "players": players, "currentBid": currentBid, biddingTeam: 6});
		}
		else{
			playerId = (playerId + 1)%this.state.players.length;
			console.log(playerId);
			let currentBid = (this.state.players[playerId]).basePrice;
			this.setState({"playerId": playerId, "currentBid": currentBid, "biddingTeam": 6});
		}

	}

	prevPlayer(){
		let players = this.state.players;
		let playerId = parseInt(this.state.playerId);
		if(players[playerId].sellingPrice>0){
			players.splice(this.state.playerId, 1);
			playerId = (players.length + playerId-1) % (players.length);
			let currentBid = (players[playerId]).basePrice;
			this.setState({"playerId": playerId, "players": players, "currentBid": currentBid, biddingTeam: 6});
		}
		else{
			playerId = (this.state.players.length + playerId - 1)%this.state.players.length;
			console.log(playerId);
			let currentBid = (this.state.players[playerId]).basePrice;
			this.setState({"playerId": playerId, "currentBid": currentBid, "biddingTeam": 6});
		}

	}

	render() {
		localStorage.setItem('playerId', this.state.playerId);
		localStorage.setItem('biddingTeam', this.state.biddingTeam);
		localStorage.setItem('current-bid', this.state.currentBid);
		localStorage.setItem('teams', JSON.stringify(this.state.teams));
		localStorage.setItem('players', JSON.stringify(this.state.players));
		let bought = "BUY";
		let buyFunction = this.buyPlayer.bind(this);
		if( this.state.players[this.state.playerId].sellingPrice > 0 ){
			bought = "SOLD";
			buyFunction = function(){};
		}
		//return(<div>hi</div>);
		return (
			<div style={{fontFamily: "Open Sans", background:"#232323", height:"100vh", width:"100vw", overflow:"hidden"}}>
				<link href="https://fonts.googleapis.com/css?family=Open+Sans|Raleway" rel="stylesheet"/>
				<link href="/bootstrap.min.css" rel="stylesheet"/>
				<div className="left-panel">
					<Player player={this.state.players[this.state.playerId]} />
					<div className="control-panel">
						<TeamButton bid={this.state.currentBid} state={this.state.biddingTeam==0?"active":"inactive"} team={this.state.teams[0]} click="0" func={this.changeTeam.bind(this)}/>
						<TeamButton bid={this.state.currentBid} state={this.state.biddingTeam==1?"active":"inactive"} team={this.state.teams[1]} click="1" func={this.changeTeam.bind(this)}/>
						<TeamButton bid={this.state.currentBid} state={this.state.biddingTeam==2?"active":"inactive"} team={this.state.teams[2]} click="2" func={this.changeTeam.bind(this)}/>
						<TeamButton bid={this.state.currentBid} state={this.state.biddingTeam==3?"active":"inactive"} team={this.state.teams[3]} click="3" func={this.changeTeam.bind(this)}/>
						<TeamButton bid={this.state.currentBid} state={this.state.biddingTeam==4?"active":"inactive"} team={this.state.teams[4]} click="4" func={this.changeTeam.bind(this)}/>

						<input id="price-tag" value={this.state.currentBid} onChange={this.changeBid.bind(this)}></input>
						<span className="buy-button" onClick={buyFunction}>
							<span className="buy-symbol"><FaDollar /></span>
							<span className="buy-text">{bought}</span>
						</span>
						<span className="next-button" onClick={this.prevPlayer.bind(this)}>
							<span className="next-symbol"><FaArrowLeft /></span>
							<span className="next-text">PREV</span>
						</span>
						<span className="next-button" onClick={this.nextPlayer.bind(this)}>
							<span className="next-text">NEXT</span>
							<span className="next-symbol"><FaArrowRight /></span>
						</span>
					</div>
	            </div>
	            <div className="right-panel">
	                <Team team={this.state.teams[0]}/>
	                <Team team={this.state.teams[1]}/>
	                <Team team={this.state.teams[2]}/>
	                <Team team={this.state.teams[3]}/>
	                <Team team={this.state.teams[4]}/>
	            </div>
				<script src="/bootstrap.js" />
			</div>
		);
	}
}
