// index.mjs
import plugin from 'tailwindcss/plugin.js';

const defaultConfig = {
  minViewport: 375,
  maxViewport: 1440,
  rootFontSize: 10, // your 62.5% root → 1rem = 10px
  prefix: 'fluid-',
  sizes: {
    xs:    { min: 12,  max: 14 },
    sm:    { min: 14,  max: 16 },
    base:  { min: 16,  max: 18 },
    lg:    { min: 18,  max: 22 },
    xl:    { min: 20,  max: 28 },
    '2xl': { min: 24,  max: 36 },
    '3xl': { min: 30,  max: 48 },
    '4xl': { min: 36,  max: 60 },
    '5xl': { min: 48,  max: 72 },
  },
};

export default plugin.withOptions(
  // Plugin implementation
  function (options = {}) {
    return function ({ addUtilities, theme }) {
      const config = {
        ...defaultConfig,
        ...options,
        sizes: { ...defaultConfig.sizes, ...options?.sizes },
      };

      const utilities = {};

      Object.entries(config.sizes).forEach(([key, { min: minPx, max: maxPx }]) => {
        if (typeof minPx !== 'number' || typeof maxPx !== 'number') return;

        const minRem = minPx / config.rootFontSize;
        const maxRem = maxPx / config.rootFontSize;

        const viewportRange = config.maxViewport - config.minViewport;
        const sizeRange = maxRem - minRem;
        const slope = sizeRange / viewportRange;
        const intercept = minRem - slope * config.minViewport;

        const preferred = `calc(${slope * 100}vw + ${intercept}rem)`;

        utilities[`.text-${config.prefix}${key}`] = {
          'font-size': `clamp(${minRem}rem, ${preferred}, ${maxRem}rem)`,
        };
      });

      addUtilities(utilities, ['responsive']);
    };
  },

  // Theme extension (so users can override via tailwind.config.mjs)
  function (options = {}) {
    return {
      theme: {
        extend: {
          fluidTypography: {
            minViewport: options.minViewport ?? defaultConfig.minViewport,
            maxViewport: options.maxViewport ?? defaultConfig.maxViewport,
            rootFontSize: options.rootFontSize ?? defaultConfig.rootFontSize,
            sizes: options.sizes ?? defaultConfig.sizes,
          },
        },
      },
    };
  }
);