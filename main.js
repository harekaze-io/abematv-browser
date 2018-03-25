"use strict";
const {app, Menu} = require('electron');
const electron = require("electron");
const BrowserWindow = electron.BrowserWindow;
const rootURL = 'https://abema.tv';
const openAboutWindow = require('about-window').default;
const join = require('path').join;
let mainWindow;

const template = [
	{
		label: 'メニュー',
		submenu: [
			{
				label: '番組表',
				accelerator: 'Ctrl+T',
				click: function() { createWindow(rootURL + '/timetable'); }
			}
		]
	},
	{
		label: 'ウィンドウ',
		role: 'window',
		submenu: [
			{
				label: 'リロード',
				accelerator: 'F5',
				role: 'reload'
			},
			{
				label: '新規ウィンドウ',
				accelerator: 'Ctrl+T',
				click: function() { createWindow(rootURL); }
			},
			{
				label: 'ウィンドウを常に最前面にする',type: 'checkbox', checked:false, click: function() {
					let alwaysOnTop = mainWindow.isAlwaysOnTop();
					alwaysOnTop = !alwaysOnTop;
					mainWindow.setAlwaysOnTop(alwaysOnTop);
				}
			},
			{
				label: '終了',
				accelerator: 'Ctrl+W',
				role: 'close'
			}
		]
	},
	{
		label: 'チャンネル',
		submenu: [
			{
				label: 'AbemaNews',
				accelerator: '1',
				click: function() { createWindow(rootURL + '/now-on-air/abema-news'); }
			},
			{
				label: 'AbemaSPECIAL',
				accelerator: '2',
				click: function() { createWindow(rootURL + '/now-on-air/abema-special'); }
			},
			{
				label: 'AbemaSPECIAL2',
				accelerator: '3',
				click: function() { createWindow(rootURL + '/now-on-air/special-plus'); }
			},
			{
				label: 'AbemaGOLD',
				accelerator: '4',
				click: function() { createWindow(rootURL + '/now-on-air/special-plus-2'); }
			},
			{
				label: 'ドラマ',
				accelerator: '5',
				click: function() { createWindow(rootURL + '/now-on-air/drama'); }
			},
			{
				label: '韓流・華流',
        accelerator: '6',
        click: function() { createWindow(rootURL + '/now-on-air/asia-drama'); }
      },
      {
        label: 'REALITY SHOW',
        accelerator: '7',
        click: function() { createWindow(rootURL + '/now-on-air/reality-show'); }
      },
      {
        label: 'MTV HITS',
        accelerator: '8',
        click: function() { createWindow(rootURL + '/now-on-air/mtv-hits'); }
      },
      {
        label: 'SPACE SHOWER MUSIC CAST',
        accelerator: '9',
        click: function() { createWindow(rootURL + '/now-on-air/space-shower'); }
      },
      {
        label: 'Documentary',
        accelerator: '1+0',
        click: function() { createWindow(rootURL + '/now-on-air/documentary'); }
      },
      {
        label: 'バラエティ',
        accelerator: '1++1',
        click: function() { createWindow(rootURL + '/now-on-air/variety'); }
      },
      {
       	label: 'ペット',
        accelerator: '1+2',
        click: function() { createWindow(rootURL + '/now-on-air/pet'); }
      },
      {
        label: 'CLUB',
        accelerator: '1+3',
        click: function() { createWindow(rootURL + '/now-on-air/club-channel'); }
      },
      {
        label: 'SPORTS',
        accelerator: '1+4',
        click: function() { createWindow(rootURL + '/now-on-air/world-sports'); }
    	},
    	{
        label: '格闘',
        accelerator: '1+5',
        click: function() { createWindow(rootURL + '/now-on-air/fighting-sports'); }
      },
      {
        label: '格闘2',
        accelerator: '1+6',
        click: function() { createWindow(rootURL + '/now-on-air/fighting-sports2'); }
      },
			{
        label: 'VICE',
        accelerator: '1+7',
        click: function() { createWindow(rootURL + '/now-on-air/vice'); }
      },
    	{
      	label: 'CM',
        accelerator: '1+8',
        click: function() { createWindow(rootURL + '/now-on-air/commercial'); }
    	},
      {
      	label: 'アニメ24',
        accelerator: '1+9',
        			click: function() { createWindow(rootURL + '/now-on-air/anime24'); }
      },
      {
        label: '深夜アニメ',
        accelerator: '2+0',
        click: function() { createWindow(rootURL + '/now-on-air/midnight-anime'); }
      },
      {
        label: 'なつかしアニメ',
        accelerator: '2+1',
        click: function() { createWindow(rootURL + '/now-on-air/oldtime-anime'); }
      },
    	{
      	label: '家族アニメ',
      	accelerator: '2+2',
        click: function() { createWindow(rootURL + '/now-on-air/family-anime'); }
      },
      {
        label: '新作TVアニメ',
        accelerator: '2+3',
        click: function() { createWindow(rootURL + '/now-on-air/new-anime'); }
      },
      {
      	label: 'HIPHOP',
      	accelerator: '2+4',
      	click: function() { createWindow(rootURL + '/now-on-air/hiphop'); }
      },
      {
        label: 'YOKONORI SPORTS',
        accelerator: '2+5',
        click: function() { createWindow(rootURL + '/now-on-air/yokonori-sports'); }
      },
      {
        label: 'ゴルフ',
      	accelerator: '2+6',
        click: function() { createWindow(rootURL + '/now-on-air/golf'); }
      },
      {
      	label: '釣り',
      	accelerator: '2+7',
      	click: function() { createWindow(rootURL + '/now-on-air/fishing'); }
      },
    	{
      	label: '将棋',
        accelerator: '2+8',
        click: function() { createWindow(rootURL + '/now-on-air/shogi'); }
      },
    	{
      	label: '麻雀',
      	accelerator: '2+9',
    		click: function() { createWindow(rootURL + '/now-on-air/mahjong'); }
    	}
		]
	},
	{
		label: 'ヘルプ',
		submenu: [
			{
				label: 'このアプリについて',
				click: () =>
				openAboutWindow({
					icon_path: join(__dirname, 'favicon.ico'),
					copyright: 'Copyright (c) 2018 Reichan',
					description: 'このアプリはAbema-TV用のブラウザーです。自己責任でお使いください。',
					package_json_dir: __dirname,
				}),
			}
    ]
  }
];

function createWindow (url) {
	mainWindow = new BrowserWindow({titleBarStyle: 'hidden' ,width: 1080, height: 600});
	mainWindow.loadURL(url);

  	mainWindow.on('closed', function () {
    	mainWindow = null
 	});

  	let menu = Menu.buildFromTemplate(template);
  	Menu.setApplicationMenu(menu);
}

app.on('ready', function () { createWindow(rootURL) });

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
    		app.quit();
	}
});

app.on('activate', function () {
  	if (mainWindow === null) {
		createWindow();
	}
});
