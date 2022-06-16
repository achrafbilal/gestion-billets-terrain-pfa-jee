import axios from "axios";
const URL = "localhost:9090/zones";

const getZones = async () => {
    return axios.get(URL)
}
const getZone = async (id) => {
    return axios.get(`${URL}/${id}`)
}

const addZone = async (zone) => {
    return axios.post(`${URL}`, zone)
}
const editZone = async (id, zone) => {
    return axios.put(`${URL}/${id}`, zone)
}
const deleteZone = async (id) => {
    return axios.delete(`${URL}/${id}`)
}

module.exports = { getZone: getZone, getZones: getZones, addZone: addZone, editZone: editZone, deleteZone: deleteZone }