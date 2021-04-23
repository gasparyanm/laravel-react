import {constants} from '../config'

class AnnouncementService {
    getAnnouncementMetas() {
        axios.get(constants.API_PREFIX + '/announcement-metas')
            .then(response => {
                console.log("getAnnouncementMetas::", response)
            })
    }
}

export default new AnnouncementService();
