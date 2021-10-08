// please don't change/add/remove anything
var gameCan = document.getElementById("gameCanvas"); 
var ctx = gameCan.getContext("2d");
var started = false;
var birb = {
    y: 400,
    fallSpd: -10,
    alive: true
}
class obstacle {
    constructor(x, y, tight) {
        this.x = x;
        this.y = y;
        this.tight = tight;
    }
}
var obstacles = new Array()
obstacles.push(new obstacle(0,400,200));
gameCan.addEventListener("click",canvasClick);
setInterval(update,20);
function canvasClick() {
    if (started){
        birb.fallSpd = -10;
    }else{
        started = true;
    }
    
}
function update() {
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.fillRect(0,0,gameCan.width,gameCan.height)
    ctx.fillStyle = "rgba(255,200,0,1)";
    ctx.beginPath();
    ctx.arc(gameCan.width/3,birb.y,20,0,Math.PI*2);
    ctx.fill();
    ctx.fillStyle = "rgba(0,255,0,1)";
    for (let i = 0;i<obstacles.length;i++){
        ctx.fillRect(gameCan.width-(obstacles[i].x+15),0,gameCan.width-(obstacles.x-15),obstacles[i].y+obstacles[i].tight/2)
        ctx.fillRect(gameCan.width-(obstacles[i].x+15),gameCan.height,gameCan.width-(obstacles.x-15),obstacles[i].y-obstacles[i].tight/2)
    }
    if (started){
        birb.y += birb.fallSpd;
        birb.fallSpd += 1;
        if (birb.fallSpd > 20){
            birb.fallSpd = 20
        }
        if (birb.y<60,birb.y>gameCan.width-60){
            birb.alive = false;
        }
        for (let i = 0;i<obstacles.length;i++){
            obstacles[i].x += 1
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
}