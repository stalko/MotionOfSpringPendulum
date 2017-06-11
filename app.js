MathJax.Hub.Config({
  tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}
});
var timerId;

var state = false;

function StartStop() {
	if(state){
		state = false;
		startBtn.value = "Start";
		stop();
	}
	else{
		drow();
		state = true;
		startBtn.value = "Stop";
		var A0 = 100;
		var g = 9.81;
		var t = 0;
		timerId = setInterval(function() {
			t++;
			drow(f(A0, x, t, g));
			ifImmobility();
		}, 100);
	}
	
}

function f(A0, x, t, g){
	var w = Math.sqrt(k.value / m.value);
	x.value = mu.value * (( m.value * g ) / k.value ) + (A0 - ( mu.value * (( m.value * g ) / k.value ))) * Math.sin( w * t);
	return x.value;
}

function ifImmobility(){
	var g = 9.81;
	var F1 = k.value * x.value;
	var F2 = mu.value * m.value * g;
	console.log(F1,F2);
	return F1===F2;

}


function stop(){
	clearInterval(timerId);
}


function drow(width){
	if (width > 500) return;

	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");

	context.clearRect(0, 0, canvas.width, canvas.height);
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(0, 300);
	context.lineTo(500, 300);
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