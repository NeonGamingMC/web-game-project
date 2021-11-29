// please don't change/add/remove anything
var imagesLoaded = 0;
var obstacleImg = new Image();
obstacleImg.onload = function () {
    imagesLoaded += 1
}
obstacleImg.src = 'assets/obstacle.png';
var playerImg = new Image();
playerImg.onload = function () {
    imagesLoaded += 1
}
playerImg.src = 'assets/player.png';
var gameCan = document.getElementById("gameCanvas")
var ctx = gameCan.getContext("2d")
var started = false;
var mouseDown = false;
var playerImg;
var player = {
    y: 400,
    fallSpd: 0,
    alive: true
}
class obstacle {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
}
class particle{
    constructor(x,y,dx,dy,fx,fy,color,sizex,sizey,lifespan){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.fx = fx;
        this.fy = fy;
        this.color = color;
        this.sizex = sizex;
        this.sizey = sizey;
    }
}
var obstacles = new Array();
var particles = new Array();
for (let i = 0;i<333;i++){
    particles.push(new particle(Math.random()*gameCan.width, Math.random()*gameCan.height,-1+Math.random()*-4,0,0,0,"rgba(170,170,170,1)",5,5));
}
var obstacleCount = 0;
obstacles.push(new obstacle(0,Math.random()*gameCan.width,50));
gameCan.addEventListener("mousedown",down);
gameCan.addEventListener("mouseup",up);
setInterval(update,20);
setInterval(spawnObstacle,1000);
function down() {
    if(!started){
        started = true;
    }else if (!player.alive){
        player.alive = true;
        player.y = 400;
        player.fallSpd = 0;
        obstacleCount = 0;
        obstacles.forEach(function (item,index,array){
            array.pop()
        })
        obstacles.push(new obstacle(0-(50+200*(obstacleCount/200)*2)/2,Math.random()*gameCan.width,50+200*(obstacleCount/200)));
    }
    mouseDown = true;
}
function up(){
    mouseDown = false;
}
function update() {
    if (imagesLoaded==2){
        particles.push(new particle(gameCan.width, Math.random()*gameCan.height,-1+Math.random()*-4,0,0,0,"rgba(170,170,170,1)",5,5));
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect(0,0,gameCan.width,gameCan.height)
        particles.forEach(function (item,index,array){
            ctx.fillStyle = item.color;
            ctx.fillRect(item.x,item.y,item.sizex,item.sizey);
            item.x += item.dx;
            item.y += item.dy;
            item.dx += item.fx;
            item.dy += item.fy;
            if (item.x>gameCan.width){
                array.shift();
            }
        })
        if (player.alive){
            ctx.drawImage(playerImg,gameCan.width/3,player.y,40,40);
        }
        obstacles.forEach(function (item,index,array){
            ctx.drawImage(obstacleImg,gameCan.width-item.x-item.size/2,item.y-item.size/2,item.size,item.size);
            if (item.x>gameCan.width){
                array.shift()
            }
            //if(item.x > gameCan.width/3 && x < gameCan.width/3+40 && item.y > player.y && item.y < player.y+40) {
            //    player.alive = false;
            //    obstacleCount = 0;
            //    array.forEach(function (item,index,array){
            //        array.shift()
            //    })
            //}
        })
        if (started && player.alive){
            player.y += player.fallSpd;
            player.fallSpd += 0.3;
            if (player.fallSpd > 14){
                player.fallSpd = 14;
            }
            if (player.y<0|player.y>gameCan.height){
                player.alive = false;
            }
            for (let i = 0;i<obstacles.length;i++){
                obstacles[i].x += 5
            }
        }else if (!started&&player.alive){
            ctx.fillStyle = "rgba(255,255,255,0.25)"
            ctx.fillRect(200,200,gameCan.width-400,200)
            ctx.fillStyle = "rgba(0,255,255,1)"
            ctx.font = "60px sans-serif"
            ctx.textAlign = "center"
            ctx.fillText("game title here",gameCan.width/2,300)
        }else if (started&&!player.alive){
            ctx.fillStyle = "rgba(255,0,0,1)"
            ctx.font = "60px sans-serif"
            ctx.textAlign = "center"
            ctx.fillText("tap try again",gameCan.width/2,gameCan.height/2)
        }
        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        ctx.strokeRect(2,2,gameCan.width-4,gameCan.height-4);
        if (started&mouseDown){
            player.fallSpd -= 0.6
        }
    }
}
function spawnObstacle(){
    if (started&&player.alive){
        obstacles.push(new obstacle(0-(50+200*(obstacleCount/200)*2)/2,Math.random()*gameCan.width,50+200*(obstacleCount/200)));
        obstacleCount += 1;
    }
}