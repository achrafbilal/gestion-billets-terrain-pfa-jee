import axios from "axios";
const URL = "http://localhost:9090/zones";

const getZones = async () => {
    const { data } = await axios.get(URL)
    return data
}
const getZone = async (id) => {
    const { data } = await axios.get(`${URL}/${id}`)
    return data
}

const addZone = async (zone) => {
    const { data } = await axios.post(`${URL}`, zone)
    return data
}
const editZone = async (id, zone) => {
    const { data } = await axios.put(`${URL}/${id}`, zone)
    return data
}
const deleteZone = async (id) => {
    const { data } = await axios.delete(`${URL}/${id}`)
    return data
}

export { getZone, getZones, addZone, editZone, deleteZone }