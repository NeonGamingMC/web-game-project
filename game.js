// please don't change/add/remove anything
var gameCan = document.getElementById("gameCanvas"); 
var ctx = gameCan.getContext("2d");
var started = false;
var mouseDown = false;
var birb = {
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
var obstacles = new Array()
var obstacleCount = 0;
obstacles.push(new obstacle(0,Math.random()*gameCan.width,50));
gameCan.addEventListener("mousedown",down);
gameCan.addEventListener("mouseup",up);
setInterval(update,20);
setInterval(spawnObstacle,1000);
function down() {
    if(!started){
        started = true;
    }
    mouseDown = true;
}
function up(){
    mouseDown = false;
}
function update() {
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.fillRect(0,0,gameCan.width,gameCan.height)
    ctx.fillStyle = "rgba(255,200,0,1)";
    ctx.beginPath();
    ctx.arc(gameCan.width/3,birb.y,20,0,Math.PI*2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,0,0,1)";
    obstacles.forEach(function (item,index,array){
        ctx.fillRect(gameCan.width-item.x-item.size/2,item.y-item.size/2,item.size,item.size);
        if (item.x>gameCan.width){
            array.shift()
        }
    })
    if (started){
        birb.y += birb.fallSpd;
        birb.fallSpd += 0.3;
        if (birb.fallSpd > 14){
            birb.fallSpd = 14
        }
        if (birb.y<60,birb.y>gameCan.width-60){
            birb.alive = false;
        }
        for (let i = 0;i<obstacles.length;i++){
            obstacles[i].x += 5
        }
    }else{
        ctx.fillStyle = "rgba(0,0,0,0.25)"
        ctx.fillRect(200,200,gameCan.width-400,200)
        ctx.fillStyle = "rgba(255,200,0,1)"
        ctx.font = "60px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText("flying birb",gameCan.width/2,300)
    }
    ctx.strokeStyle = "rgba(0,0,0,1)";
    ctx.strokeRect(2,2,gameCan.width-4,gameCan.height-4);
    if (started&mouseDown){
        birb.fallSpd -= 0.6
    }
}
function spawnObstacle(){
    if (started){
        obstacles.push(new obstacle(0-(50+obstacleCount*2)/2,Math.random()*gameCan.width,50+obstacleCount*2));
        obstacleCount += 1;
    }
}