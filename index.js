import express from "express";
import axios from "axios";
import fs from "fs";
import boydParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

// const API_URL = "https://pro-api.coinmarketcap.com/v1";
// const INFO_ENDPOINT = "/cryptocurrency/info";
// const LISTINGS_LATEST_ENDPOINT = "/cryptocurrency/listings/latest";
// const TEST_URL = "https://sandbox-api.coinmarketcap.com/v1";

// const API_KEY = "2a0c596eb4f144d694d7523b43f55440";

const API_URL = "https://api.coingecko.com/api/v3/";
const MARKET_DATA_ENDPOINT = "coins/markets";
const TRENDING_ENDPOINT = "search/trending";

const API_KEY = "CG-VbxmU8iAp28HBYTRGfi6UN3g";


const NEWS_API_URL = "https://free-crypto-news.vercel.app/api";

const config = {
    headers: {
        "x-cg-demo-api-key": API_KEY
    },

    params: {
        vs_currency: "usd"
    }
}


app.get("/", async (req, res) => {
    let trendingCoins;
    let priceCoins;
    let formattedNews;

    try {
        const URL = API_URL + TRENDING_ENDPOINT;
        // console.log(`trending URL: ${URL}`);

        const response = await axios.get(URL, config);
        const coinData = response.data.coins;
        // fs.writeFile("testdata.json", JSON.stringify(coinData), (err) => {
        //     if (err) throw err;
        //     else {
        //         console.log("data written.")
        //     }
        // })
        trendingCoins = coinData.map(coin => ({
                id: coin.item.id,
                symbol: coin.item.symbol.toUpperCase(),
                name: coin.item.name,
                image: coin.item.thumb,
                current_price: "$"+coin.item.data.price.toFixed(2),
                // market_cap_rank: coin.item.market_cap_rank,
                // high_24h: coin.item.high_24h,
                // low_24h: coin.item.low_24h,
                // price_change_24h: coin.item.price_change_24h,
                price_change_percentage: coin.item.data.price_change_percentage_24h.usd.toFixed(2),
                // last_updated: coin.item.last_updated
            }));
    }
    catch (error) {
        console.log(`sort by trending request failed: ${JSON.stringify(error.response.data)}`);
    }

    try {
        const URL = API_URL + MARKET_DATA_ENDPOINT + `?order=market_cap_desc`;
        // console.log(`top listings URL: ${URL}`);

        const response = await axios.get(URL, config);
        const coinData = response.data;

        // fs.writeFile("testdata.json", JSON.stringify(coinData), (err) => {
        //     if (err) throw err;
        //     else {
        //         console.log("data written.")
        //     }
        // })

        priceCoins = coinData.map(coin => ({
            id: coin.id,
            symbol: coin.symbol.toUpperCase(), 
            name: coin.name,
            image: coin.image, 
            current_price: "$" + coin.current_price.toFixed(2),
            price_change_percentage: coin.price_change_percentage_24h,
        }))





    }
    catch (error) {
        console.log(`sort by price request failed: ${JSON.stringify(error.response.data)}`);
    }


    try {
        // console.log(NEWS_API_URL + "/api/breaking")
        const response = await axios.get(NEWS_API_URL + "/breaking");
        
        const newsData = response.data.articles;
        formattedNews = newsData.map(news => ({
            title: news.title,
            link: news.link
        }))

    }
    catch (error) {
        console.log(`news request failed: ${error.reponse.data}`);
    }



    res.render("index.ejs", {
        page: "home",
        trendingCoins: trendingCoins.slice(0, 5),   
        priceCoins: priceCoins.slice(0, 5),
        news: formattedNews.slice(0, 3)
    });
})

app.get("/home", (req, res) => {
    res.redirect("/");
})

app.get("/listings", async (req, res) => {

    let listings;

    try {
        const URL = API_URL + MARKET_DATA_ENDPOINT + `?order=market_cap_desc`;
        // console.log(`top listings URL: ${URL}`);

        const response = await axios.get(URL, config);
        const coinData = response.data;

        // fs.writeFile("testdata.json", JSON.stringify(coinData), (err) => {
        //     if (err) throw err;
        //     else {
        //         console.log("data written.")
        //     }
        // })

        listings = coinData.map(coin => ({
            id: coin.id,
            symbol: coin.symbol.toUpperCase(), 
            name: coin.name,
            image: coin.image, 
            current_price: "$" + coin.current_price.toFixed(2),
            price_change: coin.price_change_24h,
            price_change_percentage: coin.price_change_percentage_24h,
        }))





    }
    catch (error) {
        console.log(`sort by price request failed: ${JSON.stringify(error.response.data)}`);
    }



    res.render("index.ejs", {
        page: "listings",
        listings: listings,
    })
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})