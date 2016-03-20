import axios from 'axios';
import {BACKEND_API} from '../../utils/constants'
const tokenConfig = function (token) {
    return {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
};


export function getToken(username, password) {
    return axios.post(BACKEND_API + '/users/authenticate', {
        username: username,
        password: password
    })
}

export function getProfile(token) {
    return axios.get(BACKEND_API+'/users/me', tokenConfig(token))
}

export function validateToken(token) {
    return axios.post(BACKEND_API+'/users/validate_token', {
        token: token,
    },tokenConfig(token))
}
