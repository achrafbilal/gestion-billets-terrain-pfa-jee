import axios from "axios";
const URL = "localhost:9090/tickets";

const getTickets = async () => {
    return axios.get(URL)
}
const getTicket = async (id) => {
    return axios.get(`${URL}/${id}`)
}

const addTicket = async (ticket) => {
    return axios.post(`${URL}`, ticket)
}
const editTicket = async (id, ticket) => {
    return axios.put(`${URL}/${id}`, ticket)
}
const deleteTicket = async (id) => {
    return axios.delete(`${URL}/${id}`)
}

module.exports = { getTicket: getTicket, getTickets: getTickets, addTicket: addTicket, editTicket: editTicket, deleteTicket: deleteTicket }