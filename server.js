const isOnline = require('is-online');
const urlExist = require("url-exist");
const path = require('path');
const { app, BrowserWindow } = require('electron');

/* config app */

var icon = 'app/img/app.ico';
var backgroundColor = '#00aeff';

// link app
var online = 'https://youtube.com';

// error page
var network = 'public/offline-network.html';
var server = 'public/offline-server.html';


/* ⚠️ don't change it ⚠️ */

function offline_network() {
    const Win = new BrowserWindow({
        show: false,
        'minHeight': 600,
        'minWidth': 800,
        icon: path.join(__dirname, icon),
        backgroundColor: backgroundColor,
        webPreferences: {
            nodeIntegration: true
        }
    })

    Win.loadFile(path.join(__dirname, network))
    Win.removeMenu();
    Win.maximize();
    Win.show();
}

function offline_server() {
    const Win = new BrowserWindow({
        show: false,
        'minHeight': 600,
        'minWidth': 800,
        icon: path.join(__dirname, icon),
        backgroundColor: backgroundColor,
        webPreferences: {
            nodeIntegration: true
        }
    })

    Win.loadFile(path.join(__dirname, server))
    Win.removeMenu();
    Win.maximize();
    Win.show();
}

function createWindow_online() {
    const Win = new BrowserWindow({
        show: false,
        'minHeight': 600,
        'minWidth': 800,
        icon: path.join(__dirname, icon),
        backgroundColor: backgroundColor,
        webPreferences: {
            nodeIntegration: true
        }
    })

    Win.loadURL(online);
    Win.removeMenu();
    Win.maximize();
    Win.show();
}


(async () => {
    var webapp = await urlExist(online);;
    var appon = await isOnline();

    if (appon == true) {
        if(webapp == true) {
            app.whenReady().then(createWindow_online)
        } else {
            app.whenReady().then(offline_server)
        }
    } else {
        app.whenReady().then(offline_network)
    }
})();

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})