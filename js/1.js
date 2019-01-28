var svgLogo = document.querySelector('.svgLogo path.st0');
var svgLogo1 = document.querySelector('.svgLogo path.st1');
var svgLogo2 = document.querySelector('.svgLogo path.st2');
var svgLogo3 = document.querySelector('.svgLogo path.st3');
var svgLogo4 = document.querySelector('.svgLogo path.st4');
var svgLogo5 = document.querySelector('.svgLogo path.st5');
var svgLogo6 = document.querySelector('.svgLogo polygon.p0');
var svgLogo7 = document.querySelector('.svgLogo text.t1');
var svgLogo5 = document.querySelector('.svgLogo path.st5');

var svgLogoAnimation = anime.timeline();
svgLogoAnimation.add({
	targets: svgLogo,
	strokeDashoffset:[anime.setDashoffset, 0],
	duration: 2000,
	easing: 'easeOutSine'
});
svgLogoAnimation.add({
	targets: svgLogo1,
	strokeDashoffset:[anime.setDashoffset, 0],
	duration: 2000,
	easing: 'easeOutSine'
});svgLogoAnimation.add({
	targets: svgLogo2,
	strokeDashoffset:[anime.setDashoffset, 0],
	duration: 2000,
	easing: 'easeOutSine'
});svgLogoAnimation.add({
	targets: svgLogo3,
	strokeDashoffset:[anime.setDashoffset, 0],
	duration: 2000,
	easing: 'easeOutSine'
});svgLogoAnimation.add({
	targets: svgLogo4,
	strokeDashoffset:[anime.setDashoffset, 0],
	duration: 2000,
	easing: 'easeOutSine'
});
svgLogoAnimation.add({
	targets: svgLogo5,
	strokeDashoffset:[anime.setDashoffset, 0],
	duration: 2000,
	easing: 'easeOutSine'
});
svgLogoAnimation.add({
	targets: svgLogo6,
	opacity: [0,1]
});
svgLogoAnimation.add({
	targets: svgLogo7,
	opacity: [0,1],
	duration: 2000,
	easing: 'easeOutSine'
});

//DAQ Counntdown web 2019
var countDownDate = new Date("Feb 5, 2019 00:00:00").getTime();
var x = setInterval(function(){
	var now = new Date().getTime();
	var distance = countDownDate - now;

	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);
	
	document.getElementById("day").innerHTML = days;
	document.getElementById("hours").innerHTML = hours;
	document.getElementById("minutes").innerHTML = minutes;
	document.getElementById("senconds").innerHTML = seconds;
	if (distance < 0) {
		clearInterval(x);
		document.getElementById("demo").innerHTML = "HAPPY NEW YEAR 2019";
	}
});

//firework
window.human = false;

var canvasEl = document.querySelector('.fireworks');
var ctx = canvasEl.getContext('2d');
var numberOfParticules = 30;
var pointerX = 0;
var pointerY = 0;
var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
var colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];

function setCanvasSize() {
  canvasEl.width = window.innerWidth * 2;
  canvasEl.height = window.innerHeight * 2;
  canvasEl.style.width = window.innerWidth + 'px';
  canvasEl.style.height = window.innerHeight + 'px';
  canvasEl.getContext('2d').scale(2, 2);
}

function updateCoords(e) {
  pointerX = e.clientX || e.touches[0].clientX;
  pointerY = e.clientY || e.touches[0].clientY;
}

function setParticuleDirection(p) {
  var angle = anime.random(0, 360) * Math.PI / 180;
  var value = anime.random(50, 180);
  var radius = [-1, 1][anime.random(0, 1)] * value;
  return {
    x: p.x + radius * Math.cos(angle),
    y: p.y + radius * Math.sin(angle)
  }
}

function createParticule(x,y) {
  var p = {};
  p.x = x;
  p.y = y;
  p.color = colors[anime.random(0, colors.length - 1)];
  p.radius = anime.random(16, 32);
  p.endPos = setParticuleDirection(p);
  p.draw = function() {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
    ctx.fillStyle = p.color;
    ctx.fill();
  }
  return p;
}

function createCircle(x,y) {
  var p = {};
  p.x = x;
  p.y = y;
  p.color = '#FFF';
  p.radius = 0.1;
  p.alpha = .5;
  p.lineWidth = 6;
  p.draw = function() {
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
    ctx.lineWidth = p.lineWidth;
    ctx.strokeStyle = p.color;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
  return p;
}

function renderParticule(anim) {
  for (var i = 0; i < anim.animatables.length; i++) {
    anim.animatables[i].target.draw();
  }
}

function animateParticules(x, y) {
  var circle = createCircle(x, y);
  var particules = [];
  for (var i = 0; i < numberOfParticules; i++) {
    particules.push(createParticule(x, y));
  }
  anime.timeline().add({
    targets: particules,
    x: function(p) { return p.endPos.x; },
    y: function(p) { return p.endPos.y; },
    radius: 0.1,
    duration: anime.random(1200, 1800),
    easing: 'easeOutExpo',
    update: renderParticule
  })
    .add({
    targets: circle,
    radius: anime.random(80, 160),
    lineWidth: 0,
    alpha: {
      value: 0,
      easing: 'linear',
      duration: anime.random(600, 800),  
    },
    duration: anime.random(1200, 1800),
    easing: 'easeOutExpo',
    update: renderParticule,
    offset: 0
  });
}

var render = anime({
  duration: Infinity,
  update: function() {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  }
});

document.addEventListener(tap, function(e) {
  window.human = true;
  render.play();
  updateCoords(e);
  animateParticules(pointerX, pointerY);
}, false);

var centerX = window.innerWidth / 2;
var centerY = window.innerHeight / 2;

// function autoClick() {
//   if (window.human) return;
//   animateParticules(
//     anime.random(centerX-50, centerX+50), 
//     anime.random(centerY-50, centerY+50)
//   );
//   anime({duration: 200}).finished.then(autoClick);
// }

// autoClick();
setCanvasSize();
window.addEventListener('resize', setCanvasSize, false);