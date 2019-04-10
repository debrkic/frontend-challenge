import React, { Component } from 'react';
import List from './components/List/List';
import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component { 

  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact component={List} />
      </BrowserRouter>
    );
  }
}

export default App;
