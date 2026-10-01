# Soudoco

A mobile Sudoku game built with **React Native** and **Expo**, featuring a clean interface, a built-in puzzle database, and satisfying sound effects.

![Platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS-blue)
![Framework](https://img.shields.io/badge/React%20Native-Expo-black)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Building the App](#building-the-app)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Soudoco is a cross-platform Sudoku game for Android and iOS. Players pick a puzzle from the home screen, fill in the grid, and get instant audio feedback for correct and incorrect moves. Puzzles and their solutions are stored locally, so the game works fully offline.

## Features

- 🧩 Classic 9×9 Sudoku gameplay
- 📦 Local puzzle database (`db/data.json`), no internet connection required
- ✅ Move validation against the stored solution
- 🔊 Sound effects for key actions (correct result, wrong move, delete, and more)
- 🪟 Modal dialogs for game events and results
- 📱 Optimized for mobile with adaptive icon and splash screen
- ☁️ Ready for cloud builds with Expo Application Services (EAS)

## Tech Stack

| Layer      | Technology                         |
| ---------- | ---------------------------------- |
| Framework  | React Native                       |
| Toolchain  | Expo                               |
| Language   | JavaScript (ES6+)                  |
| Data       | Local JSON (`db/data.json`)        |
| Builds     | EAS Build                          |

## Project Structure

```
soudoco/
├── App.js                 # App entry point
├── app.json               # Expo app configuration
├── eas.json               # EAS build profiles
├── babel.config.js        # Babel configuration
├── package.json
├── assets/
│   ├── icon.png
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── splash-00.png
│   └── Sounds/            # Game sound effects (.mp3)
├── components/
│   ├── Modle.js           # Modal dialog component
│   ├── RowBuilder.js      # Builds grid rows
│   ├── solTable.js        # Solution table logic/view
│   └── TheHeader.js       # App header
├── db/
│   └── data.json          # Puzzle and solution data
└── screens/
    ├── Home.js            # Landing / puzzle selection screen
    └── Game.js            # Main gameplay screen
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm or yarn
- [Expo Go](https://expo.dev/go) on your phone, or an Android/iOS emulator

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/soudoco.git
cd soudoco

# Install dependencies
npm install

# Start the development server
npx expo start
```

Then scan the QR code with Expo Go (Android) or the Camera app (iOS), or press `a` / `i` to open an emulator.

## Available Scripts

| Command                | Description                          |
| ---------------------- | ------------------------------------ |
| `npx expo start`       | Start the Expo development server    |
| `npx expo start -c`    | Start with a cleared Metro cache     |
| `npx expo start --android` | Open on an Android device/emulator |
| `npx expo start --ios` | Open on an iOS simulator (macOS)     |

## Building the App

Soudoco uses [EAS Build](https://docs.expo.dev/build/introduction/) for production builds.

```bash
# Install the EAS CLI
npm install -g eas-cli

# Log in to your Expo account
eas login

# Build an Android APK / AAB
eas build --platform android

# Build for iOS
eas build --platform ios
```

Build profiles can be adjusted in `eas.json`.

## Configuration

- **App name, icon, splash screen, package identifiers:** edit `app.json`
- **Build profiles (development, preview, production):** edit `eas.json`
- **Puzzles:** add or modify entries in `db/data.json`
- **Sounds:** replace files in `assets/Sounds/` (keep the same filenames, or update the references in code)

## Contributing

Contributions are welcome!

1. Fork the project
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "Add amazing feature"`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">Made with ❤️ using React Native & Expo</p>