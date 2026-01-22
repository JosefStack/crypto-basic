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
const MARKET_DATA_ENDPOINT = "coins/markets"

const API_KEY = "CG-VbxmU8iAp28HBYTRGfi6UN3g";


const config = {
    headers: {
        "x-cg-demo-api-key": API_KEY
    },

    params: {
        vs_currency: "usd"
    }
}

async function test() {
    const URL = API_URL + MARKET_DATA_ENDPOINT;
    console.log(URL);
    try {
        const response = await axios.get(URL, config);

        const result = JSON.stringify(response.data);
        console.log(result);
        fs.writeFile("marketdata.json", result, (err) => {
            if (err) throw err;
            else {
                console.log("market data saved.")
            }
        })
    }
    catch (error) {
        console.log(`Request failed: ${JSON.stringify(error.response.data)}`)
    }

}
// test();

let coins;
function readJSON() {

    fs.readFile("marketdata.json", "utf-8", (err, data) => {
        if (err) throw err;
        else {
            const marketData = JSON.parse(data);

            coins = marketData.map(coin => ({
                id: coin.id,
                symbol: coin.symbol,
                name: coin.name,
                image: coin.image,
                current_price: coin.current_price,
                market_cap_rank: coin.market_cap_rank,
                high_24h: coin.high_24h,
                low_24h: coin.low_24h,
                price_change_24h: coin.price_change_24h,
                price_change_percentage: coin.price_change_percentage_24h,
                last_updated: coin.last_updated
            }));

            console.log(coins);
        }

    })

}
readJSON();


app.get("/", (req, res) => {
    res.render("index.ejs", {
        page: "home"
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