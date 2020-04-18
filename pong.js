/*global document*/
/*eslint no-unused-vars: "off"*/
/*global setInterval*/
/*global window*/
/*global setTimeout*/

var paddleMaxSpeed = 7;

var paddlePosLeft;
var paddleSpeedLeft = 0;
var paddlePosRight;
var paddleSpeedRight = 0;
var ballPosX;
var ballPosY;
var ballSpeedX;
var ballSpeedY;
var ballSize;
var canBounce = true;

var ballMaxPosX;
var ballMaxPosY;
var ballMoving = false;

var paddlePosRightX;
var paddleMaxPos;
var paddleSizeX;
var paddleSizeY;

var wDown;
var sDown;
var upDown;
var downDown;

var ScoreLeft = 0;
var ScoreRight = 0;
var SLeft;
var SRight;
var myCanvas;
var ctx;

function Start() {
    myCanvas = document.getElementById("myCanvas");
    ctx = myCanvas.getContext("2d");

    ballSize = myCanvas.width * .04;
    ballMaxPosY = myCanvas.height - ballSize;
    ballMaxPosX = myCanvas.height - ballSize;

    SetBall(true);
    setTimeout("LaunchBall()", 2000)

    paddleSizeX = myCanvas.width * .04;
    paddleSizeY = myCanvas.height * .22;
    paddlePosRightX = myCanvas.width - 3 - paddleSizeX;
    paddlePosLeft = (myCanvas.height - paddleSizeY) * .5;
    paddlePosRight = paddlePosLeft;
    paddleMaxPos = myCanvas.height - paddleSizeY;

    SLeft = document.getElementById("SLeft");
    SRight = document.getElementById("SRight");

    window.setInterval("Update()", 17);
}

function Update() {
    CheckKeys();
    CheckWallsPaddles();
    CheckBallPaddles();
    CheckWallsBall();
    UpdatePositions();
    DrawScreen();
}

function CheckKeys() {
    if (wDown) {
        if (sDown) {
            paddleSpeedLeft = 0;
        } else {
            paddleSpeedLeft = -1 * paddleMaxSpeed;
        }
    } else if (sDown) {
        paddleSpeedLeft = paddleMaxSpeed;
    } else {
        paddleSpeedLeft = 0;
    }

    if (upDown) {
        if (downDown) {
            paddleSpeedRight = 0;
        } else {
            paddleSpeedRight = -1 * paddleMaxSpeed;
        }
    } else if (downDown) {
        paddleSpeedRight = paddleMaxSpeed;
    } else {
        paddleSpeedRight = 0;
    }
}

function CheckWallsPaddles() {

    if (paddleSpeedLeft > 0) {
        if (paddlePosLeft == paddleMaxPos) {
            paddleSpeedLeft = 0;
        } else if (paddlePosLeft > paddleMaxPos) {
            paddleSpeedLeft = -1;
        }
    } else if (paddleSpeedLeft < 0) {
        if (paddlePosLeft == 0) {
            paddleSpeedLeft = 0;
        } else if (paddlePosLeft < 0) {
            paddleSpeedLeft = 1;
        }
    }

    if (paddleSpeedRight > 0) {
        if (paddlePosRight == paddleMaxPos) {
            paddleSpeedRight = 0;
        } else if (paddlePosRight > paddleMaxPos) {
            paddleSpeedRight = -1;
        }
    } else if (paddleSpeedRight < 0) {
        if (paddlePosRight == 0) {
            paddleSpeedRight = 0;
        } else if (paddlePosRight < 0) {
            paddleSpeedRight = 1;
        }
    }
}

function CheckBallPaddles() {
    if (canBounce) {
        if (ballPosX <= (paddleSizeX + 3)) {
            if ((ballPosY - paddlePosLeft) < paddleSizeY) {
                if ((paddlePosLeft - ballPosY) < ballSize) {
                    Bounce((ballPosY + .5 * ballSize) - (paddlePosLeft + .5 * paddleSizeY));

                }
            }
        } else if (ballPosX >= (myCanvas.width - (3 + paddleSizeX + ballSize))) {
            if ((ballPosY - paddlePosRight) < paddleSizeY) {
                if ((paddlePosRight - ballPosY) < ballSize) {
                    Bounce((ballPosY + .5 * ballSize) - (paddlePosRight + .5 * paddleSizeY));

                }
            }
        }
    }
}

function Bounce(sep) {
    ballSpeedX *= -1;
    ballSpeedY += .1 * sep;
    canBounce = false;
    setTimeout("EnableBouncing()", 1000)
}

function EnableBouncing() {
    canBounce = true;
}


function CheckWallsBall() {
    if (ballPosY <= 0 || ballPosY >= ballMaxPosY) {
        ballSpeedY *= -1;
    }

    if (ballPosX <= -1 * ballSize) {
        Score(false);
    } else if (ballPosX >= myCanvas.width)
        Score(true);
}

function Score(isLeftPlayer) {
    if (isLeftPlayer) {
        ScoreLeft += 1;
        SLeft.innerHTML = ScoreLeft;
    } else {
        ScoreRight += 1;
        SRight.innerHTML = ScoreRight;
    }

    ballMoving = false;
    SetBall(!isLeftPlayer);
    setTimeout("LaunchBall()", 1000)
}

function SetBall(toleft) {
    ballPosX = (myCanvas.width - ballSize) * .5;
    if (toleft) {
        ballSpeedX = -1 * myCanvas.width / 180;
    } else {
        ballSpeedX = myCanvas.width / 180;
    }

    ballPosY = Math.floor(Math.random() * (myCanvas.height - ballSize));
    ballSpeedY = Math.floor(Math.random() * 6)
}

function LaunchBall() {
    ballMoving = true;
}

function UpdatePositions() {
    paddlePosLeft += paddleSpeedLeft;
    paddlePosRight += paddleSpeedRight;
    if (ballMoving) {
        ballPosX += ballSpeedX;
        ballPosY += ballSpeedY;
    }

}

function DrawScreen() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    ctx.fillRect(3, paddlePosLeft, paddleSizeX, paddleSizeY);
    ctx.fillRect(paddlePosRightX, paddlePosRight, paddleSizeX, paddleSizeY);
    ctx.fillRect(ballPosX, ballPosY, ballSize, ballSize);
}

function KeyDown(event) {
    if (event.key == "w") {
        wDown = true;
    }
    if (event.key == "s") {
        sDown = true;
    }
    if (event.key == "ArrowUp") {
        upDown = true;
    }
    if (event.key == "ArrowDown") {
        downDown = true;
    }
}

function KeyUp(event) {
    if (event.key == "w") {
        wDown = false;
    }
    if (event.key == "s") {
        sDown = false;
    }
    if (event.key == "ArrowUp") {
        upDown = false;
    }
    if (event.key == "ArrowDown") {
        downDown = false;
    }
}
