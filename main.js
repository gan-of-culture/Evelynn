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
    pathname: path.join(__dirname, 'index.html'),
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

//
function createAddWindow(){
   //Neues window
   addWindow = new BrowserWindow({width:300, height:200, title:"Test"});
   //Lädt die Html datei
     addWindow.loadURL(url.format({
       pathname: path.join(__dirname, 'addWindow.html'),
       protocol: 'file:',
       slashes: true
     }));
     // Garbage collection handle
     addWindow.on('close', function(){
       addWindow = null;
     });
}

//Hier wird das eigene Template erstellt
//Alle "Items" im Template werden als Array geschrieben
const mainTemplate = [
  {
    //label = in diesem Fall ein neues Label oben Links
    label:'File',
    //Die Submenüs sind die menüs die als DropDown erscheinen 
    submenu:[
      {
        //Hier ist der Name des ersten DropDown eintrages
        label: 'Add Item',
        click(){
          //Hier wird die selber erstellte Methode createAddWindow aufgerufen
          createAddWindow();
        }
      },
      {
        label: 'Quit',
        //Click ist ein Event das aufgerufen wird sobald das Label gedrückt wird
        click(){
          //app.quit schließt das Programm sobald click aufgerufen worden ist
          app.quit();
        }
      }
    ]
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
