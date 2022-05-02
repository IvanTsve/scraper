const conf = require('dotenv').config();
const app = require('express')();
const axios = require('axios');
const cheerio = require('cheerio');


axios.get(conf.parsed.MAIN_URL)
.then(r => {
    const html = r.data;
    console.log(html);
})
.catch(e => console.log(e,conf.parsed.MAIN_URL))



app.listen(8000, () => {
    console.log(`app listening on port 8000`)
})
