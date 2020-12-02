//Create variables here
var dog,happyDog,database,foodS,foodStock;
var dogImg,happyDogImg;
var addFood,feedPet;
var fedTime, lastFed;
var foodObj;

function preload()
{
  dogImg = loadImage("images/dogImg1.png");
  happyDogImg = loadImage("images/dogImg.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();

  foodObj = new Food();

  var foodStock = database.ref("Food");
  foodStock.on("value",readStock,showerror);

  var feedTime = database.ref("FeedTime");
  feedTime.on("value",function(data){
    lastFed = data.val();
  })

  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15

  

  feedPet = createButton("Feed the pet");
  feedPet.position(500,95);
  feedPet.mousePressed(feedDog);

  addFood = createButton("Add food ");
  addFood.position(600,95);
  addFood.mousePressed(addFood);

 }


function draw() {  
  background(46,139,87);
  foodObj.display();
  drawSprites();
  fill("black");
  text("Food Stock Remaining:"+foodS,170,200);
  text("Press UP ARROW to feed Drago milk",250,10,)
}



function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:getFoodStock(),
    FeedTime:Hour()
  })
}

function addFood(){
  alert(foodS)
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodStock);
}

function showerror(){
  console.log("error");
}



