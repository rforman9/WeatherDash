import React, { Component } from 'react';
import NavBar from './components/NavBar';
import SectionList from './components/DashboardSections';
import './App.css';

console.log('section list is', SectionList);

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <SectionList />
      </div>
    );
  }
}

export default App;
