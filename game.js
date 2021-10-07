var gameCan = document.getElementById("gameCanvas"); 
var ctx = gameCan.getContext("2d");
var started = false;
var birb = {
    y: 400,
    fallSpd: -10,
    alive: true
}
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
    ctx.fillRect(0,0,gameCan.width,gameCan.height)
    if (started){
        birb.y += birb.fallSpd;
        birb.fallSpd += 1;
        if (birb.fallSpd > 20){
            birb.fallSpd = 20
        }
        if (birb.y<60) or (birb.y>gameCan.width-60);{
            birb.alive = false;
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