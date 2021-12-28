require('dotenv').config();

const path = require('path');
const { app, BrowserWindow } = require('electron');
const fetch = require('make-fetch-happen');

const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=cat`;

let windw = null;

app.on('ready', () => {

  fetch(url).then(response => response.json()).then(async json => {

    const { width, height, url } = json.data.images.original;

    const windowWidth = Number(width);
    const windowHeight = Number(height);

    const html = `data:text/html;charset=utf-8,<body style="margin:0;"><img src="${url}" /></body>`;

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
