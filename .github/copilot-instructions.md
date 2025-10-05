# Neuro Hyderabad Website

The Neuro Hyderabad website is a neurological healthcare website that supports multiple development approaches: static HTML, Node.js/Express server, and React with Vite. The repository provides a complete development environment with testing, linting, and formatting tools.

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Quick Start - NEVER CANCEL BUILDS

Bootstrap and validate the repository (NEVER CANCEL - this process takes 2-3 minutes total):
```bash
npm install                    # Takes ~45 seconds - NEVER CANCEL, set timeout to 120+ seconds
npm test                      # Takes ~0.3 seconds - validates setup
npm run lint                  # Takes ~0.4 seconds - validates code quality  
npm run format-check          # Takes ~0.5 seconds - validates formatting
npm run build-react           # Takes ~2.3 seconds - builds React app
```

## Development Options

### Option 1: Static HTML (Fastest)
```bash
npm run serve-static          # Starts Python HTTP server on port 8000
# Access: http://localhost:8000/index-static.html
# Use Ctrl+C to stop
```

### Option 2: Node.js/Express Server
```bash
npm start                     # Starts Express server on port 3000
# Access: http://localhost:3000/
# Health check: http://localhost:3000/health
# Use Ctrl+C to stop
```

### Option 3: React Development (Recommended for interactive features)
```bash
npm run dev-react             # Starts Vite dev server on port 5173
# Access: http://localhost:5173/
# Hot reload enabled - changes reflect immediately
# Use Ctrl+C to stop
```

## Build and Deploy

### React Production Build
```bash
npm run build-react           # Takes ~2.3 seconds - NEVER CANCEL, set timeout to 60+ seconds
npm run preview-react         # Preview build on port 4173
```

Build output goes to `dist/` directory with optimized assets.

## Testing and Validation

**ALWAYS run these before committing changes:**
```bash
npm test                      # Run all tests (~0.3 seconds)
npm run lint                  # Check code quality (~0.4 seconds)  
npm run format-check          # Check code formatting (~0.5 seconds)
npm run format                # Fix formatting issues (~0.5 seconds)
```

### Manual Validation Scenarios
After making changes, ALWAYS test these scenarios:

1. **Static Site Validation:**
   ```bash
   npm run serve-static
   curl -s http://localhost:8000/index-static.html | grep "Neuro Hyderabad"
   ```

2. **Node.js Server Validation:**
   ```bash
   npm start &
   sleep 2
   curl -s http://localhost:3000/health | grep "ok"
   curl -s http://localhost:3000/ | grep "Neuro Hyderabad"
   ```

3. **React App Validation:**
   ```bash
   npm run dev-react &
   sleep 3
   curl -s http://localhost:5173/ | grep "Vite"
   npm run build-react
   npm run preview-react &
   sleep 2  
   curl -s http://localhost:4173/ | grep "Neuro Hyderabad"
   ```

## Project Structure

```
neurohyderabad-site/
├── README.md                 # Project documentation
├── package.json              # Dependencies and scripts
├── .gitignore               # Git ignore rules
├── .github/
│   └── copilot-instructions.md
├── index-static.html        # Static HTML version
├── index.html               # React HTML entry point
├── server.js                # Express server (ES modules)
├── App.jsx                  # React main component
├── App.css                  # React component styles
├── main.jsx                 # React entry point
├── vite.config.js           # Vite configuration
├── eslint.config.js         # ESLint configuration (v9 format)
├── test/
│   └── basic.test.js        # Basic validation tests
└── dist/                    # React build output (generated)
```

## Important Commands and Timing

**Build Times (NEVER CANCEL):**
- `npm install`: ~45 seconds - Set timeout to 120+ seconds
- `npm run build-react`: ~2.3 seconds - Set timeout to 60+ seconds
- `npm test`: ~0.3 seconds
- `npm run lint`: ~0.4 seconds
- All other commands: <1 second

**Package Install Times:**
- Express: ~1.2 seconds
- React + React-DOM: ~1.6 seconds  
- Vite + React plugin: ~21 seconds
- ESLint: ~15 seconds
- Prettier: ~1.3 seconds

## Dependencies

**Runtime Dependencies:**
- `express`: Web server framework
- `react`: React library
- `react-dom`: React DOM renderer

**Development Dependencies:**
- `vite`: Build tool and dev server
- `@vitejs/plugin-react`: React support for Vite
- `eslint`: Code linting (v9 with modern config)
- `@eslint/js`: ESLint JavaScript configurations
- `eslint-plugin-react`: React-specific linting rules
- `prettier`: Code formatting
- `globals`: Global variables for ESLint

## Troubleshooting

### Port Conflicts
If ports are busy:
- Static server (8000): Change in script or use `python3 -m http.server 8001`
- Express server (3000): Set `PORT=3001 npm start`
- React dev (5173): Configure in `vite.config.js`
- React preview (4173): Automatically assigned by Vite

### Module Errors
This project uses ES modules (`"type": "module"` in package.json). If you see CommonJS errors:
- Use `import` instead of `require()`
- Use `export default` instead of `module.exports`

### Build Failures
1. Run `npm install` if dependencies are missing
2. Check Node.js version: requires Node.js 18+
3. Clear `node_modules` and reinstall if needed

### Linting Issues
- Run `npm run format` to auto-fix formatting
- ESLint uses v9 configuration format in `eslint.config.js`
- React JSX files are supported and configured

## Common File Patterns

### Adding New React Components
1. Create `ComponentName.jsx` in root directory
2. Import in `App.jsx`: `import ComponentName from './ComponentName.jsx'`
3. Add corresponding CSS file if needed
4. Run `npm run lint` and `npm run format` before committing

### Adding New API Endpoints
1. Edit `server.js` and add new routes
2. Test with: `curl http://localhost:3000/your-endpoint`
3. Add tests in `test/` directory
4. Run full validation suite

### Updating Styles
- Static version: Edit `index-static.html` inline styles
- React version: Edit `App.css` or create component-specific CSS files
- Run `npm run format` to maintain consistent formatting

## Health Checks

Use these commands to verify the system is working:
```bash
npm run health-check          # Test Express server health endpoint
npm test                      # Run all automated tests
npm run lint                  # Verify code quality
npm run format-check          # Verify code formatting
```

The health endpoint returns:
```json
{
  "status": "ok",
  "timestamp": "2025-09-19T12:35:57.961Z", 
  "message": "Neuro Hyderabad site is running"
}
```