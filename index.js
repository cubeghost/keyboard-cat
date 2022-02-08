require('dotenv').config();

const path = require('path');
const { app, shell, BrowserWindow, Menu, MenuItem } = require('electron');
const fetch = require('make-fetch-happen');

const KEYBOARD_SHORTCUT = 'Cmd+Shift+0';
const API_URL = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=cat`;

let windw = null;

const template = ({url, permalink}) => `data:text/html;charset=utf-8,
<!DOCTYPE html>
<html>
<body style="margin:0;overflow:hidden;">
  <a href="${permalink}" target="_blank"><img src="${url}" /></a>
</body>
</html>
`;

const launchCat = async () => {
  let newWindw;

  const response = await fetch(API_URL);
  const json = await response.json();

  const permalink = json.data.url;
  const { width, height, url } = json.data.images.original;

  const windowWidth = Number(width);
  const windowHeight = Number(height);

  const html = template({url, permalink});

  newWindw = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "#000",
    useContentSize: true,
    title: 'keyboard cat',
    show: false,
    icon: path.join(__dirname, 'paw.png'),
    useContentSize: true,
  });
  newWindw.loadURL(html);

  newWindw.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  newWindw.once('ready-to-show', () => {
    newWindw.show();
    if (windw) {
      windw.close();
    }
    windw = newWindw;
  });
};

const menu = new Menu();
menu.append(new MenuItem({
  label: 'Cat',
  submenu: [{
    label: 'New Cat',
    accelerator: KEYBOARD_SHORTCUT,
    click: () => {
      launchCat();
    }
  }]
}));

Menu.setApplicationMenu(menu);

app.on('ready', () => {
  launchCat();
});
