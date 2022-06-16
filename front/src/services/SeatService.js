import axios from "axios";
const URL = "localhost:9090/seats";

const getSeats = async () => {
    return axios.get(URL)
}
const getSeat = async (id) => {
    return axios.get(`${URL}/${id}`)
}

const addSeat = async (seat) => {
    return axios.post(`${URL}`, seat)
}
const editSeat = async (id, seat) => {
    return axios.put(`${URL}/${id}`, seat)
}
const deleteSeat = async (id) => {
    return axios.delete(`${URL}/${id}`)
}

module.exports = { getSeat: getSeat, getSeats: getSeats, addSeat: addSeat, editSeat: editSeat, deleteSeat: deleteSeat }