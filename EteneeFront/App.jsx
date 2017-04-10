import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

import Home from './components/Home.jsx'
import Login from './login/login.jsx'

class App extends Component {
    render() {
      return (
        <Router history={hashHistory}>
          <Route path='/' component={Login} />
          <Route path='/home' component={Home} />
        </Router>
      )
    }
}

export default App;