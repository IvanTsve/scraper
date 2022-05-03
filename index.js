const conf = require('dotenv').config();
const fs = require('fs');
const app = require('express')();
const bodyParser = require('body-parser')
const axios = require('axios');
const cheerio = require('cheerio');

const useAxios = require('./getData');


axios.get(conf.parsed.MAIN_URL)
    .then(r => {
        let data = {};
        let html = r.data;
        let $ = cheerio.load(html);
        $(conf.parsed.SELECTOR, html).each(function () {
            let title = $(this).html().split(' ').join('_');
            let productUrl = this.parent.attribs.href
            let name = `${productUrl.split('group/')[1]}`;
            data[title] = { productUrl, [name]: [] };
        });
        fs.writeFileSync("files/Food-type.txt", JSON.stringify(data), (err) => {
            if (err) return
        })
        return data
    })
    .then(d => {
        for (let key in d) {
            let element = d[key];
            axios(element.productUrl)
                .then(r => {
                  let html = r.data;
                  let $ = cheerio.load(html);
                    $(`${conf.parsed.SELECTOR_TWO}`, html).each(function () {
                        let foodPart = $(this).html().split(' ').join('_').split(',').join('');
                        if (!foodPart) return;
                        let name = element.productUrl.split('/').pop();
                        element[name].push(foodPart);
                    });
                    fs.writeFileSync("files/Food-type.txt", JSON.stringify(d), (err) => {
                        if (err) return
                    })
                    return d
                })
                .catch(e => console.log(e))
       }
    })
    .catch(e => console.log(e, conf.parsed.MAIN_URL))


// fs.readFile('files/Food-type.txt', 'utf-8', function (err, data) {
//     if (err) {
//         console.log(err);
//         return
//     } else {

//    }

//})


app.listen(8000, () => {
    console.log(`app listening on port 8000`)
})
