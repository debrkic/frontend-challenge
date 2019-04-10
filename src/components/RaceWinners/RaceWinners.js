import React, { Component } from 'react';
import axios from 'axios';
import './RaceWinners.scss';

class RaceWinners extends Component {
    state = {
        year: 2005,
        raceWinners: [],
        loading: false
    }

    componentDidMount() {
        let raceWinners = [];

        this.setState((state,props) => ({
            ...state,
            loading: true
        }),
        () => {
            axios.get(`http://ergast.com/api/f1/2005/results/1.json`)
            .then(response => {
                response.data.MRData.RaceTable.Races.forEach(race => {
                    //console.log(race);
                    raceWinners.push({
                        raceName: race.raceName,
                        round: race.round,
                        firstName: race.Results[0].Driver.givenName,
                        lastName: race.Results[0].Driver.familyName,
                        time: race.Results[0].Time.time,
                    });
                });

                this.setState((state,props) => ({
                    ...state,
                    raceWinners,
                    loading: false
                }),
                () => {
                    console.log(this.state);
                });
            });
        });

        
    }

    render() {
        let jsx = this.state.loading ? 
            (<tr><td colSpan={5}>Loading. Please wait...</td></tr>) : 
            this.state.raceWinners.map((winner, index) => (
                <tr key={index} className="table-row">
                    <td>{winner.raceName}</td>
                    <td>{winner.round}</td>
                    <td>{winner.firstName}</td>
                    <td>{winner.lastName}</td>
                    <td>{winner.time}</td>
                </tr>
            ));
        
        return (
            <div className="race-winners">
                <h1>Race Winners - ${this.state.year}</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Race Name</th>
                            <th>Round</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            jsx
                        }                   
                    </tbody>
                </table> 
            </div>
        )
    }
}

export default RaceWinners;
