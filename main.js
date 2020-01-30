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
  
  // Garbage collection handle
  mainWindow.on('close', function () {
    mainWindow = null;
  });
}

//Hier wird das eigene Template erstellt
//Alle "Labels" im Template werden als Array geschrieben
const mainTemplate = [
  {
    label:'Main' 
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
