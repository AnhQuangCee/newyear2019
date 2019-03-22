var svgLogo1 = document.querySelector('.svgLogo polygon.st0');
var svgLogo2 = document.querySelector('.svgLogo polygon.st1');


var svgLogoAnimation = anime.timeline();

svgLogoAnimation.add({
  targets: svgLogo1,
  strokeDashoffset:[anime.setDashoffset, 0],
  duration: 2000,
  easing: 'easeOutSine'
});
svgLogoAnimation.add({
  targets: svgLogo2,
  strokeDashoffset:[anime.setDashoffset, 0],
  duration: 2000,
  easing: 'easeOutSine'
});

//Open-Close Snow Effect
var snow = document.querySelector('.snowClick');
var snowDisplay = document.querySelectorAll('.snow');
snow.onclick = function(){
    snowDisplay[0].classList.toggle('snow1');
};

//Mute Sound
var speaker = document.querySelector('.speaker');
var audio = document.querySelector('.audio');
speaker.onclick = function(){
    if(audio.muted == false){
        audio.muted = true;
    } else{
        audio.muted = false;
    }
};
// Feb 5, 2019 00:00:00
//DAQ Counntdown web 2019
var countDownDate = new Date("Jan 1, 2020 00:00:00").getTime();
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

  document.getElementById("day1").innerHTML = "Days";
  document.getElementById("hours1").innerHTML = "Hours";
  document.getElementById("minutes1").innerHTML = "Minutes";
  document.getElementById("senconds1").innerHTML = "Seconds";

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("day").innerHTML = "2";
    document.getElementById("hours").innerHTML = "0";
    document.getElementById("minutes").innerHTML = "1";
    document.getElementById("senconds").innerHTML = "9";

    //Clear info
    document.getElementById("day1").innerHTML = "";
    document.getElementById("hours1").innerHTML = "";
    document.getElementById("minutes1").innerHTML = "";
    document.getElementById("senconds1").innerHTML = "";
  }
});

//Animejs Click
var c = document.getElementById("c");
var ctx = c.getContext("2d");
var cH;
var cW;
var bgColor = "#FF6138";
var animations = [];
var circles = [];

var colorPicker = (function() {
  var colors = ["#FF6138", "#FFBE53", "#2980B9", "#282741"];
  var index = 0;
  function next() {
    index = index++ < colors.length-1 ? index : 0;
    return colors[index];
  }
  function current() {
    return colors[index]
  }
  return {
    next: next,
    current: current
  }
})();

function removeAnimation(animation) {
  var index = animations.indexOf(animation);
  if (index > -1) animations.splice(index, 1);
}

function calcPageFillRadius(x, y) {
  var l = Math.max(x - 0, cW - x);
  var h = Math.max(y - 0, cH - y);
  return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
}

function addClickListeners() {
  document.addEventListener("touchstart", handleEvent);
  document.addEventListener("mousedown", handleEvent);
};

function handleEvent(e) {
    if (e.touches) { 
      e.preventDefault();
      e = e.touches[0];
    }
    var currentColor = colorPicker.current();
    var nextColor = colorPicker.next();
    var targetR = calcPageFillRadius(e.pageX, e.pageY);
    var rippleSize = Math.min(200, (cW * .4));
    var minCoverDuration = 750;
    
    var pageFill = new Circle({
      x: e.pageX,
      y: e.pageY,
      r: 0,
      fill: nextColor
    });
    var fillAnimation = anime({
      targets: pageFill,
      r: targetR,
      duration:  Math.max(targetR / 2 , minCoverDuration ),
      easing: "easeOutQuart",
      complete: function(){
        bgColor = pageFill.fill;
        removeAnimation(fillAnimation);
      }
    });
    
    var ripple = new Circle({
      x: e.pageX,
      y: e.pageY,
      r: 0,
      fill: currentColor,
      stroke: {
        width: 3,
        color: currentColor
      },
      opacity: 1
    });
    var rippleAnimation = anime({
      targets: ripple,
      r: rippleSize,
      opacity: 0,
      easing: "easeOutExpo",
      duration: 900,
      complete: removeAnimation
    });
    
    var particles = [];
    for (var i=0; i<32; i++) {
      var particle = new Circle({
        x: e.pageX,
        y: e.pageY,
        fill: currentColor,
        r: anime.random(24, 48)
      })
      particles.push(particle);
    }
    var particlesAnimation = anime({
      targets: particles,
      x: function(particle){
        return particle.x + anime.random(rippleSize, -rippleSize);
      },
      y: function(particle){
        return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
      },
      r: 0,
      easing: "easeOutExpo",
      duration: anime.random(1000,1300),
      complete: removeAnimation
    });
    animations.push(fillAnimation, rippleAnimation, particlesAnimation);
}

function extend(a, b){
  for(var key in b) {
    if(b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
}

var Circle = function(opts) {
  extend(this, opts);
}

Circle.prototype.draw = function() {
  ctx.globalAlpha = this.opacity || 1;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
  if (this.stroke) {
    ctx.strokeStyle = this.stroke.color;
    ctx.lineWidth = this.stroke.width;
    ctx.stroke();
  }
  if (this.fill) {
    ctx.fillStyle = this.fill;
    ctx.fill();
  }
  ctx.closePath();
  ctx.globalAlpha = 1;
}

var animate = anime({
  duration: Infinity,
  update: function() {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, cW, cH);
    animations.forEach(function(anim) {
      anim.animatables.forEach(function(animatable) {
        animatable.target.draw();
      });
    });
  }
});

var resizeCanvas = function() {
  cW = window.innerWidth;
  cH = window.innerHeight;
  c.width = cW * devicePixelRatio;
  c.height = cH * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);
};

(function init() {
  resizeCanvas();
  if (window.CP) {
    // CodePen's loop detection was causin' problems
    // and I have no idea why, so...
    window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000; 
  }
  window.addEventListener("resize", resizeCanvas);
  addClickListeners();
  if (!!window.location.pathname.match(/fullcpgrid/)) {
    startFauxClicking();
  }
  handleInactiveUser();
})();

function handleInactiveUser() {
  var inactive = setTimeout(function(){
    fauxClick(cW/2, cH/2);
  }, 2000);
  
  function clearInactiveTimeout() {
    clearTimeout(inactive);
    document.removeEventListener("mousedown", clearInactiveTimeout);
    document.removeEventListener("touchstart", clearInactiveTimeout);
  }
  
  document.addEventListener("mousedown", clearInactiveTimeout);
  document.addEventListener("touchstart", clearInactiveTimeout);
}

function startFauxClicking() {
  setTimeout(function(){
    fauxClick(anime.random( cW * .2, cW * .8), anime.random(cH * .2, cH * .8));
    startFauxClicking();
  }, anime.random(200, 900));
}

function fauxClick(x, y) {
  var fauxClick = new Event("mousedown");
  fauxClick.pageX = x;
  fauxClick.pageY = y;
  document.dispatchEvent(fauxClick);
}

//firework
// window.human = false;

// var canvasEl = document.querySelector('.fireworks');
// var ctx = canvasEl.getContext('2d');
// var numberOfParticules = 30;
// var pointerX = 0;
// var pointerY = 0;
// var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
// var colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];

// function setCanvasSize() {
//   canvasEl.width = window.innerWidth * 2;
//   canvasEl.height = window.innerHeight * 2;
//   canvasEl.style.width = window.innerWidth + 'px';
//   canvasEl.style.height = window.innerHeight + 'px';
//   canvasEl.getContext('2d').scale(2, 2);
// }

// function updateCoords(e) {
//   pointerX = e.clientX || e.touches[0].clientX;
//   pointerY = e.clientY || e.touches[0].clientY;
// }

// function setParticuleDirection(p) {
//   var angle = anime.random(0, 360) * Math.PI / 180;
//   var value = anime.random(50, 180);
//   var radius = [-1, 1][anime.random(0, 1)] * value;
//   return {
//     x: p.x + radius * Math.cos(angle),
//     y: p.y + radius * Math.sin(angle)
//   }
// }

// function createParticule(x,y) {
//   var p = {};
//   p.x = x;
//   p.y = y;
//   p.color = colors[anime.random(0, colors.length - 1)];
//   p.radius = anime.random(16, 32);
//   p.endPos = setParticuleDirection(p);
//   p.draw = function() {
//     ctx.beginPath();
//     ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
//     ctx.fillStyle = p.color;
//     ctx.fill();
//   }
//   return p;
// }

// function createCircle(x,y) {
//   var p = {};
//   p.x = x;
//   p.y = y;
//   p.color = '#FFF';
//   p.radius = 0.1;
//   p.alpha = .5;
//   p.lineWidth = 6;
//   p.draw = function() {
//     ctx.globalAlpha = p.alpha;
//     ctx.beginPath();
//     ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
//     ctx.lineWidth = p.lineWidth;
//     ctx.strokeStyle = p.color;
//     ctx.stroke();
//     ctx.globalAlpha = 1;
//   }
//   return p;
// }

// function renderParticule(anim) {
//   for (var i = 0; i < anim.animatables.length; i++) {
//     anim.animatables[i].target.draw();
//   }
// }

// function animateParticules(x, y) {
//   var circle = createCircle(x, y);
//   var particules = [];
//   for (var i = 0; i < numberOfParticules; i++) {
//     particules.push(createParticule(x, y));
//   }
//   anime.timeline().add({
//     targets: particules,
//     x: function(p) { return p.endPos.x; },
//     y: function(p) { return p.endPos.y; },
//     radius: 0.1,
//     duration: anime.random(1200, 1800),
//     easing: 'easeOutExpo',
//     update: renderParticule
//   })
//     .add({
//     targets: circle,
//     radius: anime.random(80, 160),
//     lineWidth: 0,
//     alpha: {
//       value: 0,
//       easing: 'linear',
//       duration: anime.random(600, 800),  
//     },
//     duration: anime.random(1200, 1800),
//     easing: 'easeOutExpo',
//     update: renderParticule,
//     offset: 0
//   });
// }

// var render = anime({
//   duration: Infinity,
//   update: function() {
//     ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
//   }
// });

// document.addEventListener(tap, function(e) {
//   window.human = true;
//   render.play();
//   updateCoords(e);
//   animateParticules(pointerX, pointerY);
// }, false);

// var centerX = window.innerWidth / 2;
// var centerY = window.innerHeight / 2;

// // function autoClick() {
// //   if (window.human) return;
// //   animateParticules(
// //     anime.random(centerX-50, centerX+50), 
// //     anime.random(centerY-50, centerY+50)
// //   );
// //   anime({duration: 200}).finished.then(autoClick);
// // }

// // autoClick();
// setCanvasSize();
// window.addEventListener('resize', setCanvasSize, false);