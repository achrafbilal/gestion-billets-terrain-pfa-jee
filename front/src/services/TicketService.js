import axios from "axios";
const URL = "http://localhost:9090/tickets";

const getTickets = async () => {
    const { data } = await axios.get(URL, { headers: { 'Authorization': 'Basic ' + btoa(`admin1@mail.com:password`) } })
    return data
}
const getClientTickets = async (client) => {
    const { data } = await axios.get(`${URL}/client/${client}`, { headers: { 'Authorization': 'Basic ' + btoa(`admin1@mail.com:password`) } })
    return data
}
const getTicket = async (id) => {
    const { data } = await axios.get(`${URL}/${id}`, { headers: { 'Authorization': 'Basic ' + btoa(`admin1@mail.com:password`) } })
    return data
}
const getSeatsLeft = async (zone) => {
    const { data } = await axios.get(`${URL}/seats/left/${zone}`, { headers: { 'Authorization': 'Basic ' + btoa(`admin1@mail.com:password`) } })
    return data
}

const addTicket = async (ticket) => {
    const { data } = await axios.post(`${URL}`, ticket, { headers: { 'Authorization': 'Basic ' + btoa(`admin1@mail.com:password`) } })
    return data
}
const editTicket = async (id, ticket) => {
    const { data } = await axios.put(`${URL}/${id}`, ticket, { headers: { 'Authorization': 'Basic ' + btoa(`admin1@mail.com:password`) } })
    return data
}
const deleteTicket = async (id) => {
    const { data } = await axios.delete(`${URL}/${id}`, { headers: { 'Authorization': 'Basic ' + btoa(`admin1@mail.com:password`) } })
    return data
}

export { getTicket, getTickets, addTicket, editTicket, deleteTicket, getSeatsLeft, getClientTickets }