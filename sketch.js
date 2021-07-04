var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var lastFed;
//create feed and lastFed variable here
var feed;
var fedTime;
var bg;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
bg = loadImage("bg.png");
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(670,280,200,150);
  dog.addImage(sadDog);
  dog.scale=0.25;

  //create feed the dog button here
  feed = createButton("Feed the Dog");
  feed.position(750,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(850,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(bg);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastFed = data.val();
  });
 
  //write code to display text lastFed time here
  if (lastFed>= 12){
    textSize(30);
    fill("black");
    text("last Fed:" + lastFed % 12 +"PM", 50,70);
  }
  else if (lastFed ===0){
    textSize(30);
    fill("black");
    text("last Fed : 12 AM" , 50,70);
  }
else{
  textSize(30);
  fill("black");
  text("last Fed :"+ lastFed + "AM" , 50,70);
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0)
  
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  }
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
 
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
  Food:foodS
  })
}

