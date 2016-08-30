/*******
THE LEADER OF NATION
research.js
(c) Szymon Rutkowski 2013-2014. All rights reserved.
********/

function addResearchPoint() {
  var icon = document.getElementById("research_icon")
  if(icon.className!="ready") 
    icon.setAttribute("class","ready")
  icon.innerHTML = "<span class=\"unit_count\">"+players[hum].researchPoints+"</span>"
} // addResearchPoint function

function takeResearchPoint(amount) {
  players[hum].researchPoints -= amount
  var icon = document.getElementById("research_icon")
  if(players[hum].researchPoints == 0) {
    icon.setAttribute("class","")
    document.getElementById("research").setAttribute("onclick","")
    icon.innerHTML = "&nbsp;"
  }
  else
    icon.innerHTML = "<span class=\"unit_count\">"+players[hum].researchPoints+"</span>"
} // takeResearchPoint

function computeTresholdResearch(plnum) {
  players[plnum].tresholdResearch = Math.floor(999 - 
                players[plnum].publicMood*50*(players[plnum].production["university"]))
  if(players[plnum].tresholdResearch < 120)
    players[plnum].tresholdResearch = 120
}
