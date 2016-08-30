/*******
THE LEADER OF NATION
interface.js
(c) Szymon Rutkowski 2013-2014. All rights reserved.
********/

function createScreen(info) {
  var screen = document.createElement("div")
  screen.setAttribute("id","screen")
  screen.setAttribute("class","screen")

  // Description of the screen.
  var desc = document.createElement("div") // information of curr. mode
  desc.setAttribute("class","scr_information")
  desc.innerHTML = info
  screen.appendChild(desc)

  // Cancel button.
  var button = document.createElement("div")
  button.setAttribute("class","scr_button")
  button.textContent = "(cancel)"
  var onclick = "screenClose()"
  button.setAttribute("onclick",onclick)
  screen.appendChild(button)

  return screen
}

function screenClose() {
   var screen = document.getElementById("screen") 
   document.body.removeChild(screen)
}

function regionOnclicks(regnum,onclick) {
  for(var i in regions[regnum].cells)
    document.getElementById("c-"+regions[regnum].cells[i][0]+"-"+
     regions[regnum].cells[i][1]) . setAttribute("onclick",
           onclick)
}
