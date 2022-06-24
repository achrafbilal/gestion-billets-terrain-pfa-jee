import axios from "axios";
const URL = "http://localhost:9090/users";

const getUsers = async () => {
    const { data } = await axios.get(URL, { headers: { 'Authorization': 'Basic ' + btoa(`admin1@mail.com:password`) } })
    return data
}
const getClients = async () => {
    const { data } = await axios.get(`${URL}/role/3`, { headers: { 'Authorization': 'Basic ' + btoa(`admin1@mail.com:password`) } })
    return data
}
const getUser = async (id) => {
    const { data } = await axios.get(`${URL}/${id}`, { headers: { 'Authorization': 'Basic ' + btoa(`admin1@mail.com:password`) } })
    return data;
}
const login = async (email, password) => {
    const { data } = await axios.post(`${URL}/login`, { email: email, password: password })
    return data;
}

const refreshToken = async (id, token) => {
    const { data } = await axios.post(`${URL}/token/refresh`, { id: id, token: token }, { headers: { 'Authorization': 'Basic ' + btoa(`admin1@mail.com:password`) } })
    return data;
}

const register = async (fullName, email, password) => {
    const { data } = await axios.post(`${URL}`, { fullName: fullName, email: email, password: password })
    return data;
}

const addUser = async (user) => {
    const { data } = await axios.post(`${URL}`, user, { headers: { 'Authorization': 'Basic ' + btoa(`admin1@mail.com:password`) } })
    return data;
}
const changeUserRole = async (userId, roleId) => {
    const { data } = await axios.put(`${URL}/role/${userId}`, { roleId: roleId }, { headers: { 'Authorization': 'Basic ' + btoa(`admin1@mail.com:password`) } })
    return data;
}
const editUser = async (id, user) => {
    const { data } = await axios.put(`${URL}/${id}`, user, { headers: { 'Authorization': 'Basic ' + btoa(`admin1@mail.com:password`) } })
    return data;
}
const deleteUser = async (id) => {
    const { data } = await axios.delete(`${URL}/${id}`, { headers: { 'Authorization': 'Basic ' + btoa(`admin1@mail.com:password`) } })
    return data;
}

export { getUser, getUsers, addUser, editUser, deleteUser, getClients, login, register, changeUserRole, refreshToken }