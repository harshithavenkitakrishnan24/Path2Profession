const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const JOOBLE_API_URL = "https://jooble.org/api/";
const apiKey = process.env.JOOBLE_API_KEY;

async function test() {
    try {
        const requestBody = {
            keywords: "Software Developer",
            location: "Chennai, India",
            radius: "25"
        };

        const response = await axios.post(JOOBLE_API_URL + apiKey, requestBody);
        console.log("Status:", response.status);
        console.log("Total Count:", response.data.totalCount);
        if (response.data.jobs && response.data.jobs.length > 0) {
            fs.writeFileSync('jooble_debug.json', JSON.stringify(response.data.jobs[0], null, 2));
            console.log("Written to jooble_debug.json");
        }
    } catch (e) {
        console.error(e.message);
    }
}

test();
