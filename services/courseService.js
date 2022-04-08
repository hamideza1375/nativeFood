import http from "./httpService";
const localHost = 'http://192.168.42.34';



// ! Food
export const createfood = async (data) => http.post(`${localHost}/createfood`, data);

export const getfoods = async () => http.get(`${localHost}/getfoods`);

export const getfood = async (courseId) => http.get(`${localHost}/getfood/${courseId}`);

export const editfood = (courseId, data) => http.put(`${localHost}/editfood/${courseId}`, data);

export const deletefood = (courseId) => http.delete(`${localHost}/deletefood/${courseId}`);
// ! Food

// ! Piza
export const createchildfood = async (courseId, data) => http.post(`${localHost}/createchildfood/${courseId}`, data);

export const getallchildfood = async (courseId) => http.get(`${localHost}/getallchildfood/${courseId}`);

export const getsinglechildfood = async (courseId, queryId) => http.get(`${localHost}/getsinglechildfood/${courseId}?id=${queryId}`);

export const editchildfood = (courseId, data) => http.put(`${localHost}/editfood/${courseId}`, data);

export const deletechildfood = (courseId) => http.delete(`${localHost}/deletechildfood/${courseId}`);

export const createcommentchildfood = (courseId, queryId, data) => http.post(`${localHost}/createcommentchildfood/${courseId}?id=${queryId}`, data);

export const getcommentchildfood = async (courseId, queryId) => http.get(`${localHost}/getcommentchildfood/${courseId}?id=${queryId}`);
// ! Piza
// ! Payment  
export const getpayplus = () => http.get(`${localHost}/getpayplus`);

export const payplus = (data, id) => http.post(`${localHost}/payplus/${id}`, data);

export const delpayplus = () => http.get(`${localHost}/delpayplus`);

export const getfoodplus = () => http.get(`${localHost}/getfoodplus`);

export const editplus = (courseId, queryId, data) => http.post(`${localHost}/editplus/${courseId}?id=${queryId}`, data);






export const payment = (allprice) => http.get(`${localHost}/confirmpayment?allprice=${allprice}`);

export const verifypayment = () => http.get(`${localHost}/verifypayment`);
// ! Payment

// ! GeoCode
export const reverse = async (data) => http.post(`${localHost}/reverse`, data);

export const geocode = async (data) => http.post(`${localHost}/geocode`, data);
// ! GeoCode

// ! plus
export const plus = async (courseId, queryId) => http.get(`${localHost}/plus/${courseId}?id=${queryId}`);

export const minus = async (courseId, queryId) => http.get(`${localHost}/minus/${courseId}?id=${queryId}`);
// ! minus