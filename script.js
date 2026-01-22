import fs from "fs";

fs.readFile("marketdata.json", "utf-8", (err, data) => {
    if (err) throw err;
    else {
        const marketdata = JSON.parse(data).data;
        let dataSum = [];

        marketdata.forEach((coin) => {
            dataSum.push({
                name: coin.name,
                symbol: coin.symbol,
                price: coin.quote.USD.price,
            });
        });

        fs.writeFile("dataSum.json", JSON.stringify(dataSum), (err) => {
            if (err) throw err;
            else {
                console.log();
            }
        });
    }
});
