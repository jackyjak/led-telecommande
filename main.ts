makerbit.onIrButton(IrButton.Number_3, IrButtonAction.Pressed, function () {
    onButton(makerbit.irButton())
    setColor(240)
})
makerbit.onIrButton(IrButton.Number_0, IrButtonAction.Pressed, function () {
    onButton(makerbit.irButton())
    if (allumée) {
        allumée = false
        strip.setBrightness(0)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
    } else {
        allumée = true
        strip.setBrightness(255)
        basic.showIcon(IconNames.SmallDiamond)
    }
    serial.writeLine("allumee:" + allumée)
})
makerbit.onIrButton(IrButton.Number_1, IrButtonAction.Pressed, function () {
    onButton(makerbit.irButton())
    setColor(0)
})
makerbit.onIrButton(IrButton.Left, IrButtonAction.Pressed, function () {
    onButton(makerbit.irButton())
    setColor((couleur - 15) % 360)
})
makerbit.onIrButton(IrButton.Number_2, IrButtonAction.Pressed, function () {
    onButton(makerbit.irButton())
    setColor(120)
})
makerbit.onIrButton(IrButton.Right, IrButtonAction.Pressed, function () {
    onButton(makerbit.irButton())
    setColor((couleur + 15) % 360)
})
function setColor (color: number) {
    couleur = color
    strip.showColor(neopixel.hsl(couleur, 255, 255))
    serial.writeValue("setColor", color)
}
function id2str (id: number) {
    if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Number_1)) {
        return "1"
    } else if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Number_2)) {
        return "2"
    } else if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Number_3)) {
        return "3"
    } else if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Number_4)) {
        return "4"
    } else if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Number_5)) {
        return "5"
    } else if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Number_6)) {
        return "6"
    } else if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Number_7)) {
        return "7"
    } else if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Number_8)) {
        return "8"
    } else if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Number_9)) {
        return "9"
    } else if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Number_0)) {
        return "0"
    } else if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Star)) {
        return "*"
    } else if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Hash)) {
        return "#"
    } else if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Up)) {
        return "^"
    } else if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Down)) {
        return "V"
    } else if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Left)) {
        return "<"
    } else if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Right)) {
        return ">"
    } else if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Ok)) {
        return "X"
    } else {
        return "?"
    }
}
function onButton (id: number) {
    serial.writeLine("onButton:" + id2str(id))
    basic.showString("" + (id2str(id)))
}
let allumée = false
let couleur = 0
let strip: neopixel.Strip = null
serial.writeLine("led-telecommande")
makerbit.connectIrReceiver(DigitalPin.P2, IrProtocol.NEC)
basic.showIcon(IconNames.Heart)
strip = neopixel.create(DigitalPin.P0, 160, NeoPixelMode.RGBW)
couleur = 0
allumée = true
