import React, {Component} from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom';
import FlashMessage from 'react-flash-message';

class LoginContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            error: '',
            formSubmitting: false,
            user: {
                email: '',
                password: '',
            },
            redirect: props.redirect,
        };

        this.checkAuth = this.checkAuth.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputs = this.handleInputs.bind(this);
    }
    UNSAFE_componentWillMount() {
        // let state = localStorage["appState"];
        // if (state) {
        //     let AppState = JSON.parse(state);
        //     this.setState({isLoggedIn: AppState.isLoggedIn, user: AppState});
        // }
    }
    componentDidMount() {
        // const { prevLocation } = this.state.redirect.state || { prevLocation: { pathname: '/dashboard' } };
        // if (prevLocation && this.state.isLoggedIn) {
        //     return this.props.history.push(prevLocation);
        // }
    }
    checkAuth() {
        // let token = localStorage['token'];
        // if (token) {
        //     const config = {
        //         headers: { Authorization: `Bearer ${token}` }
        //     };
        //
        //     axios.get('api/user', config)
        //         .then(resp => console.log('RESPONSE::', resp))
        // }
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({formSubmitting: true});
        let userData = this.state.user;
        console.log(userData);
        axios.post("/api/login", userData).then(response => {
            return response;
        }).then(json => {
            if (json.data.success) {
                /** TODO  remove **/
                let userData = {
                    id: json.data.id,
                    name: json.data.name,
                    email: json.data.email,
                    access_token: json.data.access_token,
                };
                let appState = {
                    isLoggedIn: true,
                    user: userData
                };
                localStorage["appState"] = JSON.stringify(appState);
                /** TODO  remove **/

                let token = json.data.access_token;
                localStorage["token"] = token;

                this.setState({
                    token: token,
                    isLoggedIn: appState.isLoggedIn,
                    user: appState.user,
                    error: ''
                });
                this.props.history.replace('/dashboard');
            }
            else {
                alert(`Our System Failed To Register Your Account!`);
            }
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
        }).finally(this.setState({error: ''}));
    }
    handleInputs(e) {
        let name = e.target.name;
        let value = e.target.value;

        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [name]: value
            }
        }))
    }
    render() {
        const { state = {} } = this.state.redirect;
        const { error } = state;

        return (
            <div className="container">
                <div className="row">
                    <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12 ">
                        <h2 className="text-center mb30">Log In To Your Account</h2>
                        {this.state.isLoggedIn ? <FlashMessage duration={60000} persistOnHover={true}>
                            <h5 className={"alert alert-success"}>Login successful, redirecting...</h5></FlashMessage> : ''}
                        {this.state.error ? <FlashMessage duration={100000} persistOnHover={true}>
                            <h5 className={"alert alert-danger"}>Error: {this.state.error}</h5></FlashMessage> : ''}
                        {error && !this.state.isLoggedIn ? <FlashMessage duration={100000} persistOnHover={true}>
                            <h5 className={"alert alert-danger"}>Error: {error}</h5></FlashMessage> : ''}
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input id="email" type="email" name="email" placeholder="E-mail" className="form-control" required onChange={this.handleInputs}/>
                            </div>
                            <div className="form-group">
                                <input id="password" type="password" name="password" placeholder="Password" className="form-control" required onChange={this.handleInputs}/>
                            </div>
                            <button disabled={this.state.formSubmitting} type="submit" name="singlebutton" className="btn btn-default btn-lg  btn-block mb10"> {this.state.formSubmitting ? "Logging You In..." : "Log In"} </button>
                        </form>
                    </div>
                    <p className="text-dark m-auto">Don't have an account? <Link to="/register" className="text-yellow"> Register</Link>
                    </p>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginContainer);
