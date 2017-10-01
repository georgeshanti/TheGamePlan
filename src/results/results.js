import React, { Component } from "react";

export default class Results extends Component {

	render() {
		let teams = JSON.parse(localStorage.getItem('teams'));
        let table = teams.map(function(obj,i){
            let total = 0;
            let players = obj.players.map(function(obj,i){
                total += obj.sellingPrice * obj.rank;
                return (
                    <tr>
                        <td style={{border: "1px solid black", width: "150px"}}>{obj.name}</td><td style={{border: "1px solid black", width: "100px"}}>{obj.rank} * {obj.sellingPrice}</td><td style={{border: "1px solid black", width: "50px"}}> {obj.rank * obj.sellingPrice}</td>
                    </tr>
                );
            });
            return(
                <p>
                    <h1>{obj.name}</h1>
                    <table>
                        {players}
                    <tr><td colspan="2" style={{border: "1px solid black"}}>Total: </td><td style={{border: "1px solid black"}}>{total}</td></tr>
                    </table>
                </p>
            )
        });
		return (
			<div>
                {table}
			</div>
		);
	}
}
