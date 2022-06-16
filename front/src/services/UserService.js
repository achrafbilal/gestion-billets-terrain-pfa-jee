import axios from "axios";
const URL = "localhost:9090/users";

const getUsers = async () => {
    return axios.get(URL)
}
const getUser = async (id) => {
    return axios.get(`${URL}/${id}`)
}

const addUser = async (user) => {
    return axios.post(`${URL}`, user)
}
const editUser = async (id, user) => {
    return axios.put(`${URL}/${id}`, user)
}
const deleteUser = async (id) => {
    return axios.delete(`${URL}/${id}`)
}

module.exports = { getUser: getUser, getUsers: getUsers, addUser: addUser, editUser: editUser, deleteUser: deleteUser }