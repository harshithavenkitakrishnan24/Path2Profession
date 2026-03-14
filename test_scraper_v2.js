const jobScraper = require('./backend/services/jobScraper');
require('dotenv').config();

async function test() {
    try {
        const results = await jobScraper.search("teacher", "coimbatore");
        console.log("Results found:", results.length);
        if (results.length > 0) {
            console.log("First Result Source:", results[0].source);
            console.log("First Result Title:", results[0].title);
        }
    } catch (e) {
        console.error(e);
    }
}

test();
