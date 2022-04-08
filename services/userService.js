import http from "./httpService";
const localHost = 'http://192.168.42.34';
const serverHost = 'http://78.47.189.94';


export const registerUser = user => {
    return http.post(`${localHost}/register`, user);
};

export const loginUser = (user) => {
    return http.post(`${localHost}/login`, user);
};

export const forgetpassword = email => {
    return http.post(`${localHost}/forgetpassword`, email);
};

export const resetpassword = id => {
    return http.post(`${localHost}/resetpassword`, id);
};

export const sendcode = (data) => {
    return http.post(`${localHost}/sendcode`, data);
};

export const verifycode = (data) => {
    return http.post(`${localHost}/verifycode`, data);
};