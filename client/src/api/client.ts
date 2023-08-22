/* Axios is a promise-based HTTP client for the browser and Node.js.
   It makes it easy to send asynchronous HTTP requests to REST 
   endpoints and perform CRUD operations.
*/
import axios from "axios"

export const apiClient = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Content-type": "application/json"
    }
})