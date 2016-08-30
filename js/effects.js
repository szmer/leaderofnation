/*******
THE LEADER OF NATION
effects.js
(c) Szymon Rutkowski 2013-2014. All rights reserved.
********/

function animateArmies() {
  for(var i in moves)
    if(regions[moves[i].origin].visible && selectedArmy != (moves[i].origin+" "+moves[i].aid)) {
      var armyIcon = document.getElementById(moves[i].origin+"_"+moves[i].aid+"_armyico")

      switch(moves[i].animationFrame) {
        case 0:
          armyIcon.setAttribute("style","position:relative;top:2px;left:-2px")
          moves[i].animationFrame = 1
          break
        case 1:
          armyIcon.setAttribute("style","position:relative;top:2px;left:2px")
          moves[i].animationFrame = 2
          break
        case 2:
          armyIcon.setAttribute("style","position:relative;top:-1px")
          moves[i].animationFrame = 0
          break
      } // switch (animation "frame")
    }
  // For moves, if region with army is visible.
}
