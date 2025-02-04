/*
$(function(){
	var winHeight = window.innerHeight
	var winWidth = window.innerWidth
	var aspectRatio = 4/3
	var windowAspect = winWidth / winHeight
	var scale = 0.5
	console.log(winHeight)
	console.log(winWidth)
	console.log(aspectRatio)
	console.log(windowAspect)
	$('#main').css("height",winHeight+"px")
	$('#main').css({transform: "translate(-50%, -50%) " + "scale(" + scale + ")"})
	$(window).resize(function() {
		//$('#main').css({transform: "translate(-50%, -50%) " + "scale(" + scale + ")"})
	})
});
*/
$(function(){
	var $main = $("#main"),
		$window = $( window ),
	    mainHeight = $main.outerHeight(),
	    mainWidth = $main.outerWidth(),
	    mainAspect = 4/3,
	    resizeTimer;

//calls rescale when window resizes
	$(window).resize( function(e) {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(scaleWindow, 100);
	});

	function scaleWindow() {
		var scale, windowAspect;

		windowAspect = $window.width() / $window.height();
		if (windowAspect>=mainAspect) {
			scale = $window.height() / mainHeight;
		} else {
			scale = $window.width() / mainWidth;
		}

		$main.css({
			transform: "translate(-50%, -50%) " + "scale(" + scale + ")"
		});
		$("#startup").css({
			transform: "translate(-50%, -50%) " + "scale(" + scale + ")"
		});
	}
	scaleWindow(); // init

});
