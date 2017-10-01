import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import './App.css';
import Root from './root/root';
import Play from './play/play';
import Results from './results/results';

class App extends Component {
  render() {
    return (
        <div>
            <div className="content">
                <Switch>
                    <Route exact path="/" component={Root} />
                    <Route path="/play" component={Play} />
                    <Route path="/results" component={Results} />
                </Switch>
            </div>
        </div>
    );
  }
}

export default App;
