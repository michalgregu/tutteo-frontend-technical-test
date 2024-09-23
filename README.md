# Audio Player

A Vue 3 and TypeScript implementation of a basic Spotify-like audio player using the Web Audio API.

## Features

- Play, pause, stop, next/previous track functionality
- Playlist functionality
- Timeline slider for seeking within tracks
- Display of current track information (title, artist, thumbnail)
- Volume control
- Basic audio visualization
- Responsive design for desktop and mobile
- Local audio file playback

## Technologies Used

- Vue 3 with Composition API
- TypeScript
- Web Audio API
- CSS Modules
- ESLint and Prettier for code formatting

## Project Setup

### Prerequisites

- Node.js (v14 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/michalgregu/tutteo-frontend-technical-test.git
   ```

2. Install dependencies:

   ```
   npm install
   ```

   or

   ```
   yarn
   ```

3. Run the development server:

   ```
   npm run dev
   ```

   or

   ```
   yarn dev
   ```

4. Open your browser and navigate to http://localhost:5173 (or the port specified in your console).

## Usage

1. Click the play button or on a track in the track list to start playback
2. Use the timeline slider to seek within the current track
3. Adjust volume using the volume slider
4. View basic audio visualization while tracks are playing
5. Use the playlist to skip to the next or previous track

## Browser Compatibility

This player has been tested and is compatible with:

- Google Chrome (latest)
- Mozilla Firefox (latest)
- Safari (latest)
- Microsoft Edge (latest)

## Known Limitations

- This player currently only supports local audio files

## License

This project is open source and available under the MIT License.

## Acknowledgements

- Audio tracks used in this project are royalty-free and sourced from Bensound.com.
- Icons provided by Font-Awesome.
