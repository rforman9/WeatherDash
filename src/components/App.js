import React, { Component } from 'react';
import NavBar from './NavBar';
import DisplayDashboard from './DisplayDashboard';
import '../css/App.css';

class App extends Component {

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
