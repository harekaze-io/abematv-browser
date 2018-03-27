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
				label: 'アニメ',
				submenu: [
					{
      						label: 'アニメ24',
        					accelerator: 'F1',
        					click: function() { createWindow(rootURL + '/now-on-air/anime24'); }
      					},
      					{
        					label: '深夜アニメ',
        					accelerator: 'F2',
        					click: function() { createWindow(rootURL + '/now-on-air/midnight-anime'); }
      					},
      					{
        					label: 'なつかしアニメ',
        					accelerator: 'F3',
        					click: function() { createWindow(rootURL + '/now-on-air/oldtime-anime'); }
      					},
    					{
      						label: '家族アニメ',
      						accelerator: 'F4',
        					click: function() { createWindow(rootURL + '/now-on-air/family-anime'); }
      					},
      					{
        					label: '新作TVアニメ',
        					accelerator: 'F5',
        					click: function() { createWindow(rootURL + '/now-on-air/new-anime'); }
      					},
				]
			},
			{
				label: 'Abema独自系',
				submenu: [
					{
						label: 'AbemaNews',
						accelerator: 'F6',
						click: function() { createWindow(rootURL + '/now-on-air/abema-news'); }
					},
					{
						label: 'AbemaNews緊急チャンネル',
						accelerator: 'F7',
						click: function() { createWindow(rootURL + '/now-on-air/news-plus'); }
					},
					{
						label: 'AbemaSPECIAL',
						accelerator: 'F8',
						click: function() { createWindow(rootURL + '/now-on-air/abema-special'); }
					},
					{
						label: 'AbemaSPECIAL2',
						accelerator: 'F9',
						click: function() { createWindow(rootURL + '/now-on-air/special-plus'); }
					},
					{
						label: 'AbemaGOLD',
						accelerator: 'F11',
						click: function() { createWindow(rootURL + '/now-on-air/special-plus-2'); }
					},
				]
			},
			{
				label: 'ドラマ系',
				submenu: [
					{
						label: 'ドラマ',
						accelerator: 'f12',
						click: function() { createWindow(rootURL + '/now-on-air/drama'); }
					},
					{
						label: '韓流・華流',
        					accelerator: '1',
        					click: function() { createWindow(rootURL + '/now-on-air/asia-drama'); }
					},
					{
						label: 'K WORLD',
						accelerator: '2',
						click: function() { createWindow(rootURL + '/now-on-air/k-world'); }
					},
				]	
			},
			{
				label: '音楽系',
				submenu: [
      					{
        					label: 'MTV HITS',
        					accelerator: '3',
        					click: function() { createWindow(rootURL + '/now-on-air/mtv-hits'); }
      					},
      					{
        					label: 'SPACE SHOWER MUSIC CAST',
        					accelerator: '4',
        					click: function() { createWindow(rootURL + '/now-on-air/space-shower'); }
      					},
      					{
      						label: 'HIPHOP',
      						accelerator: '5',
      						click: function() { createWindow(rootURL + '/now-on-air/hiphop'); }
      					},
					{
						label: 'Abema RADIO',
						accelerator: '6',
						click: function() { createWindow(rootURL + '/now-on-air/abema-radio'); }
					},
				]
			},
			{
				label: 'スポーツ系',
				submenu: [
      					{
        					label: 'SPORTS',
        					accelerator: '7',
        					click: function() { createWindow(rootURL + '/now-on-air/world-sports'); }
    					},
					{
        					label: 'SPORTS LIVE1',
        					accelerator: '8',
        					click: function() { createWindow(rootURL + '/now-on-air/world-sports-1'); }
    					},
					{
        					label: 'SPORTS LIVE2',
        					accelerator: '9',
        					click: function() { createWindow(rootURL + '/now-on-air/world-sports-2'); }
    					},
					{
        					label: 'SPORTS LIVE3',
        					accelerator: '0',
        					click: function() { createWindow(rootURL + '/now-on-air/world-sports-3'); }
    					},
    					{
        					label: '格闘',
        					accelerator: 'Q',
        					click: function() { createWindow(rootURL + '/now-on-air/fighting-sports'); }
      					},
      					{
        					label: '格闘2',
        					accelerator: 'W',
        					click: function() { createWindow(rootURL + '/now-on-air/fighting-sports2'); }
      					},
				]
			},
			{
				label: '趣味系',
				submenu: [
      					{
      						label: '釣り',
      						accelerator: 'E',
      						click: function() { createWindow(rootURL + '/now-on-air/fishing'); }
      					},
    					{
      						label: '将棋',
        					accelerator: 'T',
        					click: function() { createWindow(rootURL + '/now-on-air/shogi'); }
     					},
   		 			{
    		  				label: '麻雀',
     		 				accelerator: 'T',
    						click: function() { createWindow(rootURL + '/now-on-air/mahjong'); }
    					},
				]
			},
			{
				label: 'ゲーム系',
				submenu: [
					{
        					label: 'ウルトラゲームス',
        					accelerator: 'Y',
        					click: function() { createWindow(rootURL + '/now-on-air/ultra-games'); }
      					},
					{
        					label: 'ウルトラゲームス2',
        					accelerator: 'U',
        					click: function() { createWindow(rootURL + '/now-on-air/ultra-games-2'); }
      					},
					{
        					label: 'ウルトラゲームス3',
        					accelerator: 'I',
        					click: function() { createWindow(rootURL + '/now-on-air/ultra-games-3'); }
      					},
				]
			},
    			{
      				label: 'CM',
        			accelerator: 'O',
        			click: function() { createWindow(rootURL + '/now-on-air/commercial'); }
    			},
			//以下消えたチャンネルか限定チャンネル
      			//{
        		//	label: 'YOKONORI SPORTS',
        		//	accelerator: '2+5',
       			//	click: function() { createWindow(rootURL + '/now-on-air/yokonori-sports'); }
      			//},
      			//{
        		//	label: 'ゴルフ',
      			//	accelerator: '2+6',
        		//	click: function() { createWindow(rootURL + '/now-on-air/golf'); }
      			//},
			//{
        		//	label: 'VICE',
        		//	accelerator: '1+7',
        		//	click: function() { createWindow(rootURL + '/now-on-air/vice'); }
      			//},
      			//{
        		//	label: 'Documentary',
        		//	accelerator: '1+0',
        		//	click: function() { createWindow(rootURL + '/now-on-air/documentary'); }
      			//},
      			//{
        		//	label: 'バラエティ',
        		//	accelerator: '1+1',
        		//	click: function() { createWindow(rootURL + '/now-on-air/variety'); }
      			//},
      			//{
       			//	label: 'ペット',
        		//	accelerator: '1+2',
        		//	click: function() { createWindow(rootURL + '/now-on-air/pet'); }
      			//},
			//{
        		//	label: 'CLUB',
        		//	accelerator: '1+3',
        		//	click: function() { createWindow(rootURL + '/now-on-air/club-channel'); }
      			//},
			//{
       			//	label: 'REALITY SHOW',
       			//	accelerator: '3',
       			//	click: function() { createWindow(rootURL + '/now-on-air/reality-show'); }
      			//},
		]
	},
	{
		label: 'ヘルプ',
		submenu: [
			{
				label: 'このアプリについて',
				click: () =>
				openAboutWindow({
					icon_path: join(__dirname, 'icon-256.png'),
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
