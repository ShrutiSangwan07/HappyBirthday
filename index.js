 // Music Autoplay Fix: user gesture required in browsers for <audio>
 window.addEventListener("DOMContentLoaded", function() {
	var overlay = document.getElementById('music-overlay');
	var btn = document.getElementById('start-music-btn');
	var audio = document.getElementById('bg-audio');

	// Failsafe: also allow anywhere on overlay to start music
	function startMusic() {
	  if(audio.paused) {
		audio.volume = 0.82;
		// Try to play the audio. Some platforms (Safari) require promise chain
		var playPromise = audio.play();
		if(playPromise !== undefined){
		  playPromise.then(_ => {
			// Music started
		  }).catch(err => {
			// Handle error, show message
			btn.textContent = "🔄 Tap Again to Enable Music";
		  });
		}
	  }
	  // Hide overlay regardless
	  overlay.style.display = "none";
	}
	btn.addEventListener('click', startMusic, {once:true});
	overlay.addEventListener('click', startMusic, {once:true});
	btn.addEventListener('touchstart', startMusic, {once:true});
	overlay.addEventListener('touchstart', startMusic, {once:true});

	// Accessibility: If overlay hidden or audio started by some chance, hide overlay
	audio.addEventListener('playing', function() {
	  overlay.style.display = "none";
	});
  });

  /* --- SLIDE DATA --- */
  // Array of {text, [emoji], [optional image/gif], [custom style]}
  // Diverse wishes, make the count ~36 (can repeat creative patterns).
  const SLIDES = [
	{text: "Wishing you a truly wonderful Birthday! 🎈", style:0, emoji:"🎈"},
	{text: "May your day be full of warm hugs and little joys!", style:1, emoji:"🤗"},
	{text: "Big laughs and sweet surprises await you!", style:2, emoji:"😂✨"},
	{text: "Sending tons of birthday love your way!", style:3, emoji:"💖"},
	{text: "Hope your cake is as sweet as you! 🍰", style:4, emoji:"🍰", img:"https://media.giphy.com/media/3o7TKxOhhZmQfYSCti/giphy.gif"},
	{text: "May every hour today sparkle bright ✨", style:5, emoji:"✨"},
	{text: "Keep shining, birthday star!", style:6, emoji:"🌟"},
	{text: "Dance like nobody's watching! 🕺", style:7, emoji:"💃"},
	{text: "Blow out those candles and wish BIG!", style:8, emoji:"🕯️"},
	{text: "Here's to more laughter, fun, and magical memories! 🎉", style:9, emoji:"🎉"},
	{text: "May your year be sprinkled with adventures!", style:10, emoji:"🌈"},
	{text: "To another chapter of amazing YOU!", style:11, emoji:"📖"},
	{text: "Balloons, confetti, and celebration for you!", style:12, emoji:"🎈🎉"},
	{text: "Sending virtual hugs and all good vibes today!", style:13, emoji:"🤗"},
	{text: "Your smile lights up the room. Keep smiling!", style:14, emoji:"😁"},
	{text: "Cherish every moment with friends and family.", style:15, emoji:"👨‍👩‍👧‍👦"},
	{text: "May your journey this year overflow with joy", style:16, emoji:"🌸"},
	{text: "Enjoy a mountain of happiness today!", style:17, emoji:"🏔️"},
	{text: "Hope your day is filled with delightful surprises!", style:18, emoji:"🎁"},
	{text: "Let your dreams fly ever higher this year.", style:19, emoji:"🦋"},
	{text: "Your heart is even more beautiful than your smile.", style:20, emoji:"💕"},
	{text: "Truly grateful for your friendship!", style:21, emoji:"🌻"},
	{text: "Bask in the glow of your awesomeness!", style:22, emoji:"🔥"},
	{text: "Cheers to all your amazing milestones!", style:23, emoji:"🥂"},
	{text: "Let joy and kindness lead your way!", style:24, emoji:"🌞"},
	{text: "Remember, you are loved by so many.", style:25, emoji:"💜"},
	{text: "Have a chill day, relax and enjoy!", style:26, emoji:"🧸"},
	{text: "Hop into this new year of life with positivity!", style:27, emoji:"🐇"},
	{text: "Keep shining, keep thriving, keep being you!", style:28, emoji:"🌟"},
	{text: "Paint your world with beautiful colors!", style:29, emoji:"🎨"},
	{text: "Let music and laughter fill the air!", style:30, emoji:"🎶"},
	{text: "Sending you a rainbow of happy wishes!", style:31, emoji:"🌈"},
	{text: "Go out and make magical memories!", style:32, emoji:"🪄"},
	{text: "Be proud of the awesome soul you are!", style:33, emoji:"🦄"},
	{text: "May this year surprise you with happiness!", style:14, emoji:"🎊"},
	{text: "Never forget how amazing you are.", style:20, emoji:"👍"},
	{text: "Smile, sparkle, repeat!", style:9, emoji:"🥰"},
	{text: "You’re a star, today and always.", style:2, emoji:"🌟"},
  ];
  // 36 items, so about 36 slides

  /* --- SLIDE CREATION --- */
  const slidesContainer = document.getElementById("all-slides-container");
  const slideElems = [];
  SLIDES.forEach((s, idx) => {
	// For each slide, create a styled div
	const slide = document.createElement('div');
	slide.className = `slide style${(s.style!==undefined?s.style:(idx%34))}`;
	// Add a unique id in case we need
	slide.id = `slide${idx}`;
	// Slide inner
	let html = '';
	// Add emoji and/or image or gif
	if (s.emoji) html += `<div class="emoji-large">${s.emoji}</div>`;
	// Add main text
	html += `<div class="slide-text">${s.text}</div>`;
	// Optionally, add an image/gif
	if (s.img) html += `<img src="${s.img}" alt="birthday gif" />`;
	slide.innerHTML = html;
	slidesContainer.appendChild(slide);
	slideElems.push(slide);
	// Hide except first slide
	if (idx !== 0) slide.style.display = "none";
  });

  // Ending slide is outside dynamic slides (canvas etc.)
  const endingFrame = document.getElementById("ending-frame");
  endingFrame.style.display = 'none';

  // ---- Slide Animation Logic ----
  // Show each slide for 5 seconds, then next (last: show endingFrame)
  let curr = 0;
  function showSlide(idx) {
	// Hide all
	slideElems.forEach((slide, i) => { slide.style.display = i === idx ? "flex" : "none"; });
	endingFrame.style.display = "none";
  }

  function showEnding() {
	slideElems.forEach((slide, i) => { slide.style.display = "none"; });
	endingFrame.style.display = "flex";
	// Draw on canvas
	const endingCanvas = document.querySelector(".ending--canvas");
	function fitCanvasToFrame(canvas, frame) {
	  let rect = frame.getBoundingClientRect();
	  let dpr = window.devicePixelRatio || 1;
	  let width = Math.floor(rect.width);
	  let height = Math.floor(rect.height);
	  canvas.width = width * dpr;
	  canvas.height = height * dpr;
	  canvas.style.width = width + "px";
	  canvas.style.height = height + "px";
	  return { width: canvas.width, height: canvas.height, dpr };
	}
	let sizing = fitCanvasToFrame(endingCanvas, endingFrame);

	let ctx2 = endingCanvas.getContext("2d");
	ctx2.setTransform(1,0,0,1,0,0);
	ctx2.clearRect(0,0,endingCanvas.width,endingCanvas.height);

	// Draw hand-drawn flower, message, heart
	function doodleFlower(x, y, scale=1) {
	  ctx2.save();
	  ctx2.translate(x, y);
	  ctx2.scale(scale, scale);
	  ctx2.rotate(-0.18);
	  ctx2.globalAlpha = 0.75;
	  ctx2.beginPath();
	  for(let i=0;i<8;i++) {
		ctx2.ellipse(0, 24, 12, 24, i*(Math.PI/4), 0, Math.PI*2);
	  }
	  ctx2.fillStyle = "#fbe9ff";
	  ctx2.fill();
	  ctx2.beginPath();
	  for(let i=0;i<8;i++) {
		ctx2.ellipse(0, 22, 10, 17, i*(Math.PI/4), 0, Math.PI*2);
	  }
	  ctx2.fillStyle = "#f9daf2";
	  ctx2.fill();
	  ctx2.beginPath();
	  ctx2.arc(0,0,14,0,Math.PI*2);
	  ctx2.fillStyle = "#ea83c6";
	  ctx2.fill();
	  ctx2.restore();
	}
	let flowerPad = Math.round(68 * sizing.dpr);
	let flowerPad2 = Math.round(85 * sizing.dpr);
	doodleFlower(flowerPad,endingCanvas.height-56*sizing.dpr,1*sizing.dpr);
	doodleFlower(endingCanvas.width-flowerPad2,65*sizing.dpr,0.85*sizing.dpr);

	ctx2.globalAlpha = 1;
	ctx2.font = `${Math.round(2.15*18*sizing.dpr)}px 'Caveat',cursive`;
	ctx2.fillStyle = "#c17ecb";
	ctx2.textAlign = "center";
	ctx2.shadowColor = "#f1e1f8";
	ctx2.shadowBlur = 10 * sizing.dpr;
	ctx2.fillText("Enjoy Your Special Day!", endingCanvas.width/2, 190*sizing.dpr);

	ctx2.shadowBlur = 0;
	ctx2.font = `${Math.round(1.22*16*sizing.dpr)}px 'Quicksand',sans-serif`;
	ctx2.fillStyle = "#9f76a1";
	ctx2.fillText("– And may this year overflow with gentle moments –", endingCanvas.width/2, 243*sizing.dpr);

	ctx2.save();
	ctx2.translate(endingCanvas.width-78*sizing.dpr, endingCanvas.height-55*sizing.dpr);
	ctx2.rotate(-0.15);
	ctx2.globalAlpha = 0.7;
	ctx2.beginPath();
	ctx2.moveTo(0,15*sizing.dpr);
	ctx2.bezierCurveTo(0,-20*sizing.dpr, 38*sizing.dpr,-11*sizing.dpr, 0,30*sizing.dpr);
	ctx2.bezierCurveTo(-38*sizing.dpr,-11*sizing.dpr, 0,-20*sizing.dpr, 0,15*sizing.dpr);
	ctx2.closePath();
	ctx2.fillStyle = "#ffb7e2";
	ctx2.fill();
	ctx2.restore();

	window.addEventListener('resize', function() {
	  sizing = fitCanvasToFrame(endingCanvas, endingFrame);
	  ctx2.setTransform(1,0,0,1,0,0);
	  ctx2.clearRect(0,0,endingCanvas.width,endingCanvas.height);
	  doodleFlower(flowerPad,endingCanvas.height-56*sizing.dpr,1*sizing.dpr);
	  doodleFlower(endingCanvas.width-flowerPad2,65*sizing.dpr,0.85*sizing.dpr);

	  ctx2.globalAlpha = 1;
	  ctx2.font = `${Math.round(2.15*18*sizing.dpr)}px 'Caveat',cursive`;
	  ctx2.fillStyle = "#c17ecb";
	  ctx2.textAlign = "center";
	  ctx2.shadowColor = "#f1e1f8";
	  ctx2.shadowBlur = 10 * sizing.dpr;
	  ctx2.fillText("Enjoy Your Special Day!", endingCanvas.width/2, 190*sizing.dpr);

	  ctx2.shadowBlur = 0;
	  ctx2.font = `${Math.round(1.22*16*sizing.dpr)}px 'Quicksand',sans-serif`;
	  ctx2.fillStyle = "#9f76a1";
	  ctx2.fillText("– And may this year overflow with gentle moments –", endingCanvas.width/2, 243*sizing.dpr);
	  ctx2.save();
	  ctx2.translate(endingCanvas.width-78*sizing.dpr, endingCanvas.height-55*sizing.dpr);
	  ctx2.rotate(-0.15);
	  ctx2.globalAlpha = 0.7;
	  ctx2.beginPath();
	  ctx2.moveTo(0,15*sizing.dpr);
	  ctx2.bezierCurveTo(0,-20*sizing.dpr, 38*sizing.dpr,-11*sizing.dpr, 0,30*sizing.dpr);
	  ctx2.bezierCurveTo(-38*sizing.dpr,-11*sizing.dpr, 0,-20*sizing.dpr, 0,15*sizing.dpr);
	  ctx2.closePath();
	  ctx2.fillStyle = "#ffb7e2";
	  ctx2.fill();
	  ctx2.restore();
	});
  }

  // Slide show with 5s per slide (~36 slides ≈3 min), then end
  (function runShow() {
	let t = 0;
	function nextSlide() {
	  if (t < slideElems.length) {
		showSlide(t);
		t++;
		setTimeout(nextSlide, 5000);
	  } else {
		showEnding();
	  }
	}
	nextSlide();
  })();
  // Music will keep looping, but will only play after user gesture due to autoplay policies.