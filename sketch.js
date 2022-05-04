var s_standing_sprite, s_standing_image, s_shooting_image, s_shooting_sprite;
var BGsprite, BGimage;
var zsprite, zimage;
var bulletsprite, bulletimage;
var bulletGroup, zGroup;
var heart_1, heart_2, heart_3, heart_1image, heart_2image, heart_3image;
var life = 3;




function preload(){
s_standing_image = loadImage("soldier standing.png");
BGimage = loadImage ("BG.jpg");
zimage = loadImage ("z.png");
s_gun_image = loadImage("soldier.png");
bulletimage = loadImage("bu.png");
heart_1image = loadImage("heart_1.png");
    heart_2image = loadImage("heart_2.png");
    heart_3image = loadImage("heart_3.png");
}

function setup() {
createCanvas(windowWidth, windowHeight);


BGsprite = createSprite(displayWidth/1.4-80, displayHeight/1.6-40, 60, 10);
BGsprite.scale = 3.6
BGsprite.addImage(BGimage);




   s_standing_sprite = createSprite(300, 650);
   s_standing_sprite.scale = 0.4;
   s_standing_sprite.addImage(s_standing_image);
   s_standing_sprite.debug = true
   s_standing_sprite.setCollider("rectangle",0,0,300,300);

   heart_1  = createSprite(displayWidth-150,40,20,20);
   heart_1.addImage("heart_1.png",heart_1image);
   heart_1.scale = 0.4;

   heart_2 = createSprite(displayWidth-100,40,20,20);
   heart_2.addImage("heart_2.png",heart_2image);
    heart_2.scale = 0.4;

    heart_3 = createSprite(displayWidth-50,40,20,20);
    heart_3.addImage("heart_3.png",heart_3image);
    heart_3.scale = 0.4;

   

   bulletGroup = new Group();
   zGroup = new Group();

}

function draw() {

    if(life===3){
        heart_3.visible = true
        heart_1.visible = true
        heart_2.visible = true
      }
      if(life===2){
        heart_2.visible = true
        heart_1.visible = true
        heart_3.visible = false
      }
      if(life===1){
        heart_1.visible = true
        heart_3.visible = false
        heart_2.visible = false
      }
   
    

if(keyDown("UP_ARROW")) {

    s_standing_sprite.y -= 30;
}

if(keyDown("DOWN_ARROW")) {

    s_standing_sprite.y += 30;
}

if(keyWentDown("space")) {
    bulletsprite = createSprite(s_standing_sprite.x, s_standing_sprite.y-30, 20, 10);
    bulletsprite.velocityX = 20;
    bulletGroup.add(bulletsprite);
    bulletsprite.addImage(bulletimage);
    bulletsprite.scale = 0.2;
    s_standing_sprite.addImage(s_gun_image);
}



else if(keyWentUp("space")) {
    s_standing_sprite.addImage(s_standing_image);
}

if(zGroup.isTouching(bulletGroup)) {

    for(var i = 0; i < zGroup.length; i = i++)
     {
        if(zGroup[i].isTouching(bulletGroup)){
            zGroup[i].destroy();
        bulletGroup[i].destroy();
        }

    }
}



if(zGroup.isTouching(s_standing_image)){
 
  for(var i = 0; i < zGroup.length; i = i++){     
       
   if(zGroup[i].isTouching(s_standing_image)){
        zGroup[i].destroy()
       
       //life=life-1
        } 
  }
 }


    drawSprites();
    SpawnZombies();
}

   function SpawnZombies() {

  if(World.frameCount % 100 === 0) {
    zsprite = createSprite(windowWidth, windowHeight/2, 50, 75);
    zsprite.addImage(zimage);
    zsprite.scale = 0.1;
    zsprite.velocityX = -6;
    zsprite.y = Math.round(random(50, windowHeight-100));
    zsprite.lifetime = windowWidth/6;
    zGroup.add(zsprite);

}

   }





