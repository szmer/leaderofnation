/*******
THE LEADER OF NATION
publicmood.js
(c) Szymon Rutkowski 2013. All rights reserved.
********/
function updatePublicMood(plnum, val) {
  players[plnum].publicMood += val
  if(players[plnum].publicMood > 1)
    players[plnum].publicMood = 1
  if(players[plnum].publicMood < 0)
    players[plnum].publicMood = 0
  if(plnum == hum)
    document.getElementById("publicmood_value").innerHTML =
          Math.round( players[plnum].publicMood*100 )+"%"
}
