import axios from 'axios';
import axiosRetry from 'axios-retry';
import {error} from "next/dist/build/output/log";

axiosRetry(axios, {retries: Number.MAX_SAFE_INTEGER});
const baseUrl = 'https://deventsmiddleware.k8s.sandboxaddis.com/';
// const baseUrl = 'https://dev.deventsmiddleware.k8s.sandboxaddis.com/';

const Transport = {
    HTTP: {

        changeStatus: (eventID, status, email, comment) =>
            axios({
                url: baseUrl + `event-requests/${eventID}/status/${status}`,
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "approval" : {
                        "email": email
                    },
                    'comment': comment
                },
            }),
        getAllData: () =>
            axios({
                url: baseUrl + 'metadata/referenceValues/gform',
                method: 'GET'
            }),
        createEventReq: (data) =>
            axios({
                url: baseUrl + 'event-requests',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data,
            }),

        getAllEventReq: (email) =>
            axios({
                url: baseUrl + 'event-requests?user=' + email,
                method: 'GET'
            }),

        getReqByID : (id) =>
            axios({
                url: baseUrl + 'event-requests/' + id,
                method: 'GET',
            }),
        updateEventReq: (id, data) =>
            axios({
                url: baseUrl + 'event-requests/' + id,
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            }),
        getToken: () =>
            axios({
                url: baseUrl + 'events/token',
                method: 'Get',
            }),
    }
}

export default Transport;