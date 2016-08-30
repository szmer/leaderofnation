/*******
THE LEADER OF NATION
map.js
(c) Szymon Rutkowski 2013. All rights reserved.
********/

function drawRegionsBg(num) {
  var region = regions[num]
  var cells = region.cells
  for(var i=0; i<4; i++) {
    var bg = document.getElementById("bg-"+cells[i][0]+"-"+cells[i][1])
    bg.innerHTML = ""
    var color = document.createElement("div")
    color.setAttribute("style","background-color:"+players[regions[num].player].color)

    if(region.player != hum)              // fog of war?
         color.setAttribute("class", "bg fog_of_war")
    else                                  // player region 
      color.setAttribute("class","bg") 

    bg.appendChild(color)
  } // for bgs in region
} // setRegionOwner function

function drawRegion(num) {
  drawRegionsBg(num)
  var region = regions[num]
  var cells = region.cells
  for(var i=0; i<4; i++) {
    // Cell.
    var cell = document.getElementById("c-"+cells[i][0]+"-"+cells[i][1])
    if(region.player == hum) 
       cell.setAttribute("class", "cell terrain ld "+cells[i][2])
    else
       cell.setAttribute("class", "cell terrain ld fog_of_war "+cells[i][2])
  } // for specified cells

  // Remove old prod icon, if there is one.
  var prod = document.getElementById(num+"_prodico")
  if(document.body.contains(prod))
    document.body.removeChild(prod)

  regions[num].visible=true
  if(region.player != hum) { // show prod mode?
    regions[num].visible = false
    for(var i in region.neighbors)
      if(regions[region.neighbors[i]].player == hum) {
        regions[num].visible = true
        break
      }
    if(!regions[num].visible)
      return
  } // show production mode? (or return)

  var prod = document.createElement("div")
  prod.setAttribute("style", "top:"+(50*cells[3][0]+3)+"px; left:"+
            (50*cells[3][1]+3)+"px")
  prod.setAttribute("class", "ld production "+region.production)
  prod.setAttribute("id", num+"_prodico")
  prod.setAttribute("onclick", "changeProductionScreen("+num+")")
  prod.innerHTML = "&nbsp;"
  document.body.appendChild(prod)
} // drawField function

function drawMap() {
  var grid = document.getElementById("grid")
  for(var i=0; i<rows; i++) {
    for(var j=0; j<cols; j++) { // place all cells of the row
      // "bg"-s contain player's color, "c"-s terrain sprites and are clickable
      var bg = document.createElement("div")
      bg.setAttribute("id","bg-" + i + "-" + j)
      bg.setAttribute("class","cell")
      bg.setAttribute("style","top:"+50*i+"px; left:"+50*j+"px;")
      grid.appendChild(bg)
      var cell = document.createElement("div")
      cell.setAttribute("id","c-" + i + "-" + j)
      cell.setAttribute("style","top:"+50*i+"px; left:"+50*j+"px;")
      grid.appendChild(cell)
    } // for cols
  } // for rows
  for(var i in regions) {
     drawRegion(i)

     // BTW, make region arrays for players.
     players[regions[i].player].regions[i] = i
  }
} // drawMap function
