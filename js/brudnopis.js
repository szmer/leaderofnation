// FIELD CLASSES. "f" stands for "field" in names.

function drawField(field) {
  var cls = field.cells
  document.getElementById("c-"+cls[0][0]+"-"+cls[0][1]).style="cell "+field.production
  document.getElementById("c-"+cls[1][0]+"-"+cls[1][1]).style="cell "+field.production
  document.getElementById("c-"+cls[2][0]+"-"+cls[1][1]).style="cell "+field.production
  document.getElementById("c-"+cls[3][0]+"-"+cls[1][1]).style="cell "+field.production
}

function fSnakeDownLeft(stx, sty) {
  this.cells = [ [stx, sty], [stx+1, sty], [stx+1, sty+1], [stx+2, sty+1] ] 
  this.production = "heavy"
}
