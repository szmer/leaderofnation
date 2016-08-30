/*******
THE LEADER OF NATION
(c) Szymon Rutkowski 2013. All rights reserved.
********/

window.onload = function() {
  scenario() // makes global variables
  
  moves = []
  selectedArmy = "" // army selected to move

  drawMap()
  for(var i in players) {
    computeTresholdMilitary(i)
    computeTresholdResearch(i)
  }
  updatePublicMood(hum,0)

  setInterval(function(){moveAgent()},1000)
  setInterval(function(){devAgent()},1000)
  setInterval(function(){popAgent()},20000)

  setInterval(function(){animateArmies()},100)
} // window.onload

function moveAgent() { // counts each army move time
  for(var i in moves) {
    moves[i].timeLeft--
    if(moves[i].timeLeft == 0) {
      // Clean move if army is clicked.
      if(selectedArmy == moves[i].origin+" "+moves[i].aid)
        cleanMove(moves[i].origin,moves[i].aid)

      rubArmyOut(moves[i].origin,moves[i].aid)

      var army = regions[moves[i].origin].armies[moves[i].aid]
      army.move = -1
      delete regions[moves[i].origin].armies[moves[i].aid]

      // Seizing regions.
      if(regions[moves[i].origin].player != regions[moves[i].destination].player) {
        var orig=moves[i].origin, dest=moves[i].destination
        players[regions[orig].player].regions[dest]=dest    // update region arrays
        delete players[regions[dest].player].regions[dest] 
        players[regions[orig].player].production[regions[dest].production]++ // update prod arrays
        players[regions[dest].player].production[regions[dest].production]--
        regions[dest].player = regions[orig].player // finally, update region owner

        drawRegion(moves[i].destination)
        if(regions[orig].player == hum)
          for(var j in regions[moves[i].destination].neighbors)
            drawRegion(regions[moves[i].destination].neighbors[j]) 
      } // seize region (origin owner other than that of destination)

      // Place arriving army somewhere in new region.
      if(regions[moves[i].destination].armies != undefined) {
        var j = 0
        for(; j<3; j++) 
          if(regions[moves[i].destination].armies[j] == undefined) {
            regions[moves[i].destination].armies[j] = army
            drawArmy(moves[i].destination,j)
            break
          } // if empty slot found
        // for army slots - try to find empty one
        if(j == 3) { // if there are no free slots, merge with the first army
          for(var k in regions[moves[i].destination].armies[0].strength)
            regions[moves[i].destination].armies[0].strength[k] += army.strength[k]
          rubArmyOut(moves[i].destination,0)
          drawArmy(moves[i].destination,0)
        } // if no free slots
      } // if armies is defined array
      else {
        regions[moves[i].destination].armies = [army]
        drawArmy(moves[i].destination,0)
      }

      delete moves[i]
    } // if enough amount of time just passed
  } // for each move
}
function devAgent() { // tracks military and research development
  var i
  for(i in players) {
    players[i].progressMilitary ++
    players[i].progressResearch ++

    if(players[i].progressMilitary == players[i].tresholdMilitary) {
      players[i].unitsToDeploy++
      players[i].progressMilitary = 0
      if(i==hum)
        incrementReadyUnits()
    } // add one unit to deploy


    if(players[i].progressResearch == players[i].tresholdResearch) {
      players[i].researchPoints++
      players[i].progressResearch = 0
      if(i==hum)
        addResearchPoint()
    } // add one research point

    if(i == hum) {
      document.getElementById("military_value").innerHTML = players[hum].tresholdMilitary - players[hum].progressMilitary
      document.getElementById("research_value").innerHTML = players[hum].tresholdResearch - players[hum].progressResearch
    }
  } // for i in players
} // devAgent function

function popAgent() {
  for(var i in players) {
    var value = 0.25*(players[i].production["light_industry"]-players[i].production["heavy_industry"])
    updatePublicMood(i,value/100)
  }
}
