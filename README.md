# Pomodoro Timer Chrome Extension

A simple and effective Pomodoro timer Chrome extension to help you manage your work and break times.

## Features

- 25-minute Pomodoro sessions
- 5-minute short breaks
- 15-minute long breaks
- Desktop notifications
- Clean and intuitive interface

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Build the extension:
   ```bash
   pnpm run build
   ```
4. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` directory

## Development

- Run development mode:
  ```bash
  pnpm run dev
  ```
- The extension will automatically rebuild when you make changes

## Usage

1. Click the extension icon in your Chrome toolbar
2. Select your desired timer mode (Pomodoro, Short Break, or Long Break)
3. Click Start to begin the timer
4. Use Pause to temporarily stop the timer
5. Use Reset to return to the initial time for the current mode

## Permissions

This extension requires the following permissions:

- `storage`: To save your timer settings
- `alarms`: To manage the timer
- `notifications`: To show desktop notifications when the timer ends

## License

MIT
