const APPS = [
  {
    id: "web-ui-servo-controller",
    title: "Web UI Servo Controller",
    desc: {
      en: "Control a servo from a browser dashboard with Arduino UNO Q and App Lab Web UI.",
      it: "Controlla un servo da dashboard web con Arduino UNO Q e Web UI di App Lab."
    },
    zip: "https://github.com/gerry-tech/gerry-uno-q-apps-dev/raw/refs/heads/main/apps/display-a-7-segmenti/Display%20a%207%20segmenti.zip",
    preview: "apps/display-a-7-segmenti/preview.jpeg",
    tags: ["web", "servo", "ui"],
    requires: {
      en: "Servo motor + jumper wires",
      it: "Servo + cavetti jumper"
    },
    badge: "TOP",
    new: true,
    featured: true,
    demo: "https://www.youtube.com/watch?v=O9AB-pAx9fA&t=306s",
    level: "beginner",
    date: "2026-02-16",
    downloads: 1042,
    estTime: "25 min",
    complexity: "Easy",
    pins: "D6",
    codePreviewCpp: `#include <Servo.h>

Servo servo;
void setup(){
  servo.attach(6);
}
void loop(){
  servo.write(90);
  delay(200);
}`,
    codePreviewPy: `from machine import Pin, PWM

servo = PWM(Pin(6), freq=50)

def set_angle(a):
    duty = int(1638 + (a/180)*819)
    servo.duty_u16(duty)

set_angle(90)`,
    codePreviewJs: `const slider = document.querySelector("#angle");
slider.addEventListener("input", async (e) => {
  await fetch('/servo?angle=' + e.target.value);
});`,
    codePreviewCss: `.servo-panel{
  display:grid;
  gap:12px;
  padding:16px;
  border-radius:14px;
  background:linear-gradient(135deg,#2a0c12,#46101a);
}`,
    codePreviewHtml: `<section class="servo-panel">
  <h3>Servo Controller</h3>
  <input id="angle" type="range" min="0" max="180" />
</section>`
  },
  {
    id: "matrix-animations-pack",
    title: "Matrix Animations Pack",
    desc: {
      en: "Ready-to-use animation pack for LED matrix projects (uint32_t format).",
      it: "Pacchetto animazioni pronto per progetti LED matrix (formato uint32_t)."
    },
    zip: "https://github.com/gerry-tech/gerry-uno-q-apps-dev/raw/refs/heads/main/apps/stickman/MatrixAnimation.zip",
    preview: "apps/stickman/preview.png",
    tags: ["matrix", "led", "animation"],
    requires: {
      en: "LED matrix display",
      it: "Display LED matrix"
    },
    badge: "BETA",
    demo: "https://www.youtube.com/watch?v=jkG8Zr1GLo0",
    level: "intermediate",
    date: "2026-02-12",
    downloads: 678,
    estTime: "40 min",
    complexity: "Medium",
    pins: "SPI + Matrix pins",
    codePreviewCpp: `const uint32_t frames[] = {
  0x3C424242,
  0x7E5A5A7E
};

for (uint8_t i=0; i<FRAME_COUNT; i++) {
  drawFrame(frames[i]);
}`,
    codePreviewPy: `frames = [0x3C424242, 0x7E5A5A7E]

for frame in frames:
    draw_frame(frame)
    sleep_ms(120)`,
    codePreviewJs: `const frames = [0x3C424242, 0x7E5A5A7E];
let i = 0;
setInterval(() => drawFrame(frames[i++ % frames.length]), 120);`,
    codePreviewCss: `.matrix-preview{
  width:220px;
  aspect-ratio:1;
  background:radial-gradient(circle,#ff365f 8%,#2c0b12 62%);
  border:1px solid rgba(255,255,255,0.2);
}`,
    codePreviewHtml: `<canvas class="matrix-preview" width="220" height="220"></canvas>`
  },
  {
    id: "reaction-time-test",
    title: "Reaction Time Test",
    desc: {
      en: "Web-based reaction game to benchmark responsiveness and latency.",
      it: "Gioco di riflessi via web per testare reattività e latenza."
    },
    zip: "https://github.com/gerry-tech/gerry-uno-q-apps-dev/raw/refs/heads/main/apps/reaction-time-test/ReactionTimeTest.zip",
    preview: "apps/reaction-time-test/preview.png",
    tags: ["web", "network", "testing"],
    requires: {
      en: "UNO Q + browser",
      it: "UNO Q + browser"
    },
    new: true,
    level: "beginner",
    date: "2026-02-10",
    downloads: 421,
    estTime: "30 min",
    complexity: "Easy",
    pins: "Wi-Fi only",
    codePreviewCpp: `server.on("/react", HTTP_GET, [](){
  const int ms = millis() - startTick;
  server.send(200, "application/json", String(ms));
});`,
    codePreviewPy: `@app.get("/react")
def react():
    ms = ticks_ms() - start_tick
    return {"reaction_ms": ms}`,
    codePreviewJs: `const start = performance.now();
document.querySelector("#tap").onclick = () => {
  const ms = Math.round(performance.now() - start);
  console.log({ reaction_ms: ms });
};`,
    codePreviewCss: `#tap{
  width:100%;
  padding:18px;
  border-radius:14px;
  border:1px solid rgba(255,255,255,0.2);
  background:#3a0d16;
  color:#fff;
}`,
    codePreviewHtml: `<button id="tap">Tap when ready</button>`
  },
  {
    id: "servo-roulette-lab",
    title: "Servo Roulette Lab",
    desc: {
      en: "Interactive roulette with servo mechanics, ideal for events and game prototypes.",
      it: "Roulette interattiva con meccanica servo, perfetta per eventi e prototipi game."
    },
    zip: "https://github.com/gerry-tech/gerry-uno-q-apps-dev/raw/refs/heads/main/apps/roulette-servo/Roulette.zip",
    preview: "apps/roulette-servo/preview.jpg",
    tags: ["servo", "game", "interactive"],
    requires: {
      en: "Servo + wheel or indicator arm",
      it: "Servo + ruota o lancetta"
    },
    featured: true,
    level: "intermediate",
    date: "2026-02-09",
    downloads: 533,
    estTime: "35 min",
    complexity: "Medium",
    pins: "D9",
    codePreviewCpp: `int spin = random(20, 120);
for (int i=0; i<spin; i++) {
  servo.write(i % 180);
  delay(18);
}`,
    codePreviewPy: `spin = urandom.randint(20, 120)
for i in range(spin):
    servo_write(i % 180)
    sleep_ms(18)`,
    codePreviewJs: `const spin = Math.floor(Math.random() * 100) + 20;
for (let i = 0; i < spin; i++) {
  queueServo(i % 180);
}`,
    codePreviewCss: `.roulette-wheel{
  width:200px;height:200px;border-radius:50%;
  background:conic-gradient(#ff365f,#ff6a3d,#a3122f,#ff9c80);
}`,
    codePreviewHtml: `<div class="roulette-wheel" aria-label="roulette"></div>`
  }
];
