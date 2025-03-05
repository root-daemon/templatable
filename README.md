# Templatable

A CLI tool for initializing projects from different templates (PWA, Raw, Supabase).

## Installation

### Local Development

```bash
# Clone the repository
git clone https://github.com/your-username/templatable.git
cd templatable

# Install dependencies
bun install

# Link the CLI globally (for development)
bun link
```

### Usage

```bash
# Initialize a new project from a template
templatable init

# Show help
templatable help

# Show version
templatable version
```

## Available Templates

- **PWA**: Progressive Web App template
- **Raw**: Basic starter template
- **Supabase**: Template with Supabase integration

## Development

```bash
# Run the CLI directly
bun run src/index.ts init

# Build for production
bun run build
```

This project was created using `bun init`. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
