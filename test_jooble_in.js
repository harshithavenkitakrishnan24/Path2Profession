const axios = require('axios');
require('dotenv').config();

const JOOBLE_API_URL = "https://in.jooble.org/api/";
const apiKey = process.env.JOOBLE_API_KEY;

async function test() {
    try {
        const requestBody = {
            keywords: "Software Developer",
            location: "Chennai",
            radius: "25"
        };

        const response = await axios.post(JOOBLE_API_URL + apiKey, requestBody, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        console.log("Status:", response.status);
        if (response.data.jobs) {
             console.log("Jobs Found:", response.data.jobs.length);
             console.log("First Location:", response.data.jobs[0].location);
        } else {
             console.log("Response Data:", JSON.stringify(response.data, null, 2));
        }
    } catch (e) {
        console.error("ERROR:", e.response ? e.response.status : e.message);
        if (e.response) console.log("ERROR DATA Snip:", e.response.data.substring(0, 200));
    }
}

test();
