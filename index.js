require('dotenv').config();

const path = require('path');
const { app, BrowserWindow } = require('electron');
const fetch = require('make-fetch-happen');

const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=cat`;

let windw = null;

app.on('ready', () => {

  fetch(url).then(response => response.json()).then(async json => {

    const { image_height, image_width, image_url } = json.data;

    const windowWidth = Number(image_width);
    const windowHeight = Number(image_height);

    const html = `data:text/html;charset=utf-8,<body style="margin:0;"><img src="${image_url}" /></body>`;

    windw = new BrowserWindow({
      width: windowWidth,
      height: windowHeight,
      backgroundColor: "#000",
      useContentSize: true,
      title: 'keyboard cat',
      show: false,
      icon: path.join(__dirname, 'paw.png')
    });

    windw.loadURL(html);

    windw.once('ready-to-show', () => {
      windw.show();
    });

  });


});
