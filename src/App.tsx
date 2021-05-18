import React from 'react';
import { Switch, Route } from 'react-router';
import { NavLink } from 'react-router-dom';
// import { Layout } from 'antd';
import Home from './pages/Home';
import Editor from './pages/Editor';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import 'common/styles/normalize.css';
import './App.scss';

function App() {
    return (
        <div className="App">
            {/* <header>
                <ul>
                    <li>
                        <NavLink to="/home" activeClassName="selected">
                            主页
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/editor" activeClassName="selected">
                            编辑器
                        </NavLink>
                    </li>
                </ul>
            </header> */}
            <Switch>
                <Route exact path="/home" component={Home} />
                <Route path="/editor" component={Editor} />
                <Route component={Home} />
            </Switch>
        </div>
    );
}

export default App;
