dragElement(document.getElementById("mydiv"));

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

// Take Commands 

function userInput(ele) {
    if(event.key === 'Enter') {
        execCommand(ele.value); 
        document.getElementById("user-input").value = "";
    }
}

function execCommand(userCommand) {
    switch (userCommand) {
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
        default:
            updateTerminalWindow(`user@Nielsio ~ % ${userCommand}`);
            updateTerminalWindow(`zsh: command not found: ${userCommand}`);
            
    }
}

function updateRow1(newLine) {
    document.getElementById("row-1").innerHTML = newLine;
}

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
