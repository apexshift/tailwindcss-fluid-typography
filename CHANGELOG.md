# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2026-02-12

### Added
- Initial release
- Fluid typography utilities using automatic `clamp()` preferred value calculation
- Configurable min/max viewport, root font size, class prefix, and size scale
- ESM-only module (`index.mjs`)
- Plugin options + theme extension support
- Responsive variants included by default

### Notes
- Tested with Tailwind CSS v3.4+ and v4.0+
- Designed for projects using `html { font-size: 62.5%; }` (10px root), but works with any root size