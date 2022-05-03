const conf = require('dotenv').config();
const fs = require('fs');
const app = require('express')();
const bodyParser = require('body-parser')
const axios = require('axios');
const cheerio = require('cheerio');


async function useAxios(url, selector) {
    let r = await axios.get(url);
    let html = r.data;
    let $ = cheerio.load(html);
    let data = {};
    if (!Object.keys(data).length === 0) return

    $(selector, html).each(function () {
        if (this.parent.attribs.href) {
            let title = $(this).html().split(' ').join('_');
            let productUrl = this.parent.attribs.href;
            let name = `${productUrl.split('group/')[1]}`;
            data[title] = { productUrl, [name]: [] };
            fs.writeFileSync("files/Food-type.txt", JSON.stringify(data), (err) => {
                if (err) return
            })
        } else {
            let foodPart = $(this).html().split(' ').join('_').split(',').join('');
            if (!foodPart) return;
            let name = element.productUrl.split('/').pop();
            element[name].push(foodPart);
            fs.writeFileSync("files/Food-type.txt", JSON.stringify(data), (err) => {
                if (err) return
            })
        }
    });
return data
}

module.exports = useAxios;