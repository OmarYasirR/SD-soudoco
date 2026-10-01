# SD-Soudoco

**A Sudanese music crossword game for mobile.**
Guess the artist, find the song, and fill the grid — one square at a time.

![Platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS-blue)
![Framework](https://img.shields.io/badge/React%20Native-Expo-informational)
![Status](https://img.shields.io/badge/status-in%20development-orange)

---

## 📖 About

**Soudoco** is a crossword-style puzzle game celebrating Sudanese music. The board is made of squares arranged in **horizontal rows** and **vertical columns**:

- Each **horizontal row** represents a **song**.
- The **vertical column** holds the **artist's name**, written as a traditional **three-part Sudanese name** (first name, father's name, grandfather's name).
- The player must place the **correct letter/sign** in the **common square** where the vertical column crosses a horizontal row. That square points to the artist and unlocks the song that belongs to him.

Solve every row correctly to complete the puzzle and reveal the full solution.

---

## 🎮 How to Play

1. Start a game from the **Home** screen.
2. Read the current horizontal row (the song).
3. Look at the **vertical column**, which spells the artist's name.
4. Choose the correct letter for the **intersection square** between the vertical column and the horizontal row.
5. A correct answer links the artist to his song; a wrong one plays an error sound and lets you try again.
6. Finish all rows to see the solution table and your result.

---

## ✨ Features

- 🧩 Crossword-style grid with horizontal and vertical squares
- 🎤 Sudanese artists with **three-part names**, each matched to a song
- 🔊 Sound effects for correct answers, errors, spinning, deleting, plus background music
- 🪟 Modal dialogs for results and feedback
- 📊 Solution table displayed at the end of a round
- 🗂️ Content stored in a JSON file, so adding artists and songs needs no code changes
- 📱 Cross-platform (Android & iOS) via Expo

---

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | React Native |
| Tooling | Expo, EAS Build |
| Language | JavaScript (ES6+) |
| Data | Local JSON (`db/data.json`) |
| Audio | MP3 sound effects (`assets/Sounds`) |

---

## 📁 Project Structure

```
soudoco
├── App.js                 # App entry point
├── app.json               # Expo configuration
├── eas.json               # EAS build profiles
├── babel.config.js        # Babel configuration
├── package.json
├── assets
│   ├── icon.png
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── splash-00.png
│   └── Sounds             # delete, goodresult, main, ping, wood-spin, wrong-buzzer
├── components
│   ├── TheHeader.js       # Top header bar
│   ├── RowBuilder.js      # Builds each horizontal row of squares
│   ├── solTable.js        # Solution table
│   └── Modle.js           # Modal dialog
├── db
│   └── data.json          # Artists and songs
└── screens
    ├── Home.js            # Landing screen
    └── Game.js            # Main game screen
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm or yarn
- [Expo Go](https://expo.dev/go) on your phone, or an Android/iOS emulator

### Installation

```bash
# Clone the repository
git clone <your-repository-url>
cd soudoco

# Install dependencies
npm install

# Start the development server
npx expo start
```

Scan the QR code with Expo Go, or press `a` (Android) / `i` (iOS) to open an emulator.

### Build for Production

```bash
npm install -g eas-cli
eas login
eas build --platform android   # or ios
```

---

## 🗃️ Adding Artists & Songs

Game content lives in `db/data.json`. To add a new puzzle entry, add an object with the artist's full three-part name and his song, keeping the structure consistent with the existing entries.

Example (adapt to the actual schema in `data.json`):

```json
{
  "artist": "First Father Grandfather",
  "song": "Song Title"
}
```

---

## 🗺️ Roadmap

- [ ] More artists and songs
- [ ] Difficulty levels
- [ ] Hints and score system
- [ ] Arabic / English language toggle
- [ ] Online leaderboard

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the project
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---


## 📄 License

Distributed under the MIT License. See `LICENSE` for details.

---

## 👤 Author

**Omar Yasir**
GitHub: [OmarYasirR](https://github.com/omarYasirR)

---

<p align="center">Made with ❤️ for Sudanese music lovers</p>