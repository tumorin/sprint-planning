import React from 'react';
import {connect} from 'react-redux';
// import logo from './logo.svg';
import './App.css';


import Header from './components/header/header.component';
import SprintTable from './components/sprint-table/sprint-table.component';
import {fetchSprintStartAsync} from './redux/sprint/sprint.actions';

class App extends React.Component {
  
  componentDidMount () {
    const {fetchSprintStartAsync} = this.props;
    fetchSprintStartAsync();
  }

  render () {
    return (
      <div className="App">
        <Header ></Header>
        <SprintTable></SprintTable>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchSprintStartAsync: () => dispatch(fetchSprintStartAsync())
})

export default connect(null,mapDispatchToProps)(App);
