/* ---------- MUSIC ----------
   One <audio id="bg-audio" src="Jimin.mp3" loop>. Slides never touch it,
   so it cannot restart or double up. Browsers need a tap to allow sound,
   so the overlay button starts music and the slideshow together. */
window.addEventListener("DOMContentLoaded", function () {
  var overlay = document.getElementById("music-overlay");
  var audio = document.getElementById("bg-audio");
  var toggle = document.getElementById("music-toggle");
  var started = false;

  function syncToggle() {
    toggle.textContent = audio.paused ? "🔇" : "🎶";
    toggle.setAttribute("aria-label", audio.paused ? "Play music" : "Pause music");
  }
  audio.addEventListener("play", syncToggle);
  audio.addEventListener("pause", syncToggle);

  function begin() {
    if (started) return;
    started = true;
    audio.volume = 0.82;
    var p = audio.play();
    if (p !== undefined) {
      p.catch(function () { syncToggle(); }); // blocked: the toggle lets them retry
    }
    overlay.classList.add("hide");
    toggle.hidden = false;
    syncToggle();
    startShow();
  }
  // A click covers both mouse and touch taps; the button's click bubbles to the overlay.
  overlay.addEventListener("click", begin);

  toggle.addEventListener("click", function () {
    if (audio.paused) {
      var p = audio.play();
      if (p !== undefined) p.catch(function () {});
    } else {
      audio.pause();
    }
  });
});

/* ---------- SLIDE DATA ---------- */
// {text, [emoji], [img], style}
const SLIDES = [
  {text: "Happy Birthday, Love! Another year older and still my favourite person to annoy. 🎈", style:0, emoji:"🎈"},
  {text: "Today's rules: no stress, no excuses, no being modest. You're the boss of the day.", style:1, emoji:"👑"},
  {text: "Remember that cafe? You forgot your keys and I quietly picked them up. 🔑", style:2, emoji:"☕"},
  {text: "While I said nothing. I gave them back eventually. You're welcome. 😇", style:13, emoji:"🕵️"},
  {text: "Warning: this slideshow contains an unsafe amount of me being sappy. Brace yourself.", style:3, emoji:"🚨"},
  {text: "Cake first, questions later. Calories don't count on birthdays. 🍰", style:4, emoji:"🍰", img:"https://media.giphy.com/media/3o7TKxOhhZmQfYSCti/giphy.gif"},
  {text: "You're not getting older, you're getting upgraded. I approve of the update.", style:5, emoji:"✨"},
  {text: "Plot twist: you look this good and you're practically ancient. 😏", style:6, emoji:"😎"},
  {text: "Fun fact: my mind's screen time is mostly you. Zero regrets.", style:7, emoji:"🔋"},
  {text: "Blow out the candles and wish big. I'm secretly hoping I'm in the wish. 🕯️", style:8, emoji:"🕯️"},
  {text: "Here's to more laughs, more snacks, and you pretending my jokes are funny.", style:9, emoji:"🎉"},
  {text: "This year's forecast: 90% chaos, 10% cake, 100% me annoying you.", style:10, emoji:"🌈"},
  {text: "New chapter, same guy who still thinks he's the funny one.", style:11, emoji:"📖"},
  {text: "Remember the mandir? I was supposed to be praying. I was looking at you instead. Sorry, Bhagwan ji. 😅", style:12, emoji:"🙏"},
  {text: "Sending a virtual hug. The real one costs extra, payable in Kinder Joy 😌.", style:13, emoji:"🤗"},
  {text: "Your smile is the reason I forgive you for pretty much everything.", style:14, emoji:"😁"},
  {text: "Birthday maths: you + cake + a lazy day = my favourite equation.", style:15, emoji:"🧮"},
  {text: "May your phone fill with wishes. Only one of them matters. (Kidding. Mostly.)", style:16, emoji:"💌"},
  {text: "A mountain of presents? Nice. A mountain of cake? Better. Both? Perfect.", style:17, emoji:"🏔️"},
  {text: "Surprise! You're a year older. Don't worry, I'll still hold your hand to cross the road.", style:18, emoji:"🎁"},
  {text: "Dream big this year. Nap bigger. You've earned it.", style:19, emoji:"😴"},
  {text: "Seriously cute. That's not a birthday wish, it's just a fact.", style:20, emoji:"💕"},
  {text: "Life's better with you in it. There, I said it. Don't make it weird.", style:21, emoji:"🌻"},
  {text: "Lucky by name, and honestly lucky to have me. You're welcome. 😏", style:22, emoji:"🍀"},
  {text: "Cheers to another year of you being exactly you. Please never update to a boring version `kyunki vo to mein hu🥲`. 🥂", style:23, emoji:"🥂"},
  {text: "Be kind to yourself today. And to the last slice of cake.", style:24, emoji:"🌞"},
  {text: "Everybody loves you, but I've got the best seat in the house.", style:25, emoji:"💜"},
  {text: "Today's schedule: relax, eat, repeat. Ignore everything else.", style:26, emoji:"🧸"},
  {text: "Hop into the new year like a caffeinated bunny. I'll be right behind you.", style:27, emoji:"🐇"},
  {text: "Keep thriving. Keep sparkling. And keep making me smile at my phone like an idiot. 😅", style:28, emoji:"🌟"},
  {text: "Go paint the town any colour you like. Then tell me every detail. 🎨", style:29, emoji:"🎨"},
  {text: "Turn the music up. Then turn the lights down. And imagine me saying all this to you. 😏", style:30, emoji:"🎶"},
  {text: "A rainbow of wishes, none about Mondays. And one that's none of your business.", style:31, emoji:"🌈"},
  {text: "Go make memories today. Take pictures. Send me at least one. 📸", style:32, emoji:"📸"},
  {text: "You work hard. You deserve this day. Do nothing, guilt-free. 🦄", style:33, emoji:"🦄"},
  {text: "This year: more adventures, more laughs, and more time together. That's my real wish. 🎊", style:14, emoji:"🎊"},
  {text: "Never forget how amazing you are, Lucky. I'll remind you. Loudly.", style:20, emoji:"👍"},
  {text: "Smile, sparkle, repeat. That's the whole plan.", style:9, emoji:"🥰"},
  {text: "You're my lucky star. Yes, uncle pun 😆. Yes, you love it.", style:2, emoji:"🌟"},
];

/* ---------- SLIDE CREATION ---------- */
const SLIDE_MS = 5000;
const slidesContainer = document.getElementById("all-slides-container");
const endingFrame = document.getElementById("ending-frame");
const slideElems = [];

SLIDES.forEach((s, idx) => {
  const slide = document.createElement("div");
  slide.className = `slide style${s.style !== undefined ? s.style : idx % 34}`;
  slide.id = `slide${idx}`;
  let html = "";
  if (s.emoji) html += `<div class="emoji-large">${s.emoji}</div>`;
  html += `<div class="slide-text">${s.text}</div>`;
  if (s.img) html += `<img src="${s.img}" alt="birthday gif" onerror="this.remove()" />`;
  slide.innerHTML = html;
  slidesContainer.appendChild(slide);
  slideElems.push(slide);
});

/* ---------- SLIDESHOW ---------- */
let current = -1;
let timer = null;
let running = false;

function showSlide(i) {
  slideElems.forEach((el, k) => el.classList.toggle("is-active", k === i));
}

function nextSlide() {
  clearTimeout(timer);
  current++;
  if (current < slideElems.length) {
    showSlide(current);
    timer = setTimeout(nextSlide, SLIDE_MS);
  } else {
    showEnding();
  }
}

function startShow() {
  if (running) return;
  running = true;
  nextSlide();
}

// Tap anywhere on a slide to skip ahead (music is untouched)
slidesContainer.addEventListener("click", function () {
  if (running && current >= 0 && current < slideElems.length) nextSlide();
});

// Tap the ending card to replay (music keeps playing)
function replay() {
  endingFrame.classList.remove("is-visible");
  current = -1;
  nextSlide();
}
endingFrame.addEventListener("click", replay);
endingFrame.addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); replay(); }
});

/* ---------- ENDING CARD ---------- */
function drawEnding() {
  const canvas = endingFrame.querySelector(".ending--canvas");
  const w = endingFrame.clientWidth;
  const h = endingFrame.clientHeight;
  if (!w || !h) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";

  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  const s = Math.max(0.55, Math.min(1, Math.min(w, h) / 380));

  function doodleFlower(x, y, sc) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(sc, sc);
    ctx.rotate(-0.18);
    ctx.globalAlpha = 0.75;
    ctx.beginPath();
    for (let i = 0; i < 8; i++) ctx.ellipse(0, 24, 12, 24, i * (Math.PI / 4), 0, Math.PI * 2);
    ctx.fillStyle = "#fbe9ff";
    ctx.fill();
    ctx.beginPath();
    for (let i = 0; i < 8; i++) ctx.ellipse(0, 22, 10, 17, i * (Math.PI / 4), 0, Math.PI * 2);
    ctx.fillStyle = "#f9daf2";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.fillStyle = "#ea83c6";
    ctx.fill();
    ctx.restore();
  }

  doodleFlower(52 * s, h - 52 * s, s);
  doodleFlower(w - 52 * s, 52 * s, s * 0.85);

  ctx.globalAlpha = 1;
  ctx.textAlign = "center";

  ctx.font = `700 ${Math.round(Math.min(w * 0.095, 54))}px 'Caveat', cursive`;
  ctx.fillStyle = "#c17ecb";
  ctx.shadowColor = "#f1e1f8";
  ctx.shadowBlur = 10;
  ctx.fillText("Happy Birthday, Lucky!", w / 2, h * 0.27, w * 0.86);

  ctx.shadowBlur = 0;
  ctx.font = `700 ${Math.round(Math.min(w * 0.04, 18))}px 'Quicksand', sans-serif`;
  ctx.fillStyle = "#9f76a1";
  ctx.fillText("– cake first, then me –", w / 2, h * 0.27 + Math.min(w * 0.075, 34), w * 0.86);

  ctx.save();
  ctx.translate(w - 52 * s, h - 60 * s);
  ctx.scale(s, s);
  ctx.rotate(-0.15);
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.moveTo(0, 15);
  ctx.bezierCurveTo(0, -20, 38, -11, 0, 30);
  ctx.bezierCurveTo(-38, -11, 0, -20, 0, 15);
  ctx.closePath();
  ctx.fillStyle = "#ffb7e2";
  ctx.fill();
  ctx.restore();
}

function showEnding() {
  slideElems.forEach((el) => el.classList.remove("is-active"));
  endingFrame.classList.add("is-visible");
  drawEnding();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      if (endingFrame.classList.contains("is-visible")) drawEnding();
    });
  }
}

// One resize listener, registered once
window.addEventListener("resize", function () {
  if (endingFrame.classList.contains("is-visible")) drawEnding();
});
