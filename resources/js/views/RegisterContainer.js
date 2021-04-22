import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import FlashMessage from 'react-flash-message';

class RegisterContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isRegistered: false,
            isLoggedIn: false,
            error: '',
            errorMessage: '',
            formSubmitting: false,
            user: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            },
            redirect: props.redirect,
        };

        this.handleInputs = this.handleInputs.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    UNSAFE_componentWillMount() {
        let state = localStorage["appState"];
        // TODO: check where is set
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({isLoggedIn: AppState.isLoggedIn, user: AppState.user});
        }
        if (this.state.isRegistered) {
            return this.props.history.push("/dashboard");
        }
    }
    componentDidMount() {
        const { prevLocation } = this.state.redirect.state || {prevLocation: { pathname: '/dashboard' } };
        if (prevLocation && this.state.isLoggedIn) {
            return this.props.history.push(prevLocation);
        }
    }
    // checking
    handleSubmit(e) {
        e.preventDefault();

        this.setState({formSubmitting: true});
        ReactDOM.findDOMNode(this).scrollIntoView();
        let userData = this.state.user;

        axios.post("/api/register", userData)
            .then(response => {
                console.log('SIGNUP RESP::', response)
                return response;
            }).then(json => {
            if (json.data.success) {
                alert(json.data.message);
                this.props.history.push('/login');
                // let userData = {
                //     id: json.data.id,
                //     name: json.data.name,
                //     email: json.data.email,
                //     activation_token: json.data.activation_token,
                // };
                // let appState = {
                //     isRegistered: true,
                //     user: userData
                // };
                // localStorage["appState"] = JSON.stringify(appState);
                // this.setState({
                //     isRegistered: appState.isRegistered,
                //     user: appState.user
                // });
            } else {
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
        let errorMessage = this.state.errorMessage;
        let arr = [];
        Object.values(errorMessage).forEach((value) => (
            arr.push(value)
        ));

        return (
            <div className="container">
                <div className="row">
                    <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12 ">
                        <h2>Create Your Account</h2>
                        {this.state.isRegistered ? <FlashMessage duration={60000} persistOnHover={true}>
                            <h5 className={"alert alert-success"}>Registration successful, redirecting...</h5></FlashMessage> : ''}
                        {this.state.error ? <FlashMessage duration={900000} persistOnHover={true}>
                            <h5 className={"alert alert-danger"}>Error: {this.state.error}</h5>
                            <ul>
                                {arr.map((item, i) => (
                                    <li key={i}><h5 style={{color: 'red'}}>{item}</h5></li>
                                ))}
                            </ul></FlashMessage> : ''}
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input id="name" name="name" type="text" placeholder="Name" className="form-control" required onChange={this.handleInputs}/>
                            </div>
                            <div className="form-group">
                                <input id="email" type="email" name="email" placeholder="E-mail" className="form-control" required onChange={this.handleInputs}/>
                            </div>
                            <div className="form-group">
                                <input id="password" type="password" name="password" placeholder="Password" className="form-control" required onChange={this.handleInputs}/>
                            </div>
                            <div className="form-group">
                                <input id="password_confirm" type="password" name="password_confirmation" placeholder="Confirm Password" className="form-control" required onChange={this.handleInputs} />
                            </div>
                            <button type="submit" name="singlebutton" className="btn btn-default btn-lg btn-block mb10" disabled={this.state.formSubmitting ? "disabled" : ""}>Create Account</button>
                        </form>
                        <p>Already have an account?
                            <Link to="/login" className="text-yellow"> Log In</Link>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
// 2.8
export default withRouter(RegisterContainer);
