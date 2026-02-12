# tailwindcss-fluid-typography
A Tailwind CSS plugin that generates fluid typography utilities using `clamp()` with automatically calculated preferred values.

Instead of manually writing `clamp(…)` expressions everywhere, define min/max font sizes once — the plugin computes the linear interpolation for smooth scaling across viewports.

Works great with Tailwind v3 and v4.

## Features
- Automatic calculation of the preferred value in `clamp(min, preferred, max)`
- Configurable min/max viewport widths
- Supports custom root font size (perfect for 10px = 1rem setups)
- Responsive variants (`sm:`, `md:`, etc.) included
- Override defaults via `theme.extend.fluidTypography` or plugin options
- Clean class names: `text-fluid-base`, `text-fluid-xl`, etc.

## Installation
```bash
npm install --save-dev tailwindcss-fluid-typography
```

## Usage
### 1. Add plugin
```mjs
// tailwind.config.mjs
import fluidTypography from 'tailwindcss-fluid-typography'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [
    fluidTypography({
      rootFontSize: 10,
      minViewport: 360,
      maxViewport: 1536,
      sizes: {
        base: { min: 16, max: 20 }, // px values
        xl: { min: 20, max: 32 },
        '3xl': {min: 32, max: 56 }
      }
    })
  ]
}
```

### 2. Use the generated classes
```html
<h1 class="text-fluid-5xl font-bold">Fluid Heading</h1>
<p class="text-fluid-base leading-relaxed">This paragraph scales smoothly.</p>
<h2 class="text-fluid-xl md:text-fluid-2xl">Responsive section title</h2>
```

## Confguration Options
You can pass option when adding the plugin, or extend the theme.

| Option | Default | Description |
| ------ | ------- | ----------- |
| `rootFontSize` | `10` | Base font size in px (for rem conversion) |
| `minViewport` | `375` | Minimum viewport width in px |
| `maxViewport` | `1440` | Maximum viewport width in px |
| `prefix` | `fluid-` | prefix for generated classes |
| `sizes` | (see below) | Object of `{ min: number, max: number }` pairs |

### Default Sizes (in px):
```javascript
{
  xs:   { min: 12, max: 14 },
  sm:   { min: 14, max: 16 },
  base: { min: 16, max: 18 },
  lg:   { min: 18, max: 22 },
  xl:   { min: 22, max: 28 },
}
```

## How it works (math behind the scenes)
For each size:
```plain
minRem = minPx / rootFontSize
maxRem = maxPx / rootFontSize

slope = (maxRem - minRem) / (maxViewport - minViewport)
intercept = minRem - slope * minViewport

preferred = calc(${slope * 100}vw + ${intercept}rem)

font-size: clamp(${minRem}rem, ${preferred}, ${maxRem}rem)
```

## Development
```bash
# Link locally for testing
cd tailwindcss-fluid-typography
npm link

# In your project
npm link tailwindcss-fluid-typography
```

## Licence
MIT