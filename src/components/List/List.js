import React, { Component } from 'react';
import axios from 'axios';
import './List.scss';

class List extends Component {
    state = {
        champions: [],
        loading: false
    }

    async getChampions() {
        let champions = [];

        for( let year = 2005; year < 2016; year++) {
            const driver = await axios.get(`http://ergast.com/api/f1/${year}/driverStandings.json?limit=1`);
            champions.push({ 
                year, 
                firstName: driver.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.givenName,
                lastName: driver.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.familyName 
            });          
        }

        this.setState((state, props) => ({
            ...state,
            champions,
            loading: false
        })); 
    }

    componentDidMount() {
        this.setState((state,props) => ({
            ...state,
            loading: true
        }),
        () => {
            this.getChampions();
        });
    }

    goToRaceWinners = (year) => {
        window.location.assign(`/race-winners/${year}`); 
    }

    render() {
        let jsx = this.state.loading ? 
            (<tr><td colSpan={3}>Loading. Please wait...</td></tr>) : 
            this.state.champions.map((champion, index) => (
                <tr key={index} className="table-row" onClick={() => this.goToRaceWinners(champion.year)}>
                    <td>{champion.year}</td>
                    <td>{champion.firstName}</td>
                    <td>{champion.lastName}</td>
                </tr>
            ));
        
        return (
            <div className="list">
                <h1>Champions</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>First Name</th>
                            <th>Last Name</th>
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

export default List;
