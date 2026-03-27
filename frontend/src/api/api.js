import axios from "axios"


const API= await axios.create({
    baseURL:"http://localhost:8000/api/v1",
    Credential: true
})

export default API