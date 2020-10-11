dragElement(document.getElementById("mydiv"));

// File Tree
class FileTree {
  constructor(filename, content, path) {
    this.filename = filename;
    this.content = content;
    this.path = path;
    this.parent = null;
    this.descendents = [];
  }

  lsTerminal() {
    for (x = 0; x < source.descendents.length; x++) {
        updateTerminalWindow(source.descendents[x].filename);
        console.log(source.descendents[x].filename);
    }
  }

  rmTerminal(file) {
    var found = false;
    for (x = 0; x < source.descendents.length; x++) {
      if (source.descendents[x].filename == file) {
        source.descendents.splice(x, x);
        found = true;
      }
    }
    if (!found) {
        updateTerminalWindow(`rm: ${file}: No such file or directory`);
        console.log(`rm: ${file}: No such file or directory`);
      }
  }

  cdTerminal(file) {
    var found = false;
    for (x = 0; x < source.descendents.length; x++) {
      if (source.descendents[x].filename == file) {
        currentDirectory = file;
        found = true;
      }
    }
    if (!found) {
      updateTerminalWindow(`cd: no such file or directory: ${file}`)
      console.log(`cd: no such file or directory: ${file}`)
    }
  }

  mkdirTerminal(name) {
    var exists = false;
    for (x = 0; x < source.descendents.length; x++) {
      if (source.descendents[x].filename == name) {
        exists = true;
      }
    }
    if (!exists) {
        source.descendents.push(new FileTree(name, null, this.path + name + '/'));
      }
    else {
      updateTerminalWindow(`mkdir: ${name}: File exists`);
      console.log(`mkdir: ${name}: File exists`);
    }
  }
}

const source = new FileTree('TerminalSiteSource', undefined, '/Users/projects/personal-site/');
const index = new FileTree('index.html');
const assets = new FileTree('assets');
const bootstrap = new FileTree('bootstrap');
const css = new FileTree('css');
const js = new FileTree('js');


assets.descendents.push(bootstrap, css, js);
source.descendents.push(index, assets);

for (x = 0; x < source.descendents.length; x++) {
  console.log(source.descendents[x].filename);
}

var currentDirectory = source;


// Update Login Date
var loginDate = new Date();
var dateOptions = { weekday:"short", month:"short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"}
document.getElementById("row-0").innerHTML = "Last Login: " + loginDate.toLocaleDateString("en-US", dateOptions) + "  on ttys002"

// Update Terminal Window
var terminalWindow = ["",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      ""]

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

// Login greeting upon user
function login() {
    loginWindow = [
  "user@nielsio TerminalWindow % python3 manage.py runserver",
  "Watching for file changes with StatReloader",
  "Performing system checks...",
  "",
  "System check identified no issues (0 silenced).",
  "",
  "Django version 3.1.1, using settings 'nielsio.settings'",
  "Starting development server at https://www.niels.io/",
  "Quit the server with CONTROL-C.",
  "[10/Oct/2020 19:10:54] \"GET / HTTP/1.1\" 200 11",
  "^C%",
  "",
  "",
  "",
  ""
  ];
    for (i = 0; i < loginWindow.length; i++) {
        sleep(Math.round(Math.random() * 175));
        updateTerminalWindow(loginWindow[i]);
    }
}

function updateTerminalWindow(newLine) {
    terminalWindow.shift();
    terminalWindow.push(newLine);
    for (r = 0; r < terminalWindow.length; r++) {
        document.getElementById(`row-${r}`).innerHTML = terminalWindow[r];
    }
}

function clearTerminal() {
    terminalWindow = ["","","","","","","","","","","","","","","",""];
    for (r = 0; r < terminalWindow.length; r++) {
        document.getElementById(`row-${r}`).innerHTML = terminalWindow[r];
    }
}

// To Implement - cd
// 




// Take Commands 

function userInput(ele) {
    if(event.key === 'Enter') {
        execCommand(ele.value); 
        document.getElementById("user-input").value = "";
    }
}

function execCommand(userCommand) {
    input = userCommand.split(" ");
    switch (input[0]) {
        case "clear":
            clearTerminal();
            break;
        case "":
            updateTerminalWindow("user@Nielsio ~ % ");
            break;
        case "pwd":
            updateTerminalWindow(`user@Nielsio ~ % ${userCommand}`);
            updateTerminalWindow("/Users/projects/personal-site/playground");
            break;
        case "ls":
            updateTerminalWindow(`user@Nielsio ~ % ${userCommand}`);
            currentDirectory.lsTerminal();
            break;
        case "rm":
            updateTerminalWindow(`user@Nielsio ~ % ${userCommand}`);
            currentDirectory.rmTerminal(input[1]);
            break;
        case "cd":
            updateTerminalWindow(`user@Nielsio ~ % ${userCommand}`);
            currentDirectory.cdTerminal(input[1]);
            break;
        case "mkdir":
            updateTerminalWindow(`user@Nielsio ~ % ${userCommand}`);
            currentDirectory.mkdirTerminal(input[1]);
            break;
        default:
            updateTerminalWindow(`user@Nielsio ~ % ${userCommand}`);
            updateTerminalWindow(`zsh: command not found: ${userCommand}`);
            
    }
}

function updateRow1(newLine) {
    document.getElementById("row-1").innerHTML = newLine;
}






// Draggable Termianml Window

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

login();
