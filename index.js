const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs')

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res)=> {

    (async (link) => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(link);
      
        const srcList = await page.evaluate(()=> {
          const nodeList = document.querySelectorAll('img');
          const imageList = [...nodeList];

          imageList.splice(0,1)
          const srcList = imageList.map(({src}) => ({src}))
          
          
          return srcList
        }).catch(erro => console.log(erro));

        res.send(srcList)
        browser.close()

      }) (req.query.link);

     

    
})





app.listen(3001, ()=>{
    console.log('servidor rodando')
})

