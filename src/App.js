import React from 'react';
import { Router, Route, Switch } from 'react-router';

import './App.css';
import Search from './Search';
import MyReads from './MyReads';


class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
          <Switch>
            <Route exact path='/' component={MyReads} />
            <Route path='/search' component={Search} />
          </Switch>
      </div>
    )
  }
}

export default BooksApp
