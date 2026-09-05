# Local customizations

This branch keeps personal changes separate from the upstream-compatible `main` branch.

## Main-window zoom shortcuts

- Handles the shortcuts in the main window and applies zoom through Tauri's WebView API.
- `Ctrl/Cmd` + `-` zooms out, `Ctrl/Cmd` + `=` zooms in, and platform-native reset behavior remains available.
- Integration points: `src/App.tsx` and `src/features/windows/pageZoom.ts`.

## Per-note surface always-on-top

- Adds an always-on-top toggle to note-pad and tile surfaces.
- Stores the preference in each note's entry in `metadata.json`.
- Existing notes default to the original always-on-top behavior for backward compatibility.
- Integration points: note metadata/commands in Rust and `src/components/NotePad.tsx`.
