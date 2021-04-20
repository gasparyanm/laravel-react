import React, {Component} from 'react'
import Header from './Header';
import Footer from './Footer';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            user: {}
        }
    }
    // check if user is authenticated and storing authentication data as states if true
    UNSAFE_componentWillMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
        }
    }
    render() {
        return (
            <div>
                <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn}/>
                <span>Whatever normally goes into the home/index page; A Plea To Heal The World for instance</span>
                <Footer/>
            </div>
        )
    }
}
export default Home
