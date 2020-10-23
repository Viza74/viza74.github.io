/* global ctx mx my mDown */

/* exported ButtonUI */
class ButtonUI {
    constructor() {
        this.buttons = []
    }

    add(button) {
        // buttonui.add({ text: "alma", x: 10, y: 10, w: 100, h: 20, color: "#888888", callback: OnAlmaButton})
        if (button.text == undefined) { button.text = "Button" }
        if (button.x == undefined) { button.x = 0 }
        if (button.y == undefined) { button.y = 0 }
        if (button.w == undefined) { button.w = 100 }
        if (button.h == undefined) { button.h = 30 }
        if (button.color == undefined) { button.color = "#888888" }
        if (button.callback == undefined) { console.warn("Added button with no callback function.") }
        this.buttons.push(button)
    }

    remove(id) {
        for (let index = 0; index < this.buttons.length; index++) {
            const button = this.buttons[index]
            if (button.id!=undefined && button.id==id) {
                this.buttons.splice(index,1)
                return
            }
        }
    }

    update() {
        for (let index = 0; index < this.buttons.length; index++) {
            const button = this.buttons[index]
            let inx = button.x <= mx && button.x + button.w >= mx
            let iny = button.y <= my && button.y + button.h >= my
            button.over = inx && iny
            if (button.callback!=undefined && button.over && mDown) {
                mDown = false
                button.callback(button)
            }
        }
    }

    draw() {
        for (let index = 0; index < this.buttons.length; index++) {
            const button = this.buttons[index]
            
            ctx.fillStyle = button.color
            ctx.strokeStyle = "#666666"
            ctx.lineWidth = 1
            ctx.fillRect(button.x, button.y, button.w, button.h)

            ctx.fillStyle = "#000000"
            ctx.font = "18px monospace"
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillText(button.text, button.x+button.w/2, button.y+button.h/2)
    
        }
    }
}