var balloon, database;
var position;

function preload(){
  balloonImage1= loadAnimation("images/Hot Air Ballon-01.png")
  balloonImage2=loadAnimation("images/Hot Air Ballon-02.png","images/Hot Air Ballon-03.png","images/Hot Air Ballon-04.png")
}

function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(1000,1000);

  ground=createSprite(100,100,500,500);
  ground.addAnimation("ground",balloonImage1);
  ground.scale=0.8

  balloon = createSprite(250,250,10,10);
  balloon.addAnimation("balloon",balloonImage2)
  balloon.shapeColor = "red";
  balloon.scale=0.5

  

  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value", readPosition, showError);
}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      balloon.addAnimation("balloon",balloonImage2)
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      balloon.addAnimation("balloon",balloonImage2)
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      balloon.addAnimation("balloon",balloonImage2)
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      balloon.addAnimation("balloon",balloonImage2)
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref('balloon/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}