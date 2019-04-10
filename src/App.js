import React, { Component } from 'react';
import List from './components/List/List';
import RaceWinners from './components/RaceWinners/RaceWinners';
import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component { 

  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact component={List} />
        <Route path="/race-winners/:year" exact component={RaceWinners} />
      </BrowserRouter>
    );
  }
}

export default App;
