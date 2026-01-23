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


const config = {
    headers: {
        "x-cg-demo-api-key": API_KEY
    },

    params: {
        vs_currency: "usd"
    }
}


app.get("/", async (req, res) => {
    const URL = API_URL + TRENDING_ENDPOINT;
    console.log(URL);
    let coins;

    try {
        const response = await axios.get(URL, config);
        const coinData = response.data.coins;
        fs.writeFile("testdata.json", JSON.stringify(coinData), (err) => {
            if (err) throw err;
            else {
                console.log("data written.")
            }
        })



        coins = coinData.map(coin => ({
                id: coin.item.id,
                symbol: coin.item.symbol,
                name: coin.item.name,
                image: coin.item.thumb,
                current_price: coin.item.data.price,
                // market_cap_rank: coin.item.market_cap_rank,
                // high_24h: coin.item.high_24h,
                // low_24h: coin.item.low_24h,
                // price_change_24h: coin.item.price_change_24h,
                price_change_percentage: coin.item.data.price_change_percentage_24h.usd,
                // last_updated: coin.item.last_updated
            }));
        
        
    }
    catch (error) {
        console.log(`Request failed: ${JSON.stringify(error.response.data)}`)
    }



    res.render("index.ejs", {
        page: "home",
        coins: coins.slice(0, 5),
    });
})

app.get("/home", (req, res) => {
    res.redirect("/");
})

app.get("/listings", (req, res) => {
    res.render("index.ejs", {
        page: "listings",
        coins: coins,
    })
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})