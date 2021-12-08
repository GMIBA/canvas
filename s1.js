let valchk;
let moveX;
let moveY;

let freedraw = false;
let freeDrawChk = false;
let freePath;

let straightdraw = false;
let straightDrawChk = false;
let straightPath;

let squaredraw = false;
let squareDrawChk = false;
let squarePath;

let circledraw = false;
let circleDrawChk = false;
let circlePath;
let textPath;
let textFont = ' serif';
let selSave = [];
let pathSave = [];
let selArr = [];
let xoSelArr = [];
let num = 1;
let textNum = 16;
let colorVal = 'black';
window.onload = function () {
    $(".radio input").click(function (e) {
        valchk = this.value;
    });
    event();

}

function foreach() {
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
        .on("change", ".design input:nth-child(2)", textNumber)
        .on("change", ".design select", colorSel)
        .on("click",".download button",imgDownload)

}
function imgDownload(){
    const canvas = document.getElementById("canvas");
    const  ctx = canvas.getContext('2d');
    let canvasImg = canvas.toDataURL();
    let link = $(".download a");
    link.attr("href",canvasImg);
    console.log(link.href);
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

function textNumber() {
    textNum = this.value;
}

function deletePath() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // let set = new Set(selArr);
    // selArr = [...set];
    pathSave.forEach(function (ele,index){
        for (let i = 0; i < selArr.length;i++){
            if (ele === selArr[i]){
                pathSave.splice(index,1);
            }
        }
    })
    foreach();
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
    if (valchk == "선택") {
        freeDrawChk = false;
        straightDrawChk = true;
        Chk = false;
        freeDrawChk = false;
        sel(e);
    }
    if (valchk == "자유곡선") {
        freeDrawChk = true;
        freeDraw(e, "mousedown");
    }
    if (valchk == "직선") {
        straightDrawChk = true;
        straightDraw(e, "mousedown");
    }
    if (valchk == "사각형") {
        squareDrawChk = true;
        squareDraw(e, "mousedown");
    }
    if (valchk == "원") {
        circleDrawChk = true;
        circleDraw(e, "mousedown");
    }
    if (valchk == "문자") {
        textDraw(e);
    }
}

function textDraw(event) {
    textPath = new Path2D();
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    let x = event.offsetX;
    let y = event.offsetY;
    let text = prompt('text');
    if (text === null) {
        return;
    }
    let fontPx = textNum + "px";
    let resText = fontPx + textFont;
    console.log(resText);
    ctx.font = resText;
    ctx.fillStyle = colorVal;
    ctx.fillText(text, x, y);
    pathSave.push({'text': text, 'x': x, 'y': y, 'font': resText, 'color': colorVal});
}

function sel(event) {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    let item = [];
    for (let i = 0; i < pathSave.length; i++) {
        if (ctx.isPointInStroke(pathSave[i].path2d, event.offsetX, event.offsetY)) {
            item = pathSave.splice(i, 1);
            pathSave.push(item[0]);
            selArr.push(item[0]);
            foreach();
        }
    }
}

function selApply() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    let item;
    for (let i = 0; i < selArr.length; i++) {
        item = pathSave[selArr[i]];
        path = pathSave.splice(selArr[i], 1);
        pathSave.push(item);
    }
    console.log(pathSave);

}

function mousemove(e) {
    if (valchk == "자유곡선") {
        freeDrawChk = true;
        freeDraw(e, "mousemove");
    }
    if (valchk == "직선") {
        straightDrawChk = true;
        straightDraw(e, "mousemove");
    }
    if (valchk == "사각형") {
        squareDrawChk = true;
        squareDraw(e, "mousemove");
    }
    if (valchk == "원") {
        circleDrawChk = true;
        circleDraw(e, "mousemove");
    }


}

function mouseup(e) {
    if (valchk == "자유곡선") {
        freeDraw(e, "mouseup");
    }
    if (valchk == "직선") {
        straightDrawChk = true;
        straightDraw(e, "mouseup");
    }
    if (valchk == "사각형") {
        squareDrawChk = true;
        squareDraw(e, "mouseup");
    }
    if (valchk == "원") {
        circleDrawChk = true;
        circleDraw(e, "mouseup");
    }

    // if (valchk == "선택") {
    //     sel(e);
    // }
}

function mouseout(e) {
    if (valchk == "자유곡선") {
        freeDraw(e, "mouseup");
    }
    if (valchk == "직선") {
        straightDrawChk = true;
        straightDraw(e, "mouseout");
    }
    if (valchk == "사각형") {
        squareDrawChk = true;
        squareDraw(e, "mouseout");
    }
    if (valchk == "원") {
        circleDrawChk = true;
        circleDraw(e, "mouseout");
    }
}


function freeDraw(e, chk) {
    if (chk === "mousedown") {
        freeDrawStart(e);
    } else if (chk === "mousemove") {
        freeDrawing(e)
    } else if (chk === "mouseup" || chk === "mouseout") {
        freeDrawEnd(e)
    }

    function freeDrawStart(event) {
        freePath = new Path2D();
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');
        let freex = event.offsetX;
        let freey = event.offsetY;
        ctx.lineWidth = num;
        ctx.strokeStyle = colorVal;
        console.log(pathSave);
        if (freeDrawChk === true) {
            ctx.beginPath();
            freePath.moveTo(freex, freey);
            freedraw = true;
        }

    }

    function freeDrawing(event) {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');
        let freex = event.offsetX;
        let freey = event.offsetY;
        ctx.lineWidth = num;
        ctx.strokeStyle = colorVal;
        if (!freedraw) {
            return;
        }
        if (freeDrawChk == true) {
            freePath.lineTo(freex, freey);
            ctx.lineTo(freex, freey);
            ctx.stroke();

        }
    }

    function freeDrawEnd(event) {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');
        ctx.lineWidth = num;
        ctx.strokeStyle = colorVal;
        if (freeDrawChk === true && freedraw === true) {
            pathSave.push({'path2d': freePath, 'pathwidth': num, 'color': colorVal});
            ctx.beginPath();
        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        freedraw = false;
    }
}


function straightDraw(e, chk) {
    if (chk === "mousedown") {
        straightDrawStart(e);
    } else if (chk === "mousemove") {
        straightDrawing(e)
    } else if (chk === "mouseup" || chk === "mouseout") {
        straightDrawEnd(e)
    }

    function straightDrawStart(event) {
        straightPath = new Path2D();

        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');
        moveX = event.offsetX;
        moveY = event.offsetY;

        if (straightDrawChk === true) {
            straightPath.moveTo(moveX, moveY);
            straightdraw = true;
            ctx.lineWidth = num;
            ctx.strokeStyle = colorVal;
        }
    }

    function straightDrawing(event) {
        straightPath = new Path2D();
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');
        let x = event.offsetX;
        let y = event.offsetY;
        ctx.lineWidth = num;
        ctx.strokeStyle = colorVal;
        if (!straightdraw) {
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (straightDrawChk == true) {
            ctx.beginPath()
            ctx.moveTo(moveX, moveY);
            straightPath.moveTo(moveX, moveY);
            ctx.lineTo(x, y);
            straightPath.lineTo(x, y);
            ctx.stroke();
            foreach();
        }
    }

    function straightDrawEnd(event) {
        let x = event.offsetX;
        let y = event.offsetY;
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');
        straightPath.lineTo(x, y);
        if (straightDrawChk === true && straightdraw === true) {
            pathSave.push({'path2d': straightPath, 'pathwidth': num, 'color': colorVal});
            foreach();

        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        straightdraw = false;

    }
}

function squareDraw(e, chk) {
    if (chk === "mousedown") {
        squareDrawStart(e);
    } else if (chk === "mousemove") {
        squareDrawing(e)
    } else if (chk === "mouseup" || chk === "mouseout") {
        squareDrawEnd(e, chk)
    }

    function squareDrawStart(event) {
        squarePath = new Path2D();
        moveX = event.offsetX;
        moveY = event.offsetY;
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');
        ctx.lineWidth = num;
        ctx.strokeStyle = colorVal;
        if (squareDrawChk === true) {
            squarePath.moveTo(moveX, moveY);
            squaredraw = true;
        }
    }

    function squareDrawing(event) {
        squarePath = new Path2D();
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');
        let x = event.offsetX;
        let y = event.offsetY;
        ctx.lineWidth = num;
        ctx.strokeStyle = colorVal;
        if (!squaredraw) {
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (squareDrawChk == true) {
            ctx.beginPath()
            ctx.rect(moveX, moveY, x - moveX, y - moveY);
            squarePath.rect(moveX, moveY, x - moveX, y - moveY);
            ctx.stroke();
            foreach();
        }
    }

    function squareDrawEnd(event) {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');
        if (squareDrawChk === true && squaredraw === true) {
            pathSave.push({'path2d': squarePath, 'pathwidth': num, 'color': colorVal});
            foreach();
        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';

        squaredraw = false;
    }
}

function circleDraw(e, chk) {
    if (chk === "mousedown") {
        circleDrawStart(e);
    } else if (chk === "mousemove") {
        circleDrawing(e)
    } else if (chk === "mouseup" || chk === "mouseout") {
        circleDrawEnd(e)
    }

    function circleDrawStart(event) {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');
        circlePath = new Path2D();
        moveX = event.offsetX;
        moveY = event.offsetY;
        ctx.lineWidth = num;
        ctx.strokeStyle = colorVal;
        if (circleDrawChk === true) {
            circlePath.moveTo(moveX, moveY);
            circledraw = true;
        }
    }

    function circleDrawing(event) {
        circlePath = new Path2D();
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');
        let x = event.offsetX;
        let y = event.offsetY;
        ctx.lineWidth = num;
        ctx.strokeStyle = colorVal;
        if (!circledraw) {
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let r2 = Math.pow(y - moveY, 2) + Math.pow(x - moveX, 2);
        let r = Math.sqrt(r2);
        if (circleDrawChk == true) {
            ctx.beginPath()
            ctx.arc(moveX, moveY, r, 0, 2 * Math.PI);
            circlePath.arc(moveX, moveY, r, 0, 2 * Math.PI);

            ctx.stroke();
            foreach();
        }
    }

    function circleDrawEnd(event) {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');

        if (circleDrawChk === true && circledraw === true) {
            pathSave.push({'path2d': circlePath, 'pathwidth': num, 'color': colorVal});
            foreach();

        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        circledraw = false;

    }
}

