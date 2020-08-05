import * as Zem from 'zem'
import { ColorSpaceI, HEXColor, RGBColor } from './colors'
import { ColorSpaceType, DisplayType } from './types'
const displayTypeOptionKey = "displayFormat"

function generateColorSpaces(context: Zem.Context, color: Zem.Color): ColorSpaceI[] {
    const colors: ColorSpaceI[] = [];

    if (context.getOption(ColorSpaceType.HEX)) {
        const { r, g, b } = color.toHex();
        colors.push(new HEXColor(r, g, b));
    }

    const rgbColor = new RGBColor(color.r, color.g, color.b, color.a)
    if (context.getOption(ColorSpaceType.RGB)) {
        colors.push(rgbColor)
    }

    if (context.getOption(ColorSpaceType.CMYK)) {
        colors.push(rgbColor.toCMYK())
    }

    if (context.getOption(ColorSpaceType.HSV)) {
        colors.push(rgbColor.toHSV())
    }

    if (context.getOption(ColorSpaceType.HSL)) {
        colors.push(rgbColor.toHSL())
    }

    return colors
}

function formatColorSpacesForDisplay(displayType: DisplayType, colors: ColorSpaceI[]): object|string {
    switch (displayType) {
        case DisplayType.JSON:
            const jsonColors = colors.reduce((r, color) => Object.assign(r, color.displayJSON()), {})
            return jsonColors
        case DisplayType.TEXT:
            let textColors = colors.reduce((r, color) => {
                return r + color.displayText() + "\n"
            }, "")
            return textColors
    }
}

function getColorsFromLayer(layer: Zem.Layer) : Zem.Color[] {
    const colors: Zem.Color[] = []
    if (layer.fills.length) {
        layer.fills.forEach((fill) => {
            colors.push(fill.color)
            if (fill.gradient) {
                fill.gradient.colorStops.forEach(({ color }) => {
                    colors.push(color)
                })
            }
        })
    }

    if(layer.textStyles.length) {
        layer.textStyles.forEach(({ textStyle }) => colors.push(textStyle.color))
    }

    return colors.filter(Boolean)
}

function layer(context: Zem.Context, layer: Zem.Layer) {
    const colors: Zem.Color[] = getColorsFromLayer(layer);

    if (colors.length) {
        switch (context.getOption(displayTypeOptionKey)) {
            case DisplayType.JSON:
                const jsonColors = colors.reduce((result, color) => {
                    const colorSpaces = generateColorSpaces(context, color)
                    return [...result, formatColorSpacesForDisplay(DisplayType.JSON, colorSpaces)]
                }, [])
                return {
                    code: JSON.stringify(jsonColors.length === 1 ? jsonColors[0] : jsonColors, null, 2),
                    language: "json"
                }
            case DisplayType.TEXT:
                const spaceBetweenColors = "\n\n"
                const textColors = colors.reduce((result, color) => {
                    const colorSpaces = generateColorSpaces(context, color)
                    return result + formatColorSpacesForDisplay(DisplayType.TEXT, colorSpaces) + spaceBetweenColors
                }, "")
                
                return textColors.slice(0, -spaceBetweenColors.length)
        }
    }
}

export default {
    layer,
}
