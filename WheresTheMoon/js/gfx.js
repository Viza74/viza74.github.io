/** @type {HTMLCanvasElement} */
let canvas
/** @type {CanvasRenderingContext2D} */
let ctx

/* global spritesheet */

/* exported setupCanvas */
function setupCanvas(w, h) {
    /* exported canvas */
    canvas = document.querySelector("canvas")
    /* exported ctx */
    ctx = canvas.getContext("2d")

    canvas.width = w
    canvas.height = h
    canvas.style.width = canvas.width + "px"
    canvas.style.height = canvas.height + "px"
    // ctx.imageSmoothingEnabled = false
}

/* exported drawSprite */
function drawSprite(sprIndex, x,y) {
    ctx.drawImage(spritesheet, sprIndex*16, 0, 16, 16, x, y, 64, 64)
}

/* exported drawRotatedSprite */
function drawRotatedSprite(sprIndex, x, y, rot) {
    ctx.translate(x, y)
    ctx.rotate(rot*Math.PI/180)
    ctx.drawImage(spritesheet, sprIndex*16, 0, 16, 16, -32, -32, 64, 64)
    ctx.resetTransform()
    // ctx.rotate(-rot)
    // ctx.translate(-x, -y)
}

CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius, fill, stroke) {
    if (typeof stroke == "undefined") {
        stroke = true
    }
    if (typeof radius === "undefined") {
        radius = 5
    }
    this.beginPath()
    this.moveTo(x + radius, y)
    this.lineTo(x + width - radius, y)
    this.quadraticCurveTo(x + width, y, x + width, y + radius)
    this.lineTo(x + width, y + height - radius)
    this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    this.lineTo(x + radius, y + height)
    this.quadraticCurveTo(x, y + height, x, y + height - radius)
    this.lineTo(x, y + radius)
    this.quadraticCurveTo(x, y, x + radius, y)
    this.closePath()
    if (fill) {
        this.fill()
    }
    if (stroke) {
        this.stroke()
    }
}