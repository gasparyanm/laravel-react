import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from '../store'
import Router from "./Router"

console.log('store:::', store.getState())
class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        )
    }
}

ReactDOM
    .render(<BrowserRouter>
                    <App/>
                </BrowserRouter>,
    document.getElementById('react_content')
)
