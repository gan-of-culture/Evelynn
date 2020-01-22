//const sind variablen
const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');

//mainWindow ist die variblen für das Window später
let mainWindow;
let addWindow;

//wartet bis electron bereit ist die Gui ui starten
app.on('ready', function(){
  //Neues window
  mainWindow = new BrowserWindow({width:800, height:600});
//Lädt die Html datei
mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/HTML/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  //Schließt alle anderen Fenster wenn das Hauptfenster geschlossen wird
  mainWindow.on('closed', function(){
    app.quit();
  });

  //Weißt der variable mainMenu das selber erstellt Menü hinzu
  const mainMenu = Menu.buildFromTemplate(mainTemplate);

  //Setzt das Template auf das eigen erstellt
  Menu.setApplicationMenu(mainMenu);
});

//Funktion die die Seite ändert, jenachdem was für eine gewünscht wird
function changeWindow(id){
  //Hier wird die HTML datei von dem mainWindow überschrieben
  //Wenn die ID Stimmt ändert sich die HMTL Seite
  if(id == 'nHentai'){
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, '/HTML/nHentai.html'),
      protocol: 'file:',
      slashes: true
    }));
  }
  if(id == 'Rule34'){
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, '/HTML/Rule34.html'),
      protocol: 'file:',
      slashes: true
    }));
  }
  if(id == 'Danbooru'){
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, '/HTML/Danbooru.html'),
      protocol: 'file:',
      slashes: true
    }));
  }
  if(id == 'Hanime'){
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, '/HTML/Hanime.html'),
      protocol: 'file:',
      slashes: true
    }));
  }
  if(id == 'Underhentai'){
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, '/HTML/Underhentai.html'),
      protocol: 'file:',
      slashes: true
    }));
  }
  else{
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, '/HTML/Error.html'),
      protocol: 'file:',
      slashes: true
    }));
  }
  // Garbage collection handle
  mainWindow.on('close', function () {
    mainWindow = null;
  });
}

//Hier wird das eigene Template erstellt
//Alle "Labels" im Template werden als Array geschrieben
const mainTemplate = [
  {
    //label = in diesem Fall ein neues Label oben Links
    label:'nHentai',
    click(){
      //Hier wird die selber erstellte Methode createAddWindow aufgerufen und der Wert für welche Seite mitgegeben
      changeWindow('nHentai');
    },
  },
  {
    label:'Rule34',
    click(){
      changeWindow('Rule34');
    },
  },
  {
    label:'Danbooru',
    click(){
      changeWindow('Danbooru');
    },
  },
  {
    label:'Hanime',
    click(){
      changeWindow('Hanime');
    },
  },
  {
    label:'Underhentai',
    click(){
      changeWindow('Underhentai');
    },
  }
];

// Developertools anscheizen wenn
if(process.env.NODE_ENV !== 'production'){
  mainTemplate.push({
    label: 'Developer tools',
    submenu:[
      {
        label: 'Toggle DevTools', 
        accelerator: process.platform == 'darwin' ? 'Command+I' :
        'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      {
        role:'reload'
      }
    ]
  })
}
