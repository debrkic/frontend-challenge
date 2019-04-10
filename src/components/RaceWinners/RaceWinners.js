import React, { Component } from 'react';
import axios from 'axios';
import './RaceWinners.scss';

class RaceWinners extends Component {
    state = {
        year: 0,
        raceWinners: [],
        loading: false
    }

    findMinTime = (array) => {
        let min = array[0].timeMillis;
        array.forEach((item) => {
            min = item.timeMillis < min ? item.timeMillis : min;
        });

        return min;
    }

    componentDidMount() {
        let raceWinners = [];

        this.setState((state,props) => ({
            ...state,
            year: props.match.params.year,
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
                        best: false
                    });
                });

                // Find the best driver
                const minTime = this.findMinTime(raceWinners);
                const winner = raceWinners.find(winner => winner.timeMillis === minTime);
                winner.best = true;

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
            (<tr><td colSpan={5}>Loading. Please wait...</td></tr>) : 
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
