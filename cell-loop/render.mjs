// usage: node render.mjs stills t1 t2 ...   |   node render.mjs video [fps]
import { createRequire } from 'node:module'; const { chromium } = createRequire(import.meta.url)('playwright');
import { spawn } from 'node:child_process';
import fs from 'node:fs';
const [mode='stills', ...args] = process.argv.slice(2);
const server = spawn('python3', ['-m','http.server','8765','--bind','127.0.0.1'], {stdio:'ignore'});
await new Promise(r=>setTimeout(r,800));
const browser = await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const page = await browser.newPage({viewport:{width:1080,height:1350}});
page.on('console', m => { if (m.type()==='error') console.log('page:', m.text()); });
page.on('pageerror', e => console.log('pageerror:', e.message));
await page.goto('http://127.0.0.1:8765/index.html');
await page.waitForFunction(() => window.ready === true, null, {timeout:30000});
fs.mkdirSync('out/frames', {recursive:true});
if (mode === 'stills') {
  for (const t of args) { await page.evaluate(t => window.renderAt(+t), t); await page.screenshot({path:`out/still_${t}.png`}); console.log('still', t); }
} else {
  const fps = +(args[0]||30), n = 30*fps;
  for (let i=0;i<n;i++) { await page.evaluate(t => window.renderAt(t), i/fps);
    await page.screenshot({path:`out/frames/f${String(i).padStart(4,'0')}.png`}); if(i%60==0) console.log('frame', i, '/', n); }
}
await browser.close(); server.kill();
