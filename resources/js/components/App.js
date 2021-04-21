import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import Router from "./Router";

class App extends Component {
    render () {
        return (
            <Router />
        )
    }
}

ReactDOM
    .render(<BrowserRouter>
                    <App/>
                </BrowserRouter>,
    document.getElementById('react_content')
)
