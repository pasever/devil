const axios = require("axios");

module.exports = {
   
    createUser:  data => {
        return axios.post("/api/user/create", data);
    }

}
