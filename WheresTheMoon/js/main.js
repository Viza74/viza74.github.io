/* global Actor makeDamagable addAttackingAction makeSpiky addWaitingAction makeRegen */
/* global Card makeAttackingCard */
/* global setupCanvas canvas ctx */
/* global ButtonUI */
/* global EventProc */
/* global shifty */



// framework variabes
let spritesheet = new Image()
spritesheet.src = "spritesheet.png"

setupCanvas(640, 480)

// eslint-disable-next-line no-unused-vars
let mx = 0, my = 0, mDown = false, mUp = false, mHeld = false

canvas.addEventListener("mousemove", e => { mx = e.offsetX; my = e.offsetY })
canvas.addEventListener("mousedown", () => { mDown = true; mHeld = true })
canvas.addEventListener("mouseup", () => { mUp = true; mHeld = false })

let buttonui = new ButtonUI()

// game variables --------------
let stepTime = 10

let pulseTimeOut
let pulsing = false
let numPulses = 0

let data = []
let dataMax = 0, dataMin = 0
let signalPos = 30
let signalWidth = 40
let numData = 200
let step = canvas.width/numData

let currDataMid = canvas.height/2
let currDataMult = 1

let playerGuess = -1
let playerGuessTime = 0
let gameEnd = false

let moonGfx = new Image()
moonGfx.src = "moon2.png"
let moonPosY = -moonGfx.height

let starsGfx = new Image()
starsGfx.src = "stars.jpg"
let forestGfx = new Image()
forestGfx.src = "forest.png"
let radarGfx = new Image()
radarGfx.src = "radar.png"


buttonui.add({ text: "Restart", x: 5, y: canvas.height-35, w: 120, h: 30, color: "#888888", callback: Restart })

Restart()

function Restart() {
    buttonui.add({ id:"start", text: "Start pulses", x: canvas.width - 150, y: canvas.height - 35, w: 140, h: 30, color: "#888888", callback: OnAddSignalButton })

    currDataMid = canvas.height*0.75
    currDataMult = 1

    gameEnd = false
    playerGuess = -2
    signalPos = Math.floor(Math.random()*(numData-signalWidth))
    data.length = 0
    for (let index = 0; index < numData; index++) {
        data.push(Math.random()*2-1)
    }
    numPulses = -1
    AddPulse()

    if (pulsing) {
        clearInterval(pulseTimeOut)
        pulsing = false    
    }
}

function OnAddSignalButton() {
    if (pulsing) {
        StopPulsing()
    } else {
        StartPulsing()
    }
}

function StopPulsing() {
    console.log("Stopping")
    clearInterval(pulseTimeOut)
    pulsing = false
}

function StartPulsing() {
    console.log("Starting")
    pulseTimeOut = setInterval(AddPulse, stepTime)
    pulsing = true
    buttonui.remove("start")
}


function AddPulse() {
    numPulses++
    if (numPulses>=1000) {
        StopPulsing()
        gameEnd = true
        shifty.tween({
            from: { y: -moonGfx.height },
            to: { y: 10 },
            duration: 1500,
            easing: 'easeOutBack',
            step: state => { 
                console.log(state)
                moonPosY = state.y
            },
        })//.then(() => console.log('All done!'))
    }

    // signal
    let signalMult = 0.1
    if (numPulses<300) {
        signalMult *= numPulses/300
    }
    for (let i = 0; i < signalWidth; i++) {
        data[signalPos+i] -= Math.sin(i/signalWidth*Math.PI+Math.PI)*signalMult
        
    }
    dataMax = -99999999999
    dataMin = 999999999999
    // noise
    for (let index = 0; index < data.length; index++) {
        let add = (Math.random()*2-1)*1
        // if(index>signalPos && index<signalPos+signalWidth) {
        //     add *= 0.75
        // }
        data[index] += add
        // if(!(index>signalPos && index<signalPos+signalWidth)) {
        //     if (data[index]<0 && data[index]<-20) {
        //         data[index] *= 0.8
        //     }
        //     if (data[index]>0 && data[index]>20) {
        //         data[index] *= 0.8
        //     }
        // }
        
        if (data[index]>dataMax) {
            dataMax = data[index]
        }
        if (data[index]<dataMin) {
            dataMin = data[index]
        }
    }

    
}



requestAnimationFrame(tick)


function tick() {
    buttonui.update()

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.drawImage(starsGfx, 0, 0,  starsGfx.width, starsGfx.height, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(forestGfx, 0, 0,  forestGfx.width, forestGfx.height, 0, canvas.height-200, canvas.width, 200)
    ctx.drawImage(radarGfx, 0, 0,  radarGfx.width, radarGfx.height, canvas.width-radarGfx.width*0.5-30, canvas.height-radarGfx.height*0.5, 0.5*radarGfx.width, 0.5*radarGfx.height)
    

    let dataMult = (canvas.height-150)/(dataMax+Math.abs(dataMin))
    if (numPulses<800) {
        currDataMult *= numPulses/800
    }

    if (pulsing) {
        currDataMult += (dataMult-currDataMult)*0.1
    }


    let dataMid = canvas.height-25+(dataMin*currDataMult)
    if ( (dataMid-dataMax*currDataMult<100 || dataMid-dataMin*currDataMult>canvas.height-25)) {
        currDataMid += (dataMid-currDataMid)*0.07
    }



    // data graph
    ctx.strokeStyle = "#00ff00"
    ctx.setLineDash([])
    ctx.beginPath()
    ctx.moveTo(0,currDataMid)
    for (let index = 0; index < numData; index++) {
        ctx.lineTo(index*step, currDataMid-(data[index]*currDataMult))
    }
    ctx.stroke()

    // Data mid line
    // ctx.strokeStyle = "#00aa00"
    // ctx.beginPath()
    // ctx.setLineDash([5])
    // ctx.moveTo(0, currDataMid)
    // ctx.lineTo(canvas.width, currDataMid)
    // ctx.stroke()

    if (playerGuess <0 && pulsing && mDown) {
        if (playerGuess==-2) {
            playerGuess=-1
        }
        playerGuess = mx
        playerGuessTime = numPulses
    }
    
    if (playerGuess>=0) {
        ctx.setLineDash([5])
        ctx.strokeStyle = "#ffff00"
        ctx.beginPath()
        ctx.moveTo(playerGuess, 0)
        ctx.lineTo(playerGuess, canvas.height)
        ctx.stroke()
    }
    
    let signalCenter = (signalPos+signalWidth/2)*step
    let infoTextSide = "right"
    if (signalCenter>canvas.width/2) {
        infoTextSide="left"
    }
    if (gameEnd) {
        
        
        ctx.setLineDash([5])
        ctx.strokeStyle = "#00ffff"
        ctx.beginPath()
        ctx.moveTo(signalCenter, 0)
        ctx.lineTo(signalCenter, canvas.height)
        ctx.stroke()

        ctx.drawImage(moonGfx, 0, 0,  moonGfx.width, moonGfx.height, signalPos*step, moonPosY, signalWidth*step, signalWidth*step)

        ctx.fillStyle = "#00ffff"
        ctx.font = "20px monospace"
        ctx.textAlign = infoTextSide
        ctx.fillText("Signal center: "+signalCenter.toFixed(0), infoTextSide=="right"?canvas.width-30:30, 80)

        let score = 0

        let distScore = Math.abs(signalCenter-playerGuess)/(signalWidth/2*step)
        if (distScore>1) {
            distScore=0
        } else {
            distScore = (1-distScore)*1000
            score += distScore
        }

        let timeScore = 1000-playerGuessTime
        if (distScore>0) {
            score += timeScore
        } else {
            timeScore = 0
        }

        ctx.fillStyle = "#ffffff"
        ctx.fillText("Score: "+distScore.toFixed(0)+"+"+timeScore.toFixed(0)+"="+score.toFixed(0), infoTextSide=="right"?canvas.width-30:30, 105)
    }

    if (playerGuess>=0) {
        ctx.fillStyle = "#ffff00"
        ctx.font = "20px monospace"
        ctx.textAlign = infoTextSide
        ctx.fillText("Player guess: "+playerGuess, infoTextSide=="right"?canvas.width-30:30, 30)

        ctx.fillStyle = "#ffff00"
        ctx.font = "20px monospace"
        ctx.textAlign = infoTextSide
        ctx.fillText("Player time: "+playerGuessTime, infoTextSide=="right"?canvas.width-30:30, 55)
    }

    // num pulses text
    ctx.fillStyle = "#ffffff"
    ctx.font = "20px monospace"
    ctx.textAlign = "right"
    ctx.fillText("Pulses: 1000/", canvas.width/2, canvas.height-30)

    ctx.font = "50px monospace"
    ctx.textAlign = "left"
    ctx.fillText(numPulses, canvas.width/2, canvas.height-30)

    buttonui.draw()

    // drawRotatedSprite(2,128,128,90)


    mDown = false
    mUp = false

    requestAnimationFrame(tick)
}