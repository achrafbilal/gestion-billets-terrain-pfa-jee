import axios from "axios";
const URL = "http://localhost:9090/users";

const getUsers = async () => {
    const { data } = await axios.get(URL)
    return data
}
const getClients = async () => {
    const { data } = await axios.get(`${URL}/role/3`)
    return data
}
const getUser = async (id) => {
    const { data } = await axios.get(`${URL}/${id}`)
    return data;
}

const addUser = async (user) => {
    const { data } = await axios.post(`${URL}`, user)
    return data;
}
const editUser = async (id, user) => {
    const { data } = await axios.put(`${URL}/${id}`, user)
    return data;
}
const deleteUser = async (id) => {
    const { data } = await axios.delete(`${URL}/${id}`)
    return data;
}

export { getUser, getUsers, addUser, editUser, deleteUser, getClients }