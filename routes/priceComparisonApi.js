const mongoose = require('mongoose');
const express = require('express')
const router = express.Router();
const puppeteer = require('puppeteer');

const  PriceComparison = require ('../model/priceComparison.js');

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/elecdb');

// Function to scrape price from the page
async function scrapePrice(url, selector) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const price = await page.$eval(selector, el => parseFloat(el.textContent.replace(/[^\d.]/g, '')));
    await browser.close();
    return price;
}

router.get('/compare-prices', async (req, res) => {
    const { url } = req.query;
    const priceSelector = '.product-price'; // Adjust this to the CSS selector for the price

    if (!url) return res.status(400).json({ error: "Please provide a URL to compare." });

    // Check for cached price within the last hour
    const recentPrice = await PriceComparison.findOne({
        productUrl: url,
        date: { $gte: new Date(Date.now() - 60 * 60 * 1000) } // 1-hour threshold
    });

    if (recentPrice) {
        // Use cached data if recent enough
        return res.json({ price: recentPrice.price, source: 'cache' });
    } else {
        // Scrape new data and save to the database
        const price = await scrapePrice(url, priceSelector);
        await PriceComparison.create({ productUrl: url, price });
        return res.json({ price, source: 'scraped' });
    }
});

module.exports = router;
