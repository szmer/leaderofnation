/*******
THE LEADER OF NATION
(c) Szymon Rutkowski 2013. All rights reserved.
********/

function scenario() {
  rows = 11
  cols = 13

  players = []
  players[0] = new Player(0,"flag_russia.png","maroon")
  players[1] = new Player(1,"flag_habsburg.png","yellow")
  players[2] = new Player(2,"flag_prussia.png","white")

  hum = 0 // human player id

  regions = []
  regions[0] = new rTLikeDown(1,1)
  regions[0].neighbors = [1,6]
  regions[0].player = 2
  changeRegionProduction(0, "agriculture")
  regions[1] = new rSnakeRightUp(2,3)
  regions[1].neighbors = [0,6,2,3]
  regions[1].player = 2
  changeRegionProduction(1, "agriculture")
  regions[2] = new rSnakeDownRight(2,5)
  regions[2].neighbors = [1,6,3,10,13]
  regions[2].player = 2
  changeRegionProduction(2, "agriculture")
  regions[3] = new rSnakeDownRight(1,6)
  regions[3].neighbors = [1,2,4,13,14]
  regions[3].player = 2
  changeRegionProduction(3, "heavy_industry")

  var army = new Army(2,3)
  army.strength["infantry"] = 35
  army.strength["artillery"] = 10
  army.strength["cavalry"] = 10
  regions[3].armies = []
  regions[3].armies[2] = army
  drawArmy(3,2)

  regions[4] = new rTLikeDown(1,7)
  regions[4].neighbors = [3,14,5]
  regions[4].player = 2
  changeRegionProduction(4, "agriculture")
  regions[5] = new rJLikeDown(2,9)
  regions[5].neighbors = [4,14,16]
  regions[5].player = 2
  changeRegionProduction(5, "light_industry")
  regions[6] = new rLLikeDown(3,2)
  regions[6].neighbors = [0,1,2,7,8]
  regions[6].player = 2
  changeRegionProduction(6, "light_industry")
  regions[7] = new rSquare(4,3)
  regions[7].neighbors = [6,8,10]
  regions[7].player = 2
  changeRegionProduction(7, "light_industry")
  regions[8] = new rJLikeUp(5,2)
  regions[8].neighbors = [7,6,9,10]
  regions[8].player = 2
  changeRegionProduction(8, "heavy_industry")
  regions[9] = new rSquare(7,3)
  regions[9].neighbors = [8,11]
  regions[9].player = 2
  changeRegionProduction(9, "university")
  regions[10] = new rTLikeRight(4,5)
  regions[10].neighbors = [7,8,11,12,13,2]
  regions[10].player = 2
  changeRegionProduction(10, "agriculture")

  var army = new Army(2,10)
  army.strength["infantry"] = 50
  army.strength["artillery"] = 20
  army.strength["cavalry"] = 5
  regions[10].armies = []
  regions[10].armies[0] = army
  drawArmy(10,0)

  regions[11] = new rTLikeRight(7,5)
  regions[11].neighbors = [8,9,10,19,12]
  regions[11].player = 2
  changeRegionProduction(11, "heavy_industry")
  regions[12] = new rSquare(6,6)
  regions[12].neighbors = [11,10,13,18,19]
  regions[12].player = 0
  changeRegionProduction(12, "light_industry")
  regions[13] = new rSnakeDownRight(4,7)
  regions[13].neighbors = [2,3,14,15,18,12,10]
  regions[13].player = 0
  changeRegionProduction(13, "agriculture")
  regions[14] = new rLLikeDown(3,8)
  regions[14].neighbors = [13,15,3,4,5]
  regions[14].player = 0
  changeRegionProduction(14, "fortified_area")

  var army = new Army(0,14)
  army.strength["infantry"] = 30
  army.strength["artillery"] = 10
  army.strength["cavalry"] = 20
  regions[14].armies = []
  regions[14].armies[2] = army
  drawArmy(14,2)

  regions[15] = new rSquare(4,9)
  regions[15].neighbors = [14,13,16,18]
  regions[15].player = 0
  changeRegionProduction(15, "university")
  regions[16] = new rSnakeDownLeft(3,12)
  regions[16].neighbors = [15,17,5]
  regions[16].player = 0
  changeRegionProduction(16, "light_industry")
  regions[17] = new rSnakeDownLeft(5,12)
  regions[17].neighbors = [16,18,21]
  regions[17].player = 0
  changeRegionProduction(17, "agriculture")
  regions[18] = new rSnakeRightUp(7,8)
  regions[18].neighbors = [15,17,13,12,20,21]
  regions[18].player = 0
  changeRegionProduction(18, "heavy_industry")

  var army = new Army(0,18)
  army.strength["infantry"] = 12
  army.strength["artillery"] = 4
  army.strength["cavalry"] = 3
  regions[18].armies = []
  regions[18].armies[2] = army
  drawArmy(18,2)
  var army = new Army(0,18)
  army.strength["infantry"] = 15
  army.strength["artillery"] = 8
  army.strength["cavalry"] = 6
  regions[18].armies[0] = army
  drawArmy(18,0)

  regions[19] = new rTLikeLeft(9,6)
  regions[19].neighbors = [11,12,20,23]
  regions[19].player = 1
  changeRegionProduction(19, "heavy_industry")
  regions[20] = new rSquare(8,8)
  regions[20].neighbors = [18,19,21,23]
  regions[20].player = 1
  changeRegionProduction(20, "university")

  var army = new Army(1,20)
  army.strength["infantry"] = 15
  army.strength["artillery"] = 7
  army.strength["cavalry"] = 5
  regions[20].armies = []
  regions[20].armies[1] = army
  drawArmy(20,1)

  regions[21] = new rTLikeRight(7,10)
  regions[21].neighbors = [18,20,17,22,23]
  regions[21].player = 1
  changeRegionProduction(21, "light_industry")
  regions[22] = new rTLikeLeft(9,11)
  regions[22].neighbors = [21,23]
  regions[22].player = 1
  changeRegionProduction(22, "agriculture")
  regions[23] = new rLineHorizontal(10,8)
  regions[23].neighbors = [19,20,21,22]
  regions[23].player = 1
  changeRegionProduction(23, "agriculture")
}
