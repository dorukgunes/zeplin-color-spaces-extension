export interface ColorSpaceI {
    name?: string,
    displayText(): string,
    displayJSON(): object
}

interface RGBColorI extends ColorSpaceI {
    readonly r: number
    readonly g: number
    readonly b: number
    readonly a: number
    toCMYK(): CMYKColorI,
    toHSV(): HSVColorI,
    toHSL(): HSLColorI
}

interface HEXColorI extends ColorSpaceI {
    readonly r: number
    readonly g: number
    readonly b: number
}

interface CMYKColorI extends ColorSpaceI {
    readonly c: number,
    readonly m: number,
    readonly y: number,
    readonly k: number
}

interface HSLColorI extends ColorSpaceI {
    readonly h: number,
    readonly s: number,
    readonly l: number
}

interface HSVColorI extends ColorSpaceI {
    readonly h: number,
    readonly s: number,
    readonly v: number
}

export class RGBColor implements RGBColorI {
    r: number
    g: number
    b: number
    a: number
    constructor(r: number, g: number, b: number, a: number) {
        this.r = r
        this.g = g
        this.b = b
        this.a = a  
    }
    
    toCMYK(): CMYKColorI {
        const { r, g, b } = this
    
        if ( r==null || g==null || b==null ||
            isNaN(r) || isNaN(g)|| isNaN(b) )
        {
            return;
        }
        if (r<0 || g<0 || b<0 || r>255 || g>255 || b>255) {
            return;
        }
 
        // BLACK
        if (r==0 && g==0 && b==0) {
            return new CMYKColor(0, 0, 0, 1)
        }
        
        const computedC = 1 - (r/255);
        const computedM = 1 - (g/255);
        const computedY = 1 - (b/255);
        
        const minCMY = Math.min(computedC, Math.min(computedM,computedY));
        return new CMYKColor(
            Math.round((computedC - minCMY) / (1 - minCMY) * 100),
            Math.round((computedM - minCMY) / (1 - minCMY) * 100),
            Math.round((computedY - minCMY) / (1 - minCMY) * 100 ),
            Math.round(minCMY * 100)
        )
    }
    toHSV(): HSVColorI {
        const r = this.r / 255
        const g = this.g / 255 
        const b = this.b / 255;
 
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, v = max;
      
        const d = max - min;
        s = max == 0 ? 0 : d / max;
      
        if (max == min) {
          h = 0; // achromatic
        } else {
          switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
          }      
        }
      
        return new HSVColor(60*(h<0?h+6:h), s*100, v*100)
    }
    toHSL(): HSLColorI {
        const r = this.r / 255
        const g = this.g / 255 
        const b = this.b / 255;

        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
      
        if (max == min) {
          h = s = 0; // achromatic
        } else {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
          switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
          }
        }
      
        return new HSLColor(60*(h<0?h+6:h), s*100, l*100)
    }
    private getRGBCode() {
        return `${this.r} ${this.g} ${this.b} ${Math.round(this.a * 100) / 100}`
    }
    displayText(): string {
        return `rgba: ${this.getRGBCode()}`
    }
    displayJSON(): object {
        return {
            rgba: this.getRGBCode()
        }
    }
}

export class HEXColor implements HEXColorI {
    r: number    
    g: number
    b: number

    constructor(r: number, g: number, b: number) {
        this.r = r
        this.g = g
        this.b = b
    }
    private getHexCode(): string {
        return `#${this.r}${this.g}${this.b}`
    }
    displayText(): string {
       return `hex: ${this.getHexCode()}`
    }
    displayJSON(): object {
        return {
            hex: this.getHexCode()
        }
    }
}

export class CMYKColor implements CMYKColorI {
    c: number;
    m: number;
    y: number;
    k: number;
    constructor(c: number, m: number, y: number, k: number) {
        this.c = c
        this.m = m
        this.y = y
        this.k = k
    }
    private getCMYKCode(): string {
        return `${this.c} ${this.m} ${this.y} ${this.k}`
    }
    displayText(): string {
        return `cmyk: ${this.getCMYKCode()}`
    }
    displayJSON(): object {
        return {
            cmyk: this.getCMYKCode()
        }
    }
}

export class HSLColor implements HSLColorI {
    h: number    
    s: number
    l: number

    constructor(h: number, s: number, l: number) {
        this.h = h
        this.s = s
        this.l = l
    }

    private getHSLCode(): string {
        return `${this.h.toFixed(1)}° ${this.s.toFixed(1)} ${this.l.toFixed(1)}`
    }

    displayText(): string {
        return `hsl: ${this.getHSLCode()}`
    }
    displayJSON(): object {
        return {
            hsl: this.getHSLCode()
        }
    }
}

export class HSVColor implements HSVColorI {
    h: number    
    s: number
    v: number
    constructor(h: number, s: number, v: number) {
        this.h = h
        this.s = s
        this.v = v
    }

    private getHSVCode(): string {
        return `${this.h.toFixed(1)}° ${this.s.toFixed(1)} ${this.v.toFixed(1)}`
    }

    displayText(): string {
        return `hsv: ${this.getHSVCode()}`
    }
    displayJSON(): object {
        return {
            hsv: this.getHSVCode()
        }
    }
}