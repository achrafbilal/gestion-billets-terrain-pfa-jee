import axios from "axios";
const URL = "http://localhost:9090/tickets";

const getTickets = async () => {
    const { data } = await axios.get(URL)
    return data
}
const getClientTickets = async (client) => {
    const { data } = await axios.get(`${URL}/client/${client}`)
    return data
}
const getTicket = async (id) => {
    const { data } = await axios.get(`${URL}/${id}`)
    return data
}
const getSeatsLeft = async (zone) => {
    const { data } = await axios.get(`${URL}/seats/left/${zone}`)
    return data
}

const addTicket = async (ticket) => {
    const { data } = await axios.post(`${URL}`, ticket)
    return data
}
const editTicket = async (id, ticket) => {
    const { data } = await axios.put(`${URL}/${id}`, ticket)
    return data
}
const deleteTicket = async (id) => {
    const { data } = await axios.delete(`${URL}/${id}`)
    return data
}

export { getTicket, getTickets, addTicket, editTicket, deleteTicket, getSeatsLeft, getClientTickets }