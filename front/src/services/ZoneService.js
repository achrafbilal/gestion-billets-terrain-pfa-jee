import axios from "axios";
const URL = "http://localhost:9090/zones";

const getZones = async () => {
    const { data } = await axios.get(URL, { headers: { 'Authorization': 'Basic ' + btoa(`admin1@mail.com:password`) } })
    return data
}
const getZone = async (id) => {
    const { data } = await axios.get(`${URL}/${id}`, { headers: { 'Authorization': 'Basic ' + btoa(`admin1@mail.com:password`) } })
    return data
}

const addZone = async (zone) => {
    const { data } = await axios.post(`${URL}`, zone, { headers: { 'Authorization': 'Basic ' + btoa(`admin1@mail.com:password`) } })
    return data
}
const editZone = async (id, zone) => {
    console.log(zone, id)
    const { data } = await axios.put(`${URL}/${id}`, zone, { headers: { 'Authorization': 'Basic ' + btoa(`admin1@mail.com:password`) } })
    return data
}
const deleteZone = async (id) => {
    const { data } = await axios.delete(`${URL}/${id}`, { headers: { 'Authorization': 'Basic ' + btoa(`admin1@mail.com:password`) } })
    return data
}

export { getZone, getZones, addZone, editZone, deleteZone }