var path,pathImg;
var distance = 0;
var mainRacer,mainRacerImg1,mainRacerImg2;
var pinkRacer,pinkRacerImg1,pinkRacerImg2,pinkRacerGroup;
var redRacer,redRacerImg1,redRacerImg2,redRacerGroup;
var yellowRacer,yellowRacerImg1,yellowRacerImg2,yellowRacerGroup;
var obstacle,obstacle1Img,obstacle2Img,obstacle3Img,obstaclesGroup;

var bellSound;

var END =0;
var PLAY =1;
var gameState = PLAY;

var gameOver,gameOverImg;

var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  gameOverImg = loadImage("images/gameOver.png");
  
  obstacle1Img = loadImage("images/obstacle1.png");
  obstacle2Img = loadImage("images/obstacle2.png");
  obstacle3Img = loadImage("images/obstacle3.png");
  
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2 = loadAnimation("images/mainPlayer3.png");
  
  pinkRacerImg1 = loadAnimation("images/opponent1.png","images/opponent2.png");
  pinkRacerImg2 = loadAnimation("images/opponent3.png");
  
  redRacerImg1 = loadAnimation("images/opponent4.png","images/opponent5.png");
  redRacerImg2 = loadAnimation("images/opponent6.png");
  
  yellowRacerImg1 = loadAnimation("images/opponent7.png","images/opponent8.png");
  yellowRacerImg2 = loadAnimation("images/opponent9.png");
  
  bellSound = loadSound("sound/bell.mp3");
}

function setup(){
  
createCanvas(1000,300);
  
  // Moving background
  path = createSprite(100,150);
  path.addImage(pathImg);
  path.velocityX = -(5 + 2 * distance/150);

  //creating boy running
  mainRacer  = createSprite(70,150,20,20);
  mainRacer.addAnimation("SahilRunning",mainRacerImg1);
  mainRacer.addAnimation("mainRacer",mainRacerImg2);
  mainRacer.scale=0.07;

  distance = 0;

  //new groups
  pinkRacerGroup = new Group();
  redRacerGroup = new Group();
  yellowRacerGroup = new Group();
  obstaclesGroup = new Group();

  gameOver = createSprite(500,140,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
 
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,850,30);
  
  if(gameState===PLAY){
     
    gameOver.visible = false;
    
    //code to count distance
    distance = distance + Math.round(getFrameRate()/50);
  
    mainRacer.y = World.mouseY;
    
    //if space is pressed the bell sound is played
    if(keyDown("space")){
      bellSound.play();
    }

   edges= createEdgeSprites();
   mainRacer.collide(edges);                          
  
    //code to reset the background
    if(path.x < 0 ){
      path.x = width/2;
    }
    
      var rand = Math.round(random(1,3));
      if(frameCount%150 === 0){
        if(rand === 1){
          pinkOpponent();
        }else if(rand === 2){
          redOpponent();
        }else if(rand === 3){
          yellowOpponent();
        }
      }
    
    if(frameCount%90 === 0){
      obstacles();
    }
            
      if(mainRacer.isTouching(pinkRacerGroup)){
        gameState = END;
        mainRacer.changeAnimation("mainRacer",mainRacerImg2);
        pinkRacer.changeAnimation("pink",pinkRacerImg2);
      } 
      if(mainRacer.isTouching(redRacerGroup)){
        gameState = END;
        mainRacer.changeAnimation("mainRacer",mainRacerImg2);
        redRacer.changeAnimation("red",redRacerImg2);
      }
      if(mainRacer.isTouching(yellowRacerGroup)){
        gameState = END;
        mainRacer.changeAnimation("mainRacer",mainRacerImg2);
        yellowRacer.changeAnimation("yellow",yellowRacerImg2);
      }
      if(mainRacer.isTouching(obstaclesGroup)){
        gameState = END;
        mainRacer.changeAnimation("mainRacer",mainRacerImg2);
      }
    }else if(gameState === END){
      fill("white");
      textSize(20);
      text("press up arrow to restart the game",350,180);

      //velocity 
      path.velocityX = 0;
      obstaclesGroup.setVelocityXEach(0);
      pinkRacerGroup.setVelocityXEach(0);
      redRacerGroup.setVelocityXEach(0);
      yellowRacerGroup.setVelocityXEach(0);
      
      //lifetime
      obstaclesGroup.setLifetimeEach(-1);
      pinkRacerGroup.setLifetimeEach(-1);
      redRacerGroup.setLifetimeEach(-1);
      yellowRacerGroup.setLifetimeEach(-1);
      
      gameOver.visible = true;
      
      //if up key is pressed then game should reset
      if (keyDown("UP_ARROW")){
          reset();
      }
    } 
  }

function reset(){
  gameState = PLAY;
  
  path.velocityX = -(5 + 2 * distance/150);
  pinkRacerGroup.destroyEach();
  redRacerGroup.destroyEach();
  yellowRacerGroup.destroyEach();
  obstaclesGroup.destroyEach();
  
  mainRacer.changeAnimation("SahilRunning",mainRacerImg1);
  
  distance = 0;
  
  if(mainRacer.isTouching(pinkRacerGroup)){
    gameState = END;
    mainRacer.changeAnimation("mainRacer",mainRacerImg2);
    pinkRacer.changeAnimation("pink",pinkRacerImg2);
  } 
  if(mainRacer.isTouching(redRacerGroup)){
    gameState = END;
    mainRacer.changeAnimation("mainRacer",mainRacerImg2);
    redRacer.changeAnimation("red",redRacerImg2);
  }
  if(mainRacer.isTouching(yellowRacerGroup)){
    gameState = END;
    mainRacer.changeAnimation("mainRacer",mainRacerImg2);
    yellowRacer.changeAnimation("yellow",yellowRacerImg2);
  }
  if(mainRacer.isTouching(obstaclesGroup)){
    gameState = END;
    mainRacer.changeAnimation("mainRacer",mainRacerImg2);
  }
}

function pinkOpponent(){
  pinkRacer = createSprite(1100,Math.round(random(50,250)),10,10);
  pinkRacer.addAnimation("pinkRacer",pinkRacerImg1);
  pinkRacer.addAnimation("pink",pinkRacerImg2);
  pinkRacer.scale = 0.08;
  pinkRacer.velocityX = -(5 + 2 * distance/150);
  pinkRacer.lifetime = 500;
  pinkRacerGroup.add(pinkRacer);
}

function redOpponent(){
  redRacer = createSprite(1100,Math.round(random(50,250)),10,10);
  redRacer.addAnimation("redRacer",redRacerImg1);
  redRacer.addAnimation("red",redRacerImg2);
  redRacer.scale = 0.08;
  redRacer.velocityX = -(5 + 2 * distance/150);
  redRacer.lifetime = 500;
  redRacerGroup.add(redRacer);
}

function yellowOpponent(){
  yellowRacer = createSprite(1100,Math.round(random(50,250)),10,10);
  yellowRacer.addAnimation("yellowRacer",yellowRacerImg1);
  yellowRacer.addAnimation("yellow",yellowRacerImg2);
  yellowRacer.scale = 0.08;
  yellowRacer.velocityX = -(5 + 2 * distance/150);
  yellowRacer.lifetime = 500;
  yellowRacerGroup.add(yellowRacer);
}

function obstacles(){
  obstacle = createSprite(1100,Math.round(random(50,250)));
  obstacle.velocityX = -(5 + 2 * distance/150);
  obstacle.lifetime = 500;
  obstacle.scale = 0.1;
  obstaclesGroup.add(obstacle);
  
  var ran = Math.round(random(1,3));
  switch(ran){
    case 1: obstacle.addImage(obstacle1Img);
            break;
    case 2: obstacle.addImage(obstacle2Img);
            break;
    case 3: obstacle.addImage(obstacle3Img);
            break;       
    default: break;
  }
}