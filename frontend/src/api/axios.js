// import axios from "axios";

// const API = axios.create({
//     baseURL: "http://127.0.0.1:8000/api/",
// });

// export default API;

import axios from "axios";
import { API_URL } from "./config";

const API = axios.create({
    baseURL: API_URL,
});

export default API;