/*******
THE LEADER OF NATION
deployment.js
(c) Szymon Rutkowski 2013-2014. All rights reserved.
********/

function deploymentScreen() {
  var screen = document.createElement("div")
  screen.setAttribute("id","screen")
  screen.setAttribute("class","screen")

  var info = document.createElement("div")
  info.setAttribute("class","scr_information")
  var selectAmount = "<select id='amount_of_units'>"
  for(var i=players[hum].unitsToDeploy; i!=0; i--)
     selectAmount += "<option value='"+i+"'>"+i+"</option>"
  selectAmount += "</select>"
  info.innerHTML = "<form>Deploy "+selectAmount+" units of</form>"
  screen.appendChild(info)

  var button = document.createElement("div")
  button.setAttribute("class","scr_button")
  button.textContent = "(cancel)"
  button.setAttribute("onclick","screenClose()")
  screen.appendChild(button)

  var types = ["infantry","artillery","cavalry","tanks"]
  for(var t in types) {
    button = document.createElement("div")
    button.setAttribute("class","scr_button")
    button.textContent = types[t]
    button.setAttribute("onclick","prepareDeployment(\""+types[t]+"\");screenClose()")
    screen.appendChild(button)
  }

  document.body.appendChild(screen)
} // deploymentScreen function

function prepareDeployment(type) { // prepares map for deploying selected units
  var sel = document.getElementById("amount_of_units")
  var amount = sel.options[sel.selectedIndex].value 
  var regs = players[hum].regions // player's regions
  for(var i in regs)
    for(var c=0; c<3; c++) { // ommit the last cell (production)
      if(!regions[regs[i]].hasOwnProperty("armies")
                  || regions[regs[i]].armies[c] == undefined) // new army
        document.getElementById("c-"+regions[regs[i]].cells[c][0]+"-"+regions[regs[i]].cells[c][1]).
                setAttribute(
                  "onclick","deployUnits(\""+type+"\","+amount+","+regs[i]+","+c+","+hum+")"
                )
      else // add units to the existing army 
        document.getElementById(regs[i]+"_"+c+"_army").
                setAttribute(
                  "onclick","deployUnits(\""+type+"\","+amount+","+regs[i]+","+c+","+hum+")"
                )
    } // for each cell in each region
} // function prepareDeployment

function deployUnits(type,amount,regnum,anum,plnum) {
  clearDeploymentOnclicks()
  decrementReadyUnits(amount)
  var region = regions[regnum]

  // Impact on public mood.
  if(type == "tanks")
    updatePublicMood(plnum, -(0.003*amount))
  else
    updatePublicMood(plnum, -(0.001*amount))

  // Place army.
  if(!region.hasOwnProperty("armies"))
    region.armies = []

  if(region.armies[anum] != undefined) {
    region.armies[anum].strength[type] += amount
    rubArmyOut(regnum,anum)
  }
  else {
    var newArmy = new Army()
    newArmy.strength[type] = amount
    region.armies[anum] = newArmy
  }

  if(plnum == hum)
    drawArmy(regnum,anum)
} // function deployUnits

function incrementReadyUnits() {
  var icon = document.getElementById("military_icon")
  if(icon.className!="ready") 
    icon.setAttribute("class","ready")
  icon.innerHTML = "<span class=\"unit_count\">"+players[hum].unitsToDeploy+"</span>"
  document.getElementById("military").setAttribute("onclick","deploymentScreen()")
} // function incrementReadyUnits

function decrementReadyUnits(amount) {
  players[hum].unitsToDeploy -= amount
  var icon = document.getElementById("military_icon")
  if(players[hum].unitsToDeploy == 0) {
    icon.setAttribute("class","")
    document.getElementById("military").setAttribute("onclick","")
    icon.innerHTML = "&nbsp;"
  }
  else
    icon.innerHTML = "<span class=\"unit_count\">"+players[hum].unitsToDeploy+"</span>"
} // function decrementReadyUnits

function clearDeploymentOnclicks() {
  var regs = players[hum].regions // player's regions
  for(var i in regs)
    for(var c=0; c<3; c++) { // ommit the last cell (production)
      if(!regions[regs[i]].hasOwnProperty("armies")
                  || regions[regs[i]].armies[c] == undefined)
        document.getElementById("c-"+regions[regs[i]].cells[c][0]+"-"+regions[regs[i]].cells[c][1]).
                setAttribute(
                  "onclick",""
                )
      else
        document.getElementById(regs[i]+"_"+c+"_army").
                setAttribute(
                  "onclick","prepareMove("+regs[i]+","+c+")"
                )
    } // for each cell in each region

} // function clearDeploymentOnclicks

function computeTresholdMilitary(plnum) {
  players[plnum].tresholdMilitary = Math.floor(120 - 
                players[plnum].publicMood*10*(players[plnum].production["heavy_industry"]+
                 players[plnum].production["agriculture"] ))
  if(players[plnum].tresholdMilitary < 20)
    players[plnum].tresholdMilitary = 20
}
