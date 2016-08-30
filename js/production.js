/*******
THE LEADER OF NATION
production.js
(c) Szymon Rutkowski 2013. All rights reserved.
********/

function changeRegionProduction(regnum, newmode) {
  var player = players[regions[regnum].player]

  // If mode is changed, update player's production tracking.
  if(regions[regnum].hasOwnProperty("production")) 
    player.production[regions[regnum].production]--

  regions[regnum].production = newmode
  player.production[newmode]++
}

function changeProductionScreen(num) {
  var region = regions[num]
  var screen = createScreen("Current production mode of this region is <em>"+
                     region.production.replace("_"," ")+"</em>. You can change it below.")

  // Buttons changing production mode.
  var i, modes = ["agriculture","fortified_area","heavy_industry","light_industry","university"]
  for(i in modes) {
     button = document.createElement("div")
     button.setAttribute("class","scr_button")
     button.textContent = modes[i].replace("_"," ")
     onclick = "changeRegionProduction("+num+",\""+modes[i]+
                "\");computeTresholdMilitary(hum);computeTresholdResearch(hum);drawRegion(\""
                +num+"\"); screenClose()"
     button.setAttribute("onclick",onclick)
     screen.appendChild(button)
  }
  document.body.appendChild(screen) 
} // function: change_production screen
