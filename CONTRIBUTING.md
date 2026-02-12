# Contributing
Thank you for considering contributing to **tailwindcss-fluid-typography**!  
We welcome bug reports, feature suggestions, documentation improvements, and pull requests.

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).  
By participating, you are expected to uphold this code.

## How to Contribute

### 1. Reporting Bugs / Requesting Features

- Open an issue on GitHub: [Issues](https://github.com/apexshift/tailwindcss-fluid-typography.git/issues)
- Use a clear and descriptive title
- Provide as much detail as possible (Tailwind version, Node version, minimal reproduction steps, screenshots if helpful)

### 2. Submitting Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-change`
3. Make your changes
4. Ensure the plugin still works with Tailwind v3 and v4
5. Test locally (see Development section below)
6. Commit with a clear message: `feat: add fluid spacing utilities`
7. Push to your fork and open a pull request

We will review your PR as soon as possible.

### Development Setup

```bash
git clone https://github.com/yourusername/tailwindcss-fluid-typography.git
cd tailwindcss-fluid-typography
npm install

# Link locally for testing
npm link

# In a separate test project:
npm link tailwindcss-fluid-typography
npm run dev
```

### Style Guide
- Use ESM(`import`/`export`)
- Keep code readable and well commented
- Update README.md and/or CHANGELOG.md when appropriate
- Add tests if you introduce new behavior (future goal)

### Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation changes
- `chore:` maintenance

Thank you again – every contribution helps!