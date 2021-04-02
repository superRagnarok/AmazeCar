var PLAY=1;
var END=0;
var gameState=PLAY;
var road,roadImage;
var user,userImage;
var cars,carsImage;
var redCar,police,ambulance,truck,taxi;
var carGroup;
var reset,resetImage;
var distance=0;
var wall1,wall2;
function preload(){
roadImage = loadImage("road.png");
userImage = loadImage("userCarr.png");
redCar = loadImage("red.png");
police = loadImage("police.png");
ambulance = loadImage("ambulance11.png");
truck = loadImage("truck.png");
taxi = loadImage("taxi.png"); 
resetImage = loadImage("reset.png");  
}

function setup() {
createCanvas(1000,800);
road = createSprite(500,230,1000,800);
road.addImage(roadImage);
road.scale=1.7;
  
user = createSprite(500,400,40,40); 
user.addImage(userImage);
user.scale=0.3;
  
reset = createSprite(500,425,40,40);
reset.addImage(resetImage);
reset.scale=0.35;
reset.visible=false;
distance=0;  
carGroup = new Group();  
  
  wall1 = createSprite(80,400,20,800);
  wall2 = createSprite(920,400,20,800);
  wall1.visible=false;
  wall2.visible=false;
  
}

function draw() {
background("black");
if (road.y>330){
  road.y=300;
}
  
if (gameState===PLAY){
 distance = distance + Math.round(getFrameRate()/60);
  road.velocityY=(5+2*distance/60); 
 if (keyDown(LEFT_ARROW)){
 user.x=user.x-10; 
}
if (keyDown(RIGHT_ARROW)){
 user.x=user.x+10; 
} 

  car();
}
if  (carGroup.isTouching(user)){
  gameState=0;
  carGroup.collide(user);
  cars.velocityY=0;
} 
if (gameState===END){

cars.lifetime=-1;
road.velocityY=0;
cars.velocityY=0;
reset.visible=true;  
} 
if (mousePressedOver(reset)){
  restart();
}  
drawSprites();
fill("white");
stroke(0);  
textSize(25);  
text("DISTANCE(metres) : "+ distance,25,30);
  if (gameState===END){
fill("red");
stroke(255);  
textSize(80);
text("GAME OVER",300,250);  
}  
  user.collide(wall1);
  user.collide(wall2);
}
function restart(){
  gameState=1;
  reset.visible=false;
  carGroup.destroyEach();
  distance=0;
  user.x=500;
}
function car(){
if (frameCount%60===0){
  cars = createSprite(300,-80,40,40);
  cars.velocityY=(5+3*distance/60);
  cars.scale=0.33;
  cars.lifetime=200;
  cars.x=Math.round(random(120,880));
  r = Math.round(random(1,5));
  if (r == 1){
    cars.addImage(ambulance);
  } else if (r == 2){
    cars.addImage(taxi);
  } else if (r == 3){
    cars.addImage(police);
  } else if (r == 4){
    cars.addImage(redCar);
  } else {
    cars.addImage(truck);
  }
  carGroup.add(cars);
  
} 
}