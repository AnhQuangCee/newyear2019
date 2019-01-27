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
})