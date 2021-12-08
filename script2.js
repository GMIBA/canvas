
let freedraw = false;
let straightDrawChk = false;
let freeDrawChk = false;
let straightdraw = false;
let moveX;
let moveY;
let clearChk = false;
let pathSave = [];
window.onload = function () {
    let chk = false;
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');

    event();
}
function event() {
    $(document)
        .on("mousedown", "#canvas", freeDrawStart(e))
        .on("mouseup", "#canvas", freeDrawEnd(e))
        .on("mousemove", "#canvas", freeDraw(e))
        .on("mouseout", "#canvas", freeDrawOut(e))

}
function clear() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    clearChk = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function play() {
    let val = this.value;
    if (val === "자유곡선") {
        freeDrawChk = true;
        freeDraw();
        straightDrawChk = false;
    }
    else if (val === "직선") {
        straightDrawChk = true;
        straightDraw();

        freeDrawChk = false;

    }
    else if (val === "사각형") {
        freeDrawChk = false;
        straightDrawChk = false;

    }
    else if (val === "원") {
        freeDrawChk = false;
        straightDrawChk = false;
    }

}
function freeDraw(chk) {
    let freePath = new Path2D();
    function freeDrawEnd(event) {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');
        if (freeDrawChk === true) {
            freedraw = false;
            pathSave.free.push(freePath);
            ctx.beginPath();

        }
        canvas.removeEventListener("mouseup", freeDrawEnd);

    }

    function freeDrawOut(event) {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');
        if (freeDrawChk === true) {
            freedraw = false;
            ctx.beginPath();
            pathSave.free.push(freePath);
        }
        canvas.removeEventListener("mouseout", freeDrawOut);
    }

    function freeDrawStart(event) {
        console.log("z");
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');
        let freex = event.offsetX;
        let freey = event.offsetY;
        if (freeDrawChk === true) {
            ctx.beginPath();
            ctx.moveTo(freex, freey);
            freePath.moveTo(freex, freey);
            freedraw = true;
        }
        canvas.removeEventListener("mousedown", freeDrawStart);

    }

    function freeDrawing(event) {

        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');
        let freex = event.offsetX;
        let freey = event.offsetY;
        if (!freedraw) {
            return;
        }
        if (freeDrawChk == true) {
            freePath.lineTo(freex, freey);
            ctx.lineTo(freex, freey);
            ctx.stroke();

        }
        canvas.removeEventListener("mousemove", freeDrawing);

    }

    function line(x, y) {
        moveTo(x, y);
    }
}


function straightDraw() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    let straightPath = new Path2D();

    canvas.addEventListener("mousedown", straightDrawStart(e), false) // 마우스가 눌러질 때
    canvas.addEventListener("mouseup", straightDrawEnd(e), false) // 눌러진 마우스가 놓여질 때
    canvas.addEventListener("mousemove", straightDrawing(e), false) // 마우스를 움직이는 동안
    canvas.addEventListener("mouseout", straightDrawOut(e), false) // 마우스가 캔버스 영역을 벗어나는 경우
    function straightDrawStart(event) {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');
        moveX = event.offsetX;
        moveY = event.offsetY;
        if (straightDrawChk === true) {
            ctx.moveTo(moveX, moveY);
            straightPath.moveTo(moveX, moveY);
            straightdraw = true;
        }
        canvas.removeEventListener("mousedown", straightDrawStart);

    }

    function straightDrawing(event) {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');
        let x = event.offsetX;
        let y = event.offsetY;
        if (!straightdraw) {
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (straightDrawChk == true) {
            ctx.moveTo(moveX, moveY);
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.stroke(straightPath)

            ctx.beginPath();
        }
        for (let j = 0; j < pathSave.free.length; j++) {
            // ctx.beginPath();
            ctx.stroke(pathSave.free[j]);
            ctx.beginPath(pathSave.free[j]);
        }
        for (let i = 0; i < pathSave.straight.length; i++) {
            // ctx.beginPath();
            ctx.stroke(pathSave.straight[i]);
        }
        canvas.removeEventListener("mousemove", straightDrawing);
    }

    function straightDrawEnd(event) {
        let x = event.offsetX;
        let y = event.offsetY;
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');
        straightPath.lineTo(x, y);
        straightdraw = false;
        if (straightDrawChk === true) {
            pathSave.straight.push(straightPath);

        }
        canvas.removeEventListener("mouseup", straightDrawEnd);
    }

    function straightDrawOut(event) {
        let x = event.offsetX;
        let y = event.offsetY;
        straightPath.lineTo(x, y);
        straightdraw = false;
        if (straightDrawChk === true) {
        }
        canvas.removeEventListener("mousedown", straightDrawOut);

    }

}
