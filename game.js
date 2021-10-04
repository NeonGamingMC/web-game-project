var gameCan = document.getElementById("gameCanvas"); 
var ctx = gameCan.getContext("2d");
var started = false;
var birb = {
    y: 400,
    fallSpd: -10
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
    ctx.fillRect(0,0,1500,1000)
    ctx.strokeStyle = "rgba(0,0,0,1)";
    ctx.strokeRect(2,2,1496,796);
    if (started){
        birb.y += birb.fallSpd;
        birb.fallSpd += 1;
        if (birb.fallSpd > 20){
            birb.fallSpd = 20
        }
        ctx.fillStyle = "rgba(255,200,0,1)";
        ctx.beginPath();
        ctx.arc(400,birb.y,20,0,Math.PI*2);
        ctx.fill();
    }else{
        ctx.fillStyle = "rgba(0,0,0,0.25)"
        ctx.fillRect(200,200,1100,200)
    }
}