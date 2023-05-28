# Color Spaces Extension
Generates *HEX, CMYK, RGBA, HSV, HSL, OKLCH, LCH* color spaces when you inspect a layer. You can freely disable color spaces you don't want to see in the extension output. 🎨

## Output

Sample JSON output:
```
{
  "hex": "#2d9cdb",
  "rgba": "45 156 219 1",
  "cmyk": "79 29 0 14",
  "hsv": "201.7° 79.5 85.9",
  "hsl": "201.7° 70.7 51.8",
  "oklch": "66.07% 0.134 239.24",
  "lch": "60.53% 44.16 250.18"
}
```

Sample text output:
```
hex: #2d9cdb
rgba: 45 156 219 1
cmyk: 79 29 0 14
hsv: 201.7° 79.5 85.9
hsl: 201.7° 70.7 51.8
oklch: 66.07% 0.134 239.24
lch: 60.53% 44.16 250.18
```

## TODO
- [ ] Add tests & circleci
- [ ] Add lint-staged & husky


## Development
Color Spaces extension is developed using [zem](https://github.com/zeplin/zem), Zeplin Extension Manager. zem is a command line tool that lets you quickly create and test extensions.

To learn more about zem, [see documentation](https://github.com/zeplin/zem).
