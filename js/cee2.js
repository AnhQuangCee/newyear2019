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
