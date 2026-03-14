const Parser = require('rss-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const parser = new Parser();

/**
 * Custom Job Scraper Service
 * Fetches jobs from multiple RSS feeds and public web pages.
 */
class JobScraper {
    constructor() {
        this.rssSources = [
            { name: 'WeWorkRemotely', url: 'https://weworkremotely.com/remote-jobs.rss' },
            { name: 'RemoteOK', url: 'https://remoteok.com/index.rss' }
        ];
    }

    /**
     * Search for jobs from all sources
     */
    async search(keywords = "", location = "") {
        console.log(`[Scraper] Starting search for "${keywords}" in "${location}"`);
        
        let allJobs = [];
        
        // 1. Fetch from RSS Feeds (Free/Unlimited)
        try {
            const rssJobs = await this.fetchFromRSS(keywords, location);
            allJobs.push(...rssJobs);
        } catch (e) {
            console.error("[Scraper] RSS Search failed:", e.message);
        }

        // 2. Fallback to Jooble API if no local results found in RSS
        // Since RSS is mostly tech/remote, we need this for local Indian jobs (Teacher, Professor, etc.)
        if (allJobs.length < 5) {
            console.log(`[Scraper] Low results in RSS (${allJobs.length}), attempting Jooble fallback...`);
            const joobleResults = await this.fetchFromJooble(keywords, location);
            allJobs.push(...joobleResults);
        }

        // Sort results by date
        return allJobs.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    }

    async fetchFromJooble(keywords, location) {
        try {
            const apiKey = process.env.JOOBLE_API_KEY;
            if (!apiKey) return [];

            const JOOBLE_URL = "https://jooble.org/api/" + apiKey;
            
            // Format location for better India city matching
            let searchLocation = location || "India";
            if (location && !location.toLowerCase().includes('india')) {
                searchLocation = `${location}, India`;
            }

            const response = await axios.post(JOOBLE_URL, {
                keywords: keywords,
                location: searchLocation,
                radius: "25"
            }, { headers: { "Content-Type": "application/json" } });

            if (response.data && response.data.jobs) {
                return response.data.jobs.map(job => {
                    let jobLocation = job.location;
                    
                    // Intelligent location mapping:
                    // If Jooble returns generic "India" but we searched for a specific city,
                    // use the searched city as the primary location label.
                    if (location && jobLocation.toLowerCase() === 'india') {
                        jobLocation = location;
                        // Capitalize first letter
                        jobLocation = jobLocation.charAt(0).toUpperCase() + jobLocation.slice(1);
                        if (!jobLocation.toLowerCase().includes('india')) {
                            jobLocation += ", India";
                        }
                    }

                    return {
                        title: job.title,
                        company: job.company,
                        location: jobLocation,
                        snippet: job.snippet.replace(/<b>|<\/b>/g, '').substring(0, 200) + "...",
                        salary: job.salary || "Competitive",
                        source: "Jooble",
                        link: job.link,
                        updated: job.updated || new Date().toISOString(),
                        id: job.id
                    };
                });
            }
        } catch (error) {
            console.error("[Scraper] Jooble Fallback Error:", error.message);
        }
        return [];
    }

    async fetchFromRSS(keywords, location) {
        let results = [];
        const query = keywords.toLowerCase();
        const locQuery = location.toLowerCase();

        for (const source of this.rssSources) {
            try {
                const feed = await parser.parseURL(source.url);
                const matched = feed.items.filter(item => {
                    const title = (item.title || "").toLowerCase();
                    const snippet = (item.contentSnippet || "").toLowerCase();
                    const text = title + " " + snippet;
                    
                    const matchesKeyword = !query || text.includes(query);
                    const matchesLocation = !locQuery || text.includes(locQuery);
                    
                    return matchesKeyword && matchesLocation;
                }).map(item => ({
                    title: item.title,
                    company: item.creator || source.name,
                    location: location || "Remote",
                    snippet: item.contentSnippet ? item.contentSnippet.substring(0, 200) + "..." : "No description available",
                    salary: "Competitive",
                    source: source.name,
                    link: item.link,
                    updated: item.pubDate || new Date().toISOString(),
                    id: item.guid || Math.random().toString(36).substr(2, 9)
                }));
                results.push(...matched);
            } catch (error) {
                // Silently log source-specific errors
                if (error.response && error.response.status === 404) {
                    console.log(`[Scraper] Source ${source.name} not available (404)`);
                } else {
                    console.log(`[Scraper] Source ${source.name} error: ${error.message}`);
                }
            }
        }
        return results;
    }

    /**
     * Future expansion: Specific Scrapers for Indian Portals
     * This requires maintaining CSS selectors.
     */
    async scrapeTarget(url, selector, mapper) {
        // Implementation for BeautifulSoup-style scraping with Cheerio
    }
}

module.exports = new JobScraper();
