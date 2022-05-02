const conf = require('dotenv').config();
const fs = require('fs');
const app = require('express')();
const bodyParser = require('body-parser')
const axios = require('axios');
const cheerio = require('cheerio');
let data = {};

axios.get(conf.parsed.MAIN_URL)
.then(r => {
        const html = r.data;
        const $ = cheerio.load(html);
        $(conf.parsed.SELECTOR, html).each(function () {
            const title = $(this).html();
            data[title]=[];
        });
        fs.writeFileSync("files/Food-type.txt", JSON.stringify(data),(err) => {
            if (err) return
        })
    })
    
    .catch(e => console.log(e, conf.parsed.MAIN_URL))

//db w-100 tc lh-title f5 fw6 mb1 self-center

app.listen(8000, () => {
    console.log(`app listening on port 8000`)
})
