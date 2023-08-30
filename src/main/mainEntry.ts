import {app, BrowserWindow, Menu} from 'electron';
import {createMainWindow} from './mainWindow';
import registerMainWinEvent from './event/mainWinEvent';
import registerGlobalShortcut from './shortcut';
import {CustomScheme} from './CustomScheme';
import {listen} from "./ipc";

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

const gotTheLock = app.requestSingleInstanceLock();
let mainWindow: BrowserWindow;
if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });
    app.whenReady().then(() => {
        if (BrowserWindow.getAllWindows().length === 0) {
            const {screen} = require('electron')
            Menu.setApplicationMenu(null);
            mainWindow = createMainWindow();
            registerMainWinEvent(mainWindow);
            registerGlobalShortcut(mainWindow);

            if (process.argv[2]) {
                mainWindow.loadURL(process.argv[2]);
                mainWindow.webContents.openDevTools({mode: 'undocked'});
            } else {
                CustomScheme.registerScheme();
                mainWindow.loadURL(`app://index.html`);
            }

            listen('getAllDisplays', () => {
                return screen.getAllDisplays()
            })
        }
    });
}
