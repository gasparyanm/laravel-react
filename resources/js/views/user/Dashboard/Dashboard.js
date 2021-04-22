import React, {Component} from 'react'
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import FlashMessage from 'react-flash-message';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            user: {}
        }
    }
    UNSAFE_componentWillMount() {
        let token = localStorage["token"];

        if (token) {
            let _this = this;
            let config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            axios.get('/api/user', config).then(res => {
                return res;
            }).then(json => {
                if (!json.data.id) {
                    _this.props.history.push('/login')
                }

                let userData = {
                    id: json.data.id,
                    name: json.data.name,
                    email: json.data.email,
                };
                _this.setState({ isLoggedIn: true, user: {...userData} });

            }).catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code that falls out of the range of 2xx
                    let err = error.response.data;
                    this.setState({
                        error: err.message,
                        errorMessage: err.errors,
                        formSubmitting: false
                    })
                }
                else if (error.request) {
                    // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
                    let err = error.request;
                    this.setState({
                        error: err,
                        formSubmitting: false
                    })
                } else {
                    // Something happened in setting up the request that triggered an Error
                    let err = error.message;
                    this.setState({
                        error: err,
                        formSubmitting: false
                    })
                }
            }).finally(this.setState({ isLoggedIn: false, user: {}, token: token }))

        }
    }
// 4.1
    render() {
        let state = this.state;
        console.log('state:::', state.user)
        return state.user.id? (
            <div>
                <Header userData={state.user} userIsLoggedIn={state.isLoggedIn}/>
                <span>Whatever normally goes into the user dashboard page; the table below for instance</span> <br/>
                <table className="table table-striped">
                    <tbody>
                    <tr>
                        <th scope="row ">User Id</th>
                        <td>{state.user.id}</td>
                    </tr>
                    <tr>
                        <th scope="row ">Full Name</th>
                        <td>{state.user.name}</td>
                    </tr>
                    <tr>
                        <th scope="row ">Email</th>
                        <td>{state.user.email}</td>
                    </tr>
                    </tbody>
                </table>
                <Footer/>
            </div>
        ) : (<div></div>)
    }
}
export default Home
