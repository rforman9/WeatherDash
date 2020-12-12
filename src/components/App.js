import React, { Component } from 'react';
import NavBar from './NavBar';
import DisplayDashboard from './DisplayDashboard';
import '../css/App.css';

class App extends Component {

  componentDidMount() {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const content = result.map(item => {
          return item;
        })
      });
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <DisplayDashboard />
      </div>
    );
  }
}

export default App;
