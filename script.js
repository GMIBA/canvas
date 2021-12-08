let valchk;
let moveX;
let moveY;
let freedraw = false;
let straightdraw = false;
let squaredraw = false;
let circledraw = false;

let freePath;
let straightPath;
let squarePath;
let circlePath;

let freeDrawChk = false;
let straightDrawChk = false;
let squareDrawChk = false;
let circleDrawChk = false;


let pathSave = [];
let selArr = [];
let num = 1;
let textNum = 16;
let colorVal = 'black';
window.onload = function () {
    $(".radio input").click(function (e) {
        valchk = this.value;
    });
    event();

}

function foreachPath() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    pathSave.forEach(ele => {
        if (ele.path2d) {
            ctx.strokeStyle = ele.color;
            ctx.lineWidth = ele.pathwidth;
            ctx.stroke(ele.path2d);
        } else {
            ctx.font = ele.font;
            ctx.fillStyle = ele.color;
            ctx.fillText(ele.text, ele.x, ele.y);
        }
    });
}

function event() {
    $(document)

        .on("mousedown", "#canvas", function (e) {
            mousedown(e)
        })
        .on("mousemove", "#canvas", function (e) {
            mousemove(e)
        })
        .on("mouseup", "#canvas", function (e) {
            mouseup(e)
        })
        .on("mouseout", "#canvas", function (e) {
            mouseout(e)
        })
        .on("click", ".reset", clear)
        .on("click", ".del", deletePath)
        .on("change", ".design input:first-child", pathThick)
        // .on("change", ".design input:nth-child(2)", textNumber)
        .on("change", ".design select", colorSel)

}

function colorSel() {
    colorVal = this.value;
}

function pathThick() {
    num = parseInt(this.value);
    if (num === undefined) {
        num = 1;
    }


}

function deletePath() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    for (let i = 0; i < selArr.length; i++) {
        pathSave.splice(selArr[i], 1);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pathSave.forEach(ele => {
        ctx.lineWidth = ele.pathwidth;
        ctx.strokeStyle = ele.color;
        ctx.stroke(ele.path2d);
    })
    selArr = [];
}

function clear() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    pathSave = [];
    textPathSave = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function mousedown(e) {
    draw(e, valchk);
}

function mousemove(e) {
    drawing(e, valchk);
}

function mouseout(e) {
    drawEnd(e, valchk);
}

function mouseup(e) {
    drawEnd(e, valchk);
}

function draw(event, chk) {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    let x = event.offsetX;
    let y = event.offsetY;
    moveX = event.offsetX;
    moveY = event.offsetY;
    if (chk === "자유곡선") {
        ctx.lineWidth = num;
        ctx.strokeStyle = colorVal;
        freeDrawChk = true;
        freePath = new Path2D();
        ctx.beginPath();
        if (freeDrawChk) {
            freePath.moveTo(x, y);
            freedraw = true;
        }
    }
    if (chk === "직선") {
        straightDrawChk = true;
        straightPath = new Path2D();
        if (straightDrawChk) {
            straightPath.moveTo(moveX, moveY);
            straightdraw = true;
        }

    }
    if (chk === "사각형") {
        squareDrawChk = true;
        ctx.lineWidth = num;
        ctx.strokeStyle = colorVal;
        squarePath = new Path2D();
        if (squareDrawChk) {
            squarePath.moveTo(moveX, moveY);
            squaredraw = true;
        }
    }
    if (chk === "원") {
        circleDrawChk = true;
        ctx.lineWidth = num;
        ctx.strokeStyle = colorVal;
        circlePath = new Path2D();
        if (circleDrawChk) {
            circlePath.moveTo(moveX, moveY);
            circledraw = true;
        }
    }
}

function drawing(event, chk) {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    let x = event.offsetX;
    let y = event.offsetY;
    moveX = event.offsetX;
    moveY = event.offsetY;
    if (chk === "자유곡선") {
        ctx.beginPath();
        ctx.lineWidth = num;
        ctx.strokeStyle = colorVal;
        if (!freedraw) {
            return;
        }
        if (freeDrawChk) {
            freePath.lineTo(x, y);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }
    if (chk === "직선") {
        straightPath = new Path2D();
        straightPath.moveTo(moveX, moveY);
        ctx.lineWidth = num;
        ctx.strokeStyle = colorVal;
        if (!straightdraw) {
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if (straightDrawChk) {
            ctx.beginPath()
            ctx.moveTo(moveX, moveY);
            straightPath.moveTo(moveX, moveY);
            ctx.lineTo(x, y);
            straightPath.lineTo(x, y);
            ctx.stroke();
            foreachPath();
        }
    }
    if (chk === "사각형") {
        squarePath = new Path2D();
        ctx.lineWidth = num;
        ctx.strokeStyle = colorVal;
        if (!squaredraw) {
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (squareDrawChk) {
            ctx.beginPath()
            ctx.rect(moveX, moveY, x - moveX, y - moveY);
            squarePath.rect(moveX, moveY, x - moveX, y - moveY);
            ctx.stroke();
            foreachPath();
        }
    }
    if (chk === "원") {
        circlePath = new Path2D();
        ctx.lineWidth = num;
        ctx.strokeStyle = colorVal;
        if (!circledraw) {
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (circleDrawChk) {
            let r2 = Math.pow(y - moveY, 2) + Math.pow(x - moveX, 2);
            let r = Math.sqrt(r2);
            ctx.beginPath()
            ctx.arc(moveX, moveY, r, 0, 2 * Math.PI);
            circlePath.arc(moveX, moveY, r, 0, 2 * Math.PI);
            ctx.stroke();
            foreachPath();
        }
    }
}

function drawEnd(event, chk) {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    let x = event.offsetX;
    let y = event.offsetY;
    if (chk === "자유곡선") {
        ctx.lineWidth = num;
        ctx.strokeStyle = colorVal;
        if (freedraw === true) {
            pathSave.push({'path2d': freePath, 'pathwidth': num, 'color': colorVal});
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'black';
            freedraw = false;
        }
    }
    if (chk === "직선") {
        straightPath.lineTo(x, y);
        if (straightdraw === true) {
            pathSave.push({'path2d': straightPath, 'pathwidth': num, 'color': colorVal});
            foreachPath();

        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        straightdraw = false;
    }
    if (chk === "사각형") {
        if (squaredraw === true) {
            pathSave.push({'path2d': squarePath, 'pathwidth': num, 'color': colorVal});
            foreachPath();
        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';

        squaredraw = false;
    }
    if (chk === "원") {
        if (circledraw === true) {
            pathSave.push({'path2d': circlePath, 'pathwidth': num, 'color': colorVal});
            foreachPath();

        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        circledraw = false;
    }
}