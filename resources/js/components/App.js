import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import Main from "./Router";

class App extends Component {
    render () {
        return (
            <div>
                <div>
                    <Main />
                </div>
            </div>
        )
    }
}

ReactDOM
    .render(<BrowserRouter>
                    <App/>
                </BrowserRouter>,
    document.getElementById('react_content')
)
