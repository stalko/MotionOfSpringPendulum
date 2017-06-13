
var timerId;

$( document ).ready(function() {
  	drow(0);
	MathJax.Hub.Config({
	  tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}
	});
});

var state = false;

function StartStop() {
	if(state){
		stop();
	}
	else{
		state = true;
		startBtn.value = "Stop";
		var t = 0;
		timerId = setInterval(function() {
			t+=0.1;
			drow(f(t));
		}, 100);
	}
	
}

function f(t){
	a.value = A0.value * Math.exp(Beta()*t)*Math.cos(Omega()*t);
	return -a.value;
}

function Omega(){
	omega.value = Math.sqrt(k.value*m.value);
	return -omega.value;
}

function Beta(){
	beta.value = (r.value)/(2*m.value);
	return -beta.value;
}


function stop(){
	state = false;
	startBtn.value = "Start";
	clearInterval(timerId);
}

function drow(width){
	width+=200;
	if (width > 500) return;

	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");

	context.clearRect(0, 0, canvas.width, canvas.height);
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(0, 200);
	context.lineTo(500, 200);
	fillRect(context,width);
	context.stroke();


    context.beginPath();
    var heigth = 300;
    context.moveTo(0, heigth/2);

	for (var x = 0; x < width; x++)
    {
        var amplitude = heigth / 8;
        var y = (Math.sin(((width-500)/10) * x * Math.PI / 180) * amplitude) + (heigth / 2);
        context.lineTo(x, y);
    }
    context.stroke();
}

function fillRect(context,width){
	context.fillRect(width, 100, 100, 100);
}