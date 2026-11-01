# Animal cell loop

A seamless 30-second 3D animal cell dashboard video: 1080×1350, 30 fps, H.264.

- `index.html` is one self-contained page: a three.js cell, glass HUD panels, and labels drawn on a canvas overlay. `renderAt(t)` is deterministic, so the same `t` always gives the same frame.
- Every motion uses an integer frequency over `LOOP = 30`. The cell makes exactly one turn per loop, so the last frame flows into the first.
- Open it live with `python3 -m http.server` and go to `http://localhost:8000/index.html`.

## Render

```bash
npm install
node render.mjs stills 0 4.5 13      # PNG stills in out/
node render.mjs video 30             # 900 frames in out/frames/
ffmpeg -framerate 30 -i out/frames/f%04d.png -c:v libx264 -crf 18 -pix_fmt yuv420p out/animal-cell-loop.mp4
```

Replace `@yourhandle` in `index.html` with your own handle.

## The tour

| Time (s) | Stop |
|---|---|
| 0–1.6 | Back view, fast turn to the cut-away (overview labels draw on) |
| 3.2 | Nucleus |
| 6.4 | Nucleolus |
| 9.2 | Rough ER |
| 12.0 | Golgi apparatus |
| 14.8 | Smooth ER |
| 17.4 | Mitochondrion |
| 20.0 | Vesicles |
| 22.0 | Lysosome |
| 23.8 | Centrosome |
| 25.6 | Plasma membrane |
| 27–30 | Pull out, overview labels, spin to the back (= frame 1) |

## Interactive demo

`demo/` is a standalone version with play/pause, a timeline scrubber, and buttons that fly to each organelle. Serve the folder and open `demo/index.html`. Space toggles play; the arrow keys step one second.
