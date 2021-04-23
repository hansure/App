import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, {retries: Number.MAX_SAFE_INTEGER});
const baseUrl = 'https://dev.deventsmiddleware.k8s.sandboxaddis.com/';

const Alert = {
    HTTP: {
        getAllAlerts: () =>
            axios({
                url: baseUrl + 'tasks',
                method: 'GET'
            }),
        getAlert: (alertId) => 
            axios({
                url: baseUrl + 'tasks/' + alertId,
                method: 'GET'
            }),
        getAllTriggers: () =>
            axios({
                url: baseUrl + 'triggers',
                method: 'GET'
            }),
        getAllRecipientGroups: () =>
            axios({
                url: baseUrl + 'recipient-groups',
                method: 'GET'
            }),
        create: (data) =>
            axios({
                url: baseUrl + 'tasks',
                method: 'POST',
                data: data
            }),
        update: (data) =>
            axios({
                url: baseUrl + 'tasks/' + data.id,
                method: 'PATCH',
                data: data
            })
    }
}

export default Alert;