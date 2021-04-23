import React from 'react';
import {Redirect, Route, withRouter} from 'react-router-dom';
// 3.1
let state_of_state = localStorage["appState"];
if (!state_of_state){
    let appState = {
        isLoggedIn: false,
        user: {}
    };
    localStorage["appState"] = JSON.stringify(appState);
}
let state = localStorage["appState"];
let AppState = JSON.parse(state);
// 3.2
const Auth = {
    isLoggedIn: AppState.isLoggedIn,
    user: AppState
};

// let token = localStorage["token"];
//
// if (token) {
//     let _this = this;
//     let config = {
//         headers: {Authorization: `Bearer ${token}`}
//     };
//
//     axios.get('/api/user', config)
//         .then(res => {
//             return res;
//         })
//         .then(json => {
//             if (!json.data.id) {
//                 _this.props.history.push('/login')
//             }
//
//             let userData = {
//                 id: json.data.id,
//                 name: json.data.name,
//                 email: json.data.email,
//             };
//             _this.setState({isLoggedIn: true, user: {...userData}});
//
//         })
//         .catch(error => {
//             if (error.response) {
//                 // The request was made and the server responded with a status code that falls out of the range of 2xx
//                 let err = error.response.data;
//                 this.setState({
//                     error: err.message,
//                     errorMessage: err.errors,
//                     formSubmitting: false
//                 })
//             } else if (error.request) {
//                 // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
//                 let err = error.request;
//                 this.setState({
//                     error: err,
//                     formSubmitting: false
//                 })
//             } else {
//                 // Something happened in setting up the request that triggered an Error
//                 let err = error.message;
//                 this.setState({
//                     error: err,
//                     formSubmitting: false
//                 })
//             }
//         }).finally(this.setState({isLoggedIn: false, user: {}, token: token}))
// } else {
//     const Auth = {
//         isLoggedIn: false,
//         user: {AppState}
//     };
//
//
// }
// 3.3
const PrivateRoute = ({ component: Component, path, ...rest }) => (
    <Route path={path}
           {...rest}
           render={props => Auth.isLoggedIn ? (
               <Component {...props} />) : (<Redirect to={{
                   pathname: "/login",
                   state: {
                       prevLocation: path,
                       error: "", // "You need to login first.",
                   },
               }}
               />
           )
           }
    />);
export default withRouter(PrivateRoute);
