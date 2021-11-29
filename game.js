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
var heartImg = new Image();
heartImg.onload = function () {
    imagesLoaded += 1
}
heartImg.src = 'assets/heart.png';
var gameCan = document.getElementById("gameCanvas")
var ctx = gameCan.getContext("2d")
var started = false;
var mouseDown = false;
var playerImg;
var player = {
    y: 400,
    fallSpd: 0,
    alive: true,
    lives: 3
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
for (let i = 0;i<500;i++){
    particles.push(new particle(Math.random()*gameCan.width, Math.random()*gameCan.height,-1+Math.random()*-4,0,0,0,"rgba(170,170,170,1)",5,5));
}
var obstacleCount = 0;
var gameOver = false;
obstacles.push(new obstacle(0,Math.random()*gameCan.width,50));
gameCan.addEventListener("mousedown",down);
gameCan.addEventListener("mouseup",up);
setInterval(update,20);
setInterval(spawnObstacle,1000);
function down() {
    if(!started){
        started = true;
    }else if (!player.alive&&!gameOver){
        player.alive = true;
        player.y = 400;
        player.fallSpd = 0;
        player.lives -= 1;
        obstacleCount = 0;
        for (var i = 0;obstacles.length>0;i++){
            obstacles.shift()
        }
    }
    mouseDown = true;
}
function up(){
    mouseDown = false;
}
function update() {
    if (imagesLoaded==3){
        if (player.alive){
            particles.push(new particle(gameCan.width, Math.random()*gameCan.height,-1+Math.random()*-4,0,0,0,"rgba(170,170,170,1)",5,5));
        }
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect(0,0,gameCan.width,gameCan.height)
        for (var i = 0;i<particles.length;i++){
            ctx.fillStyle = particles[i].color;
            ctx.fillRect(particles[i].x,particles[i].y,particles[i].sizex,particles[i].sizey);
            if (player.alive){
                particles[i].x += particles[i].dx;
                particles[i].y += particles[i].dy;
                particles[i].dx += particles[i].fx;
                particles[i].dy += particles[i].fy;
                if (particles[i].x>gameCan.width){
                    particles.shift();
                }
            }
        }
        if (player.alive){
            ctx.drawImage(playerImg,gameCan.width/3,player.y,40,40);
        }
        for (var i = 0;i<obstacles.length;i++){
            ctx.drawImage(obstacleImg,gameCan.width-obstacles[i].x-obstacles[i].size/2,obstacles[i].y-obstacles[i].size/2,obstacles[i].size,obstacles[i].size);
            if (obstacles[i].x>gameCan.width){
                obstacles.shift()
            }
            if(gameCan.width-obstacles[i].x+obstacles[i].size > gameCan.width/3 && gameCan.width-obstacles[i].x < gameCan.width/3+40 && obstacles[i].y > player.y && obstacles[i].y < player.y+40) {
                player.alive = false;
                onPlayerDeath()
            }
        }
        if (started && player.alive){
            player.y += player.fallSpd;
            player.fallSpd += 0.3;
            if (player.fallSpd > 14){
                player.fallSpd = 14;
            }
            if (player.y<0|player.y>gameCan.height){
                player.alive = false;
                onPlayerDeath()
            }
            for (let i = 0;i<obstacles.length;i++){
                obstacles[i].x += 5
            }
        }else if (!started&&player.alive&&!gameOver){
            ctx.fillStyle = "rgba(255,255,255,0.25)"
            ctx.fillRect(200,200,gameCan.width-400,200)
            ctx.fillStyle = "rgba(0,255,255,1)"
            ctx.font = "60px sans-serif"
            ctx.textAlign = "center"
            ctx.fillText("game title here",gameCan.width/2,300)
        }else if (started&&!player.alive&&!gameOver){
            ctx.fillStyle = "rgba(255,255,255,1)"
            ctx.font = "40px sans-serif"
            ctx.textAlign = "center"
            ctx.fillText("tap to try again",gameCan.width/2,gameCan.height/2)
        }else if (started&&!player.alive&&gameOver){
            ctx.fillStyle = "rgba(255,0,0,1)"
            ctx.font = "64px sans-serif"
            ctx.textAlign = "center"
            ctx.fillText("game over",gameCan.width/2,gameCan.height/2)
        }
        for (var i = 0; i<player.lives; i++){
            ctx.drawImage(heartImg,76*i+10,10);
        }
        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        ctx.strokeRect(2,2,gameCan.width-4,gameCan.height-4);
        if (started&mouseDown){
            player.fallSpd -= 0.6;
        }
    }
}
function spawnObstacle(){
    if (started&&player.alive){
        obstacles.push(new obstacle(0-(50+200*(obstacleCount/200)*2)/2,Math.random()*gameCan.width,50+200*(obstacleCount/200)));
        obstacleCount += 1;
    }
}
function onPlayerDeath(){
    if (player.lives<1){
        gameOver = true;
    }
}