import React, {Component} from 'react';

class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: props.location,
        }
    }
    render() {
        return (
            <div className="content">
                Not found
            </div>
        )
    }
}
export default NotFound
