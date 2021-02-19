var sea,seaImage;
var ship, shipImage;
var stone, stoneImage;
var boat1, boat2;
var boat1Image, boat2Image;
var treasure, treasureImage;
var gameOver, gameOverImage;

var stonesGroup, boats1Group, boats2Group, treasureGroup;

var score=0;
var GameState;
var PLAY, END;



function preload(){

    
    //loading Image for seaImage
    seaImage = loadImage("sea.jpg")

    //loading Image for shipImage
    shipImage = loadImage("ship.png")

    //loading Image for stoneImage
    stoneImage = loadImage("stone.png");

    //loading Image for boat Images
    boat1Image = loadImage("boat1.png");
    boat2Image = loadImage("boat2.png");

    //loading Image for treausreImage
    treasureImage = loadImage("treasure.png");

    //loading Image for gameOverImage
    gameOverImage = loadImage("gameOver.png");

}



function setup() {

    createCanvas(displayWidth-20, displayHeight-30);

    PLAY = 1;
    END = 0;
    GameState = PLAY;

    //create ship
    ship=createSprite(displayWidth/4-500,displayHeight/2-200);
    ship.addImage("ship",shipImage);
    ship.scale = 0.2;

    //create gameOver
    gameOver=createSprite(displayWidth/2-500,displayHeight/2-200);
    gameOver.addImage("gameOver",gameOverImage);

    //4 groups 
    stonesGroup=new Group();
    boats1Group=new Group();
    boats2Group=new Group();
    treasuresGroup=new Group();
 
}



function draw() {

    camera.position.x = ship.x/2;
    camera.position.y = displayHeight/2;
    
    //GAMESTATE PLAY...........................
    if(GameState === PLAY){
     
        background(seaImage);
        image(seaImage,0,-displayHeight*4,displayWidth*5,displayHeight);
        
        gameOver.visible=false;

        //calling 4 funcxtions
        boats1();
        boats2();
        stones();
        treasures();

        //KEY CODES............
        if (keyDown(UP_ARROW)){
            ship.y = ship.y - 4;
        }
    
        if (keyDown(DOWN_ARROW)){
            ship.y = ship.y + 4;
        }
 
        if (keyDown(LEFT_ARROW)){
            ship.x = ship.x - 4;
        }
   
        if (keyDown(RIGHT_ARROW)){
            ship.x = ship.x + 4;
        }

         //treasure wiil destroy  and score +2 if touched by ship
        if (ship.isTouching(treasuresGroup)) {
            treasuresGroup.destroyEach();
            score = score+ 2;
        }
      
        //2 group lifetime
        boats1Group.setLifetimeEach(800);
        boats2Group.setLifetimeEach(800);
        stonesGroup.setLifetimeEach(800);        
        treasuresGroup.setLifetimeEach(800);         
      
        //GameState will convert into END 
        if (boats1Group.isTouching(ship)){
            GameState=END;
        }
        else if (boats2Group.isTouching(ship)){
            GameState = END;
        }
        else if (stonesGroup.isTouching(ship)){
            GameState = END;
        }

    }

    //GAMESTATE END............................
    else if (GameState===END){

      boats1Group.setVelocityEach(0);
      boats2Group.setVelocityEach(0);
      stonesGroup.setVelocityEach(0);
      treasuresGroup.setVelocityXEach(0);
      boats1Group.destroyEach();
      boats2Group.destroyEach();
      stonesGroup.destroyEach();
      treasuresGroup.destroyEach();
      gameOver.visible=true;
    
    }

    drawSprites();

    textSize(40);
    fill("pink");
    stroke("pink")
    textFont("Bradley Hand ITC")
    text("Score : " + score, camera.position.x, camera.position.y);

}



//FUNCTION BOATS1...................
function boats1() {

    if (frameCount % 200 === 0) {
        //create boat1
        boat1=createSprite(camera.position.x+600,0);
        boat1.addImage("boat1",boat1Image);
        boat1.scale = 1.5;

        boat1.velocityX =  -(4 + 2 * score / 20);
        boat1.y = Math.round(random(0,300));
        
        boat1.setCollider("rectangle", 0, 0, 20,50);
        //boat1.debug=true;
        
        boats1Group.add(boat1);
        boats1Group.setLifetimeEach(0);
      
    }
    
  }
  


//FUNCTION BOATS2...................
function boats2() {

    if (frameCount % 300 === 0) {
        //create boat2
        boat2=createSprite(camera.position.x+600,0);
        boat2.addImage("boat2",boat2Image);
        boat2.scale = 1.5;

        boat2.velocityX = -(4 + 2 * score / 100);
        boat2.y = Math.round(random(300,600));
        
        boat2.setCollider("rectangle", 0, 0, 15,70);
        //boat2.debug=true;
        
        boats2Group.add(boat2);
        boats2Group.setLifetimeEach(0);
      
    }
    
  }
  
  
  //FUNCTION STONES................
  function stones() {
  
    if (frameCount % 100 === 0) {        
        //create stone
        stone = createSprite(camera.position.x+600,0);
        stone.addImage("stone",stoneImage);
        stone.scale = 0.2;

        stone.velocityX = -(4 + 2 * score / 50);
        stone.y = Math.round(random(0,600));
        
        stone.setCollider("rectangle", 0, 0, 10,20);
        //stone.debug=true;
        
        stonesGroup.add(stone);
        stonesGroup.setLifetimeEach(0);
        
    }
   
  }


   //FUNCTION TREASURES................
  function treasures() {
  
    if (frameCount % 100 === 0) {        
        //create treasure
        treasure = createSprite(camera.position.x+600,0);
        treasure.addImage("treasure",treasureImage);
        treasure.scale = 0.2;

        treasure.velocityX =  -(4 + 2 * score / 50);
        treasure.y = Math.round(random(0,600));
        
        treasure.setCollider("rectangle", 0, 0, 40,40);
        //treasure.debug=true;
        
        treasuresGroup.add(treasure);
        treasuresGroup.setLifetimeEach(0);
        
    }
   
  }

