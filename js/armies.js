/*******
THE LEADER OF NATION
armies.js
(c) Szymon Rutkowski 2013-2014. All rights reserved.
********/

// DRAW
function drawArmy(regnum,anum) {

  if(document.body.contains(document.getElementById(regnum+"_"+anum+"_army")))
    rubArmyOut(regnum,anum)

  // We need separate div for positioning (icon style property is used to indicate unit's
  // (in)active status) 
  var armyBox = document.createElement("div")
  armyBox.setAttribute("id",regnum+"_"+anum+"_army")
  armyBox.setAttribute("class","army")
  armyBox.setAttribute("style","top:"+(regions[regnum].cells[anum][0]*50+2)+"px;"+
                         "left:"+(regions[regnum].cells[anum][1]*50+2)+"px")

  var armyStrength = document.createElement("div")
  armyStrength.setAttribute("class","army_strength")
  armyStrength.innerHTML = regions[regnum].armies[anum].strength["infantry"]+"<br>"+
              regions[regnum].armies[anum].strength["artillery"]+"<br>"+
              regions[regnum].armies[anum].strength["cavalry"]+"<br>"+
              regions[regnum].armies[anum].strength["tanks"]

  var armyIcon = document.createElement("div")
  armyIcon.setAttribute("id",regnum+"_"+anum+"_armyico")
  armyIcon.innerHTML = "&nbsp;"
  if(regions[regnum].armies[anum].move != -1)  // show move
    armyIcon.setAttribute("class", "army_icon sldr-"+moveDirection(regnum,
                          moves[ regions[regnum].armies[anum].move ].destination,
                          anum ))
  else                  // not in move
    armyIcon.setAttribute("class", "army_icon sldr-s")

  armyBox.appendChild(armyStrength)
  armyBox.appendChild(armyIcon)
  if(regions[regnum].player == hum)
    armyBox.setAttribute("onclick","prepareMove("+regnum+","+anum+")")
  document.body.appendChild(armyBox)
} // drawArmy function
function rubArmyOut(regnum,anum) {
  var army = document.getElementById(regnum+"_"+anum+"_army")
  if(document.body.contains(army)) 
    document.body.removeChild(army)
} // rubArmyOut function

// MOVE
function cleanMove(regnum,anum) {
  document.getElementById(regnum+"_"+anum+"_armyico").setAttribute("style",
         "")
  selectedArmy = ""

  var icon = document.getElementById("stop_mv")
  if(document.body.contains(icon)) 
    document.body.removeChild(icon)
  icon = document.getElementById("reorganize_mv")
  if(document.body.contains(icon)) 
    document.body.removeChild(icon)

  for(var i in regions[regnum].neighbors) // remove moving mask
    for(var c=0; c<4; c++) {
      var mask = document.getElementById(i+"_"+c+"_mvmask")
      document.body.removeChild(mask)
    } // for each cell in each region
} // cleanMove function

function prepareMove(regnum,anum) { // single tap
  // Return if there is already a "prepared" move.
  if(selectedArmy != "")
    return

  selectedArmy = regnum+" "+anum

  document.getElementById(regnum+"_"+anum+"_armyico").setAttribute("style",
           "background-color:#101")
  var nbs = regions[regnum].neighbors
  for(var i in nbs)
    for(var c=0; c<4; c++) { // add moving mask
      var mask = document.createElement("div")
      mask.innerHTML = "&nbsp;"
      mask.setAttribute("id",i+"_"+c+"_mvmask")
      mask.setAttribute("class","move_mask")
      mask.setAttribute("style","top:"+(50*regions[nbs[i]].cells[c][0])+"px; left:"+
            (50*regions[nbs[i]].cells[c][1])+"px")
      mask.setAttribute("onclick","startMove("+regnum+","+nbs[i]+","+anum+")")
      document.body.appendChild(mask)
    } // for each cell in each region

  Hammer(document).on("tap", function(event){ // abort immadiately if not possible destination
           if(event.gesture.target.getAttribute("id").search("mv")==-1) {
             cleanMove(regnum,anum)
             Hammer(document).off("touch")
           }
         })

  if(regions[regnum].armies[anum].move != -1) {
    // Draw "stop" icon.
    var stop = document.createElement("div")
    stop.innerHTML = "&nbsp;"
    stop.setAttribute("id","stop_mv")
    stop.setAttribute("style","top:"+(regions[regnum].cells[anum][0]*50+30)+"px;"+
                         "left:"+(regions[regnum].cells[anum][1]*50+30)+"px")
    document.body.appendChild(stop)
    Hammer(document.getElementById("stop_mv")).on("tap",function(event){
               delete moves[regions[regnum].armies[anum].move]
               regions[regnum].armies[anum].move = -1
               drawArmy(regnum,anum)
               cleanMove(regnum,anum)
          })
  } // if army is already in move
  else {
    // Draw "reorganize" icon.
    var reorg = document.createElement("div")
    reorg.innerHTML = "&nbsp;"
    reorg.setAttribute("id","reorganize_mv")
    reorg.setAttribute("style","top:"+(regions[regnum].cells[anum][0]*50+30)+"px;"+
                         "left:"+(regions[regnum].cells[anum][1]*50+30)+"px")
    document.body.appendChild(reorg)
    Hammer(document.getElementById("reorganize_mv")).on("tap",function(event){
            cleanMove(regnum,anum)
            prepareReorg(regnum,anum)
          })
  }
} // prepareMove function

function startMove(origin,destination,id) {
  if(regions[origin].armies[id].move != -1)
    delete moves[regions[origin].armies[id].move]
  var move = new ArmyMove(origin,destination,id)
  moves.push(move)
  regions[origin].armies[id].move = moves.length-1
  drawArmy(origin,id)
  cleanMove(origin,id)
} // startMove function


// REORGANIZATION
function cleanReorg(regnum,anum) {
  for(var i=0; i<3; i++)
    if(i != anum) {
      var mask = document.getElementById(regnum+"_"+i+"_addmask")
      document.body.removeChild(mask)
    }
  // For each cell except current army cell and production cell.
} // cleanReorg function

function prepareReorg(regnum,anum) {
  for(var i=0; i<3; i++)
    if(i != anum) {
      var mask = document.createElement("div")
      mask.innerHTML = "&nbsp;"
      mask.setAttribute("id",regnum+"_"+i+"_addmask")
      mask.setAttribute("class","add_mask")
      mask.setAttribute("style","top:"+(50*regions[regnum].cells[i][0]+3)+"px; left:"+
            (50*regions[regnum].cells[i][1]+3)+"px")
      document.body.appendChild(mask)
      Hammer(document.getElementById(regnum+"_"+i+"_addmask")).on("tap",function(event){
              cleanReorg(regnum,anum)
              reorgScreen(regnum,i)
            })
    }
  // For each cell except current army cell and production cell.
} // prepareReorg function

function reorg(regnum,anum,strength_arr) {
  var c
} // reorg function

function reorgScreen(regnum,anum) {
  var screen = createScreen("Add here:")
  var types = ["infantry","artillery","cavalry","tanks"]
  document.body.appendChild(screen)
} // reorgScreen function

// AUXILIARY
function moveDirection(regnum1,regnum2,cell) {
  var ax=regions[regnum1].cells[cell][0]
  var ay=regions[regnum1].cells[cell][1]
  var bx=regions[regnum2].cells[3][0]
  var by=regions[regnum2].cells[3][1]
  if(ax!=bx) {
    if(ay!=by) {
      if(ax>bx && ay>by) return "sw"
      if(ax>bx && ay<by) return "se"
      if(ax<bx && ay<by) return "ne"
      else               return "nw"
    } // differ column
    else {
      if(ax>bx) return "n"
      else      return "s"
    } // same column
  } // differ row
  else {
    if(ay>by) return "w"
    else      return "e"
  } // same row
} // function moveDirection
