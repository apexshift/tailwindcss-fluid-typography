// index.mjs
import plugin from 'tailwindcss/plugin.js';

const defaultConfig = {
  minViewport: 375,          // px – typical mobile
  maxViewport: 1440,         // px – typical desktop/large
  rootFontSize: 10,          // px – matches html { font-size: 62.5%; } → 1rem = 10px
  prefix: 'fluid-',          // class prefix: text-fluid-base, etc.
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
  // 1. Plugin implementation (runs when Tailwind processes CSS)
  function (options = {}) {
    return function ({ addUtilities, theme }) {

      // In development, log when plugin is actually executed
      if (process.env.NODE_ENV !== 'production') {
        console.log('[tailwindcss-fluid-typography] Plugin is running');
        console.log('[tailwindcss-fluid-typography] Received options:', options);
      }

      // Merge config – support both nested sizes (config file) and flat keys (CSS @plugin)
      const config = {
        ...defaultConfig,
        ...options,
        sizes: { ...defaultConfig.sizes },
      };

      // 1. If user provided nested sizes object (tailwind.config.js/mjs)
      if (options.sizes && typeof options.sizes === 'object') {
        config.sizes = { ...config.sizes, ...options.sizes };
      }

      // 2. Support flat keys from @plugin { size-base-min: 17; size-base-max: 23; ... }
      Object.keys(options).forEach((key) => {
        if (key.startsWith('size-')) {
          const parts = key.split('-');
          if (parts.length === 3) {
            const [, sizeKey, prop] = parts; // size-base-min → base, min
            if (prop === 'min' || prop === 'max') {
              if (!config.sizes[sizeKey]) config.sizes[sizeKey] = {};
              config.sizes[sizeKey][prop] = Number(options[key]);
            }
          }
        }
      });

      const utilities = {};

      Object.entries(config.sizes).forEach(([key, value]) => {
        const { min: minPx, max: maxPx } = value;

        // Skip invalid entries
        if (typeof minPx !== 'number' || typeof maxPx !== 'number' || minPx >= maxPx) {
          return;
        }

        const minRem = minPx / config.rootFontSize;
        const maxRem = maxPx / config.rootFontSize;

        const viewportRange = config.maxViewport - config.minViewport;
        const sizeRange = maxRem - minRem;
        const slope = sizeRange / ( viewportRange * 100 );
        const intercept = minRem - sizeRange * config.minViewport / viewportRange;

        const preferred = `calc(${slope}vw + ${intercept}rem)`;

        utilities[`.text-${config.prefix}${key}`] = {
          'font-size': `clamp(${minRem}rem, ${preferred}, ${maxRem}rem)`,
        };
      });

      // Add the generated utilities (with responsive variants)
      addUtilities(utilities, ['responsive']);
    };
  },

  // 2. Theme extension – still useful for config-file users
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