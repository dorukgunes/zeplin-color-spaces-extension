# Color Spaces Extension
Generates *HEX, CMYK, RGBA, HSV, HSL, LCH, OKLCH* color spaces when you inspect a layer. You can freely disable color spaces you don't want to see in the extension output. 🎨

## Output

Sample JSON output:
```
{
  "hex": "#3c3c43",
  "rgba": "60 60 67 1",
  "cmyk": "10 10 0 74",
  "hsv": "240.0° 10.4 26.3",
  "hsl": "240.0° 5.5 24.9"
}
```

Sample text output:
```
hex: #3c3c43
rgba: 60 60 67 1
cmyk: 10 10 0 74
hsv: 240.0° 10.4 26.3
hsl: 240.0° 5.5 24.9
```

## TODO
- [ ] Add tests & circleci
- [ ] Add lint-staged & husky


## Development
Color Spaces extension is developed using [zem](https://github.com/zeplin/zem), Zeplin Extension Manager. zem is a command line tool that lets you quickly create and test extensions.

To learn more about zem, [see documentation](https://github.com/zeplin/zem).
