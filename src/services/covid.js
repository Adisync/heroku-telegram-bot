const axios = require('axios');
let service = {};


service.getByCountry = country =>{
    return  axios({
        method:"GET",
        url:"https://covid-193.p.rapidapi.com/statistics",
        headers:{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"covid-193.p.rapidapi.com",
            "x-rapidapi-key":"dddaf66961mshd64f199b6ca3fabp15a325jsn157818721f8e",
            "useQueryString":true
        },params:{
            country: country
        }
    });

};



module.exports = service;



