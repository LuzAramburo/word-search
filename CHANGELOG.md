
# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.3.0] - 2026-04-04

### Fixed
- Tournament game `handleRoundEnd` no longer causes infinite re-renders (stale closure fix)
- `ProtectedRoute` correctly redirects to tournament lobby when no tournament is in store
- Fixed `exhaustive-deps` lint warning in Toast component
- Fixed typo in `setToastPayload` interface name

### Changed
- Updated Firebase and related dependencies to latest versions
- Removed unused `react-firebase-hooks` dependency

## [1.2.0] - 2026-04-03

### Added
- Docker support with multi-stage build for development and local production testing

### Fixed
- Vite HMR not working in Docker on Windows (switched to polling mode)

## [1.1.2]

### Fixed
- Tournament mode works again

### Added
- Anonymous login added

## [1.1.1] - 2024-01-03

### Added
- More words for almost each category

### Fixed
- Improved grid generation.

## [1.1.0] - 2024-01-03

### Added
- Grid debug mode for better DX
- Touch support
- Better support for small screens
- Only highlight letter if they follow the direction of the word

## [1.0.1] - 2024-01-03

### Fixed

- Grid updates on settings change
- Fixed SEO

### Added

- License added
- Added example of env file
- Added this changelog :)

### Changed

- Updated README
- Limited attempts to place word

## [1.0.0] - 2024-01-03

### Added
- Initial release of the word search game.
- Basic single-player mode.
- Firebase Auth integration for user authentication with Google account.
- Firestore database for storing user data and tournaments.
