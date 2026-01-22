import express from "express";
import axios from "axios";
import fs from "fs";
import boydParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

const API_URL = "https://pro-api.coinmarketcap.com/v1";
const INFO_ENDPOINT = "/cryptocurrency/info";
const LISTINGS_LATEST_ENDPOINT = "/cryptocurrency/listings/latest";
const TEST_URL = "https://sandbox-api.coinmarketcap.com/v1";

const API_KEY = "2a0c596eb4f144d694d7523b43f55440";

const config = {
    headers: {
        "X-CMC_PRO_API_KEY": API_KEY
    }
}

async function info() {
    const URL = API_URL + INFO_ENDPOINT;
    console.log(`URL: ${URL}`);

    try {
        const response = await axios.get("https://pro-api.coinmarketcap.com/v3/cryptocurrency/info", config);
        const result = JSON.stringify(response.data);
        fs.writeFile("coininfo.json", result, (err) => {
            if (err) throw err;
            else {
                console.log("coin info saved.")
            }
        })
    }
    catch (error) {
        console.log(`Info request failed: ${error.message}`);
    }
}

// info();
async function test() {
    const URL = API_URL + LISTINGS_LATEST_ENDPOINT;
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

function readJSON() {

        fs.readFile("marketdata.json", "utf-8", (err, data) => {
            if (err) throw err;
            else {
                console.log(JSON.parse(data).status);
            }
        })

}

// readJSON();


app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})