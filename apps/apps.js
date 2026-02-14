const APPS = [
  {
    title: "Web UI Servo Controller",
    desc: "Controlla un servo da pagina web con Arduino UNO Q + Web UI.",
    zip: "apps/WebUIServo.zip",
    preview: "assets/previews/webui-servo.jpg",
    tags: ["web", "servo", "ui"],
    requires: "Servo + cavetti",
    badge: "TOP",     // grande in alto a sinistra
    new: true,        // mini NEW vicino al titolo
    demo: "https://www.youtube.com/watch?v=O9AB-pAx9fA&t=306s" // opzionale
  },
  {
    title: "Matrix Animations Pack",
    desc: "Set di animazioni pronte per LED matrix (formato uint32_t).",
    zip: "apps/MatrixPack.zip",
    preview: "assets/previews/matrix.jpg",
    tags: ["matrix", "led"],
    requires: "LED Matrix",
    badge: "BETA",    // solo badge, niente NEW
  },
  {
    title: "Ping Test",
    desc: "Esempio base per testare connessione e latenza via web.",
    zip: "apps/PingTest.zip",
    tags: ["web", "network"],
    new: true         // solo NEW
  }
];

