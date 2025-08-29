# Changelog

All notable changes to this project will be documented in this file.

## [2.1.0] - 2025-08-29

### 🖼️ Interactive Lightbox System
- **NEW**: Click any image to open interactive lightbox with advanced functionality
- **Smooth Zoom**: 10% incremental zoom up to 5x magnification for detailed examination
- **Pan & Drag**: Navigate zoomed images with mouse dragging for flowchart exploration  
- **Download Support**: Download original images with preserved filenames
- **Keyboard Controls**: ESC (close), +/- (zoom), 0 (reset) for efficient navigation
- **Mouse Wheel Zoom**: Intuitive scroll-to-zoom functionality
- **Mobile Support**: Touch gestures and responsive design for all devices

### 🎨 Enhanced Theme & Typography
- **Improved Dark Mode**: Refined color palette (#0f172a backgrounds) with excellent contrast (#e2e8f0 text)
- **Typography Balance**: Scaled down oversized headers while enlarging body text to 1.1rem
- **Modern Color Scheme**: Clean blue accent (#0284c7) replacing previous brown tones
- **Search Visibility**: Fixed white-on-white search box issues in both light and dark modes
- **Professional Presentation**: Optimized for extended reading sessions

### 📄 Automated Content Enhancement  
- **Plain Markdown → Starlight**: Automated transformation system for Obsidian notes
- **Pattern Recognition**: Converts definitions, cases, tips, and elements to Starlight callouts
- **Legal Badges**: Section references (s 55) automatically styled with badges
- **Repeatable Process**: `npm run sync:enhanced` for ongoing content additions
- **Schema Validation**: Enhanced content collections with publish flag support

### 🏗️ Technical Infrastructure
- **Static Site Generation**: Migrated from SSR to optimized static output for Cloudflare Pages
- **Global Script Loading**: Starlight-compatible lightbox implementation
- **Build Optimization**: Post-build cleanup with comprehensive logging
- **Content Pipeline**: Enhanced sync scripts for automatic transformation
- **Component Architecture**: Reusable lightbox system for all documentation images

### 📚 Content Management
- **Filtered Publishing**: Only 11 notes with `publish: true` displayed (down from 30+ total)
- **Enhanced Navigation**: Organized sidebar with Evidence Law and Commercial Law sections  
- **Simplified Homepage**: Clean "Recent Study Materials" replacing cluttered featured cards
- **Professional Structure**: Academic course organization with logical hierarchies

### 🔧 Developer Experience  
- **Transformation Prompts**: Documented patterns for automatic content enhancement
- **Enhanced Documentation**: Updated AGENTS.md with comprehensive usage examples
- **Improved README**: Current feature set and lightbox functionality described
- **Build Process**: Streamlined deployment with Cloudflare Pages integration

### 🐛 Bug Fixes
- **Lightbox Integration**: Resolved MDX import issues causing visible text rendering
- **Component Loading**: Fixed Starlight compatibility with global script approach
- **Image Interactions**: Smooth zoom increments replacing jarring 2x jumps
- **File Extensions**: Proper .mdx handling for component imports
- **Search Styling**: Consistent visibility across all theme modes

---

## [2.0.0] - 2025-08-29

### =� Major Features

#### Starlight Documentation Framework Integration
- **BREAKING**: Migrated from custom blog layout to professional Starlight documentation framework
- Added comprehensive documentation structure for legal study materials
- Integrated auto-generated sidebar navigation and table of contents
- Enhanced content presentation with professional academic styling

#### Professional Legal Theme Redesign
- Implemented navy blue (#263240) and gold (#B59F7B) color palette for professional legal aesthetics  
- Upgraded typography with Inter (headers) and Newsreader (body) fonts for enhanced readability
- Added modern RB monogram header design with gradient effects
- Responsive mobile-first design optimized for study on any device

#### Enhanced Content Management System
- **NEW**: `src/content/docs/` collection for Starlight-powered study materials
- Enhanced Obsidian vault integration with selective publishing (`publish: true` flag)
- Added comprehensive study guides with interactive callouts and professional formatting
- Improved content schema validation and type safety

### <� UI/UX Improvements

#### Interactive Content Features
- Added Starlight callouts system (note, tip, caution, danger) for better content organization
- Implemented auto-generated navigation from file structure
- Enhanced typography hierarchy for academic content presentation
- Professional legal documentation styling throughout

#### Navigation & Structure
- Reorganized homepage as Starlight splash page with clear call-to-action buttons
- Streamlined navigation structure focused on study materials
- Improved content discoverability with hierarchical organization

### =� Technical Improvements

#### Architecture Updates
- **BREAKING**: Updated content configuration to support Starlight `docsSchema`
- Fixed content collection recognition issues between `config.ts` and `content.config.ts`
- Improved development server configuration (now runs on port 4323)
- Enhanced build process with better error handling

#### Dependencies & Configuration
- Updated Astro configuration for Starlight integration
- Resolved dependency conflicts with hast-util-raw and related packages
- Improved content sync process for Obsidian vault integration
- Enhanced development workflow with better debugging capabilities

### =� Content Updates

#### Study Materials
- **NEW**: Week 7 Hearsay Evidence Study Guide - Comprehensive legal analysis with:
  - Core concepts and learning objectives
  - Detailed exception analysis and case law
  - Interactive quiz with answer key
  - Comprehensive glossary of legal terms
  - Essay format questions for exam preparation

#### Documentation
- Updated README.md with complete Starlight setup instructions
- Enhanced AGENTS.md with current architecture details
- Added comprehensive deployment and troubleshooting guides
- Improved content management workflow documentation

### =' Bug Fixes
- Fixed content collection recognition preventing Starlight from loading
- Resolved icon format issues in hero action buttons
- Corrected development server port conflicts
- Fixed frontmatter validation errors in Starlight schema

### =� Breaking Changes
- Homepage now uses Starlight splash template instead of custom blog layout
- Content structure reorganized for professional documentation presentation  
- Development server port changed from 4321 to 4323
- Content collections now require Starlight-compatible schemas

### <� Migration Notes
For existing users:
1. Run `npm install` to update dependencies
2. Content will automatically migrate to new Starlight structure
3. Update any custom CSS to work with new theme system
4. Review content frontmatter for Starlight compatibility

---

## [1.0.0] - 2025-08-28

### Initial Release
- Astro static site generator with Cloudflare Workers deployment
- Basic blog functionality with markdown support
- Obsidian vault integration for university notes
- Professional legal styling foundation