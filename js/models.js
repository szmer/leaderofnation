/*******
THE LEADER OF NATION
models.js
(c) Szymon Rutkowski 2013-2014. All rights reserved.
********/

// PLAYER
function Player(num,flag,color) {
  this.num = num
  this.color = color
  this.flag = flag // png file name

  this.regions = [] // indices are the same as region numbers
  this.production = // counts number of regions with given prodmode
     { "agriculture":0,"fortified_area":0,"heavy_industry":0,
       "light_industry":0,"university":0 }

  this.progressMilitary = 0
  this.unitsToDeploy = 0
  this.tresholdMilitary = 999

  this.progressResearch = 0
  this.researchPoints = 0
  this.tresholdResearch = 999

  this.publicMood = 0.75
}

// ARMY
function Army(player, region) {
  this.player = player
  this.region = region
  this.move = -1

  this.strength = {"infantry":0,"artillery":0,"cavalry":0,"tanks":0}
}
function ArmyMove(origin, destination, aid) {
  this.origin = origin // region id
  this.destination = destination
  this.aid = aid // army id

  this.animationFrame = 0

  if(regions[origin].armies[aid].strength["artillery"] > 0)
    this.timeLeft = 15 // s
  else if(regions[origin].armies[aid].strength["infantry"] > 0)
    this.timeLeft = 11
  else
    this.timeLeft = 6
}

// REGION
// "r" stands for "region" in names.
function rJLikeDown(stx,sty) {
  this.cells = [ [stx,sty,"lfend"], [stx,sty+2,"urcor"], [stx,sty+1,"hpipe"], [stx+1,sty+2,"lwend"] ] 
}
function rJLikeLeft(stx,sty) {
  this.cells = [ [stx,sty,"lfend"], [stx,sty+1,"lrcor"], [stx-1,sty+1,"vpipe"], [stx-2,sty+1,"uend"] ] 
}
function rJLikeUp(stx,sty) {
  this.cells = [ [stx,sty,"uend"], [stx+1,sty,"llcor"], [stx+1,sty+1,"hpipe"], [stx+1,sty+2,"rend"] ] 
}
function rLineHorizontal(stx,sty) {
  this.cells = [ [stx,sty,"lfend"], [stx,sty+1,"hpipe"], [stx,sty+2,"hpipe"], [stx,sty+3,"rend"] ] 
}
function rLineVertical(stx,sty) {
  this.cells = [ [stx,sty,"uend"], [stx+1,sty,"vpipe"], [stx+2,sty,"vpipe"], [stx+3,sty,"lwend"] ] 
}
function rLLikeDown(stx,sty) {
  this.cells = [ [stx,sty,"ulcor"], [stx+1,sty,"lwend"], [stx,sty+1,"hpipe"], [stx,sty+2,"rend"] ] 
}
function rSnakeDownLeft(stx,sty) {
  this.cells = [ [stx,sty,"uend"], [stx+1,sty-1,"ulcor"], [stx+1,sty,"lrcor"], [stx+2,sty-1,"lwend"] ] 
}
function rSnakeDownRight(stx,sty) {
  this.cells = [ [stx,sty,"uend"], [stx+1,sty,"llcor"], [stx+1,sty+1,"urcor"], [stx+2,sty+1,"lwend"] ] 
}
function rSnakeRightUp(stx,sty) {
  this.cells = [ [stx,sty,"lfend"], [stx-1,sty+1,"ulcor"], [stx,sty+1,"lrcor"], [stx-1,sty+2,"rend"] ] 
}
function rSquare(stx,sty) {
  this.cells = [ [stx,sty,"ulcor"], [stx,sty+1,"urcor"], [stx+1,sty,"llcor"], [stx+1,sty+1,"lrcor"] ] 
}
function rTLikeDown(stx,sty) {
  this.cells = [ [stx,sty,"lfend"], [stx+1,sty+1,"lwend"], [stx,sty+1,"uonly"], [stx,sty+2,"rend"] ] 
  this.neighbors = []
}
function rTLikeLeft(stx,sty) {
  this.cells = [ [stx,sty,"lfend"], [stx-1,sty+1,"uend"], [stx,sty+1,"ronly"], [stx+1,sty+1,"lwend"] ] 
}
function rTLikeRight(stx,sty) {
  this.cells = [ [stx,sty,"uend"], [stx+1,sty+1,"rend"], [stx+1,sty,"lfonly"], [stx+2,sty,"lwend"] ] 
}
