# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2025-08-29

### =€ Major Features

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

### <¨ UI/UX Improvements

#### Interactive Content Features
- Added Starlight callouts system (note, tip, caution, danger) for better content organization
- Implemented auto-generated navigation from file structure
- Enhanced typography hierarchy for academic content presentation
- Professional legal documentation styling throughout

#### Navigation & Structure
- Reorganized homepage as Starlight splash page with clear call-to-action buttons
- Streamlined navigation structure focused on study materials
- Improved content discoverability with hierarchical organization

### =à Technical Improvements

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

### =Ý Content Updates

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

### =¨ Breaking Changes
- Homepage now uses Starlight splash template instead of custom blog layout
- Content structure reorganized for professional documentation presentation  
- Development server port changed from 4321 to 4323
- Content collections now require Starlight-compatible schemas

### <¯ Migration Notes
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