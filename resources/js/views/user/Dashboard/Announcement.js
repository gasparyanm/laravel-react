import React, {Component} from 'react';
import {announcementService} from '../../../services';

class Announcement extends Component {
    UNSAFE_componentWillMount() {
        announcementService.getAnnouncementMetas()
    }
    render() {
        return (<div>
            Announcement component
        </div>)
    }
}

export default Announcement
