import React, { Component } from 'react';
import axios from 'axios';
import './RaceWinners.scss';

class RaceWinners extends Component {
    state = {
        year: 0,
        raceWinners: [],
        loading: false,
        champion: {}
    }

    componentDidMount() {
        let raceWinners = [];

        this.setState((state,props) => ({
            ...state,
            year: props.match.params.year,
            champion: { firstName: props.match.params.firstname, lastName: props.match.params.lastname },
            loading: true
        }),
        () => {
            axios.get(`http://ergast.com/api/f1/${this.state.year}/results/1.json`)
            .then(response => {
                response.data.MRData.RaceTable.Races.forEach(race => {
                    raceWinners.push({
                        raceName: race.raceName,
                        round: race.round,
                        firstName: race.Results[0].Driver.givenName,
                        lastName: race.Results[0].Driver.familyName,
                        time: race.Results[0].Time.time,
                        timeMillis: parseInt(race.Results[0].Time.millis, 10),
                        best: (this.state.champion.firstName === race.Results[0].Driver.givenName) && (this.state.champion.lastName === race.Results[0].Driver.familyName)
                    });
                });

                this.setState((state,props) => ({
                    ...state,
                    raceWinners,
                    loading: false
                }));
            });
        });
    }

    render() {
        let jsx = this.state.loading ? 
            (<tr><td colSpan={6}>Loading. Please wait...</td></tr>) : 
            this.state.raceWinners.map((winner, index) => (
                <tr key={index} className={winner.best ? 'table-highlighted' : ''}>
                    <td>{winner.raceName}</td>
                    <td>{winner.round}</td>
                    <td>{winner.firstName}</td>
                    <td>{winner.lastName}</td>
                    <td>{winner.time}</td>
                    <td>{winner.timeMillis}</td>
                </tr>
            ));
        
        return (
            <div className="race-winners">
                <h1>Race Winners - {this.state.year}</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Race Name</th>
                            <th>Round</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Time</th>
                            <th>Milli-Seconds</th>
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
