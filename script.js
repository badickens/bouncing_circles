(function() { 
  
    var canv = document.getElementById('myCanvas'),
        c = canv.getContext('2d'),
		gravity = 0.1,
		dampening = 0.99,
		pullStrength = 0.01,
		circles = [],
		i, numCircles = 10;
	
	for(i = 0; i < numCircles; i++) {
	    circles.push({
            x: Math.random() * canv.width,
	        y: Math.random() * canv.height,
		
		    // (vx, vy) = Velocity vector
		    vx: 0,
		    vy: 0,
	        radius: 20
        });
	}
    

    function executeFrame() {
	    var i, circle;
		
	    for(i = 0; i < numCircles; i++) {
		    circle = circles[i];
		
	        // Increment location by velocity
            circle.x += circle.vx;
		    circle.y += circle.vy;
		
		    // Increment Gravity
		    circle.vy += gravity;
		
		    // Slow it down
		    circle.vy *= dampening;
	
	        // Bounce
		    // bottom
	        if(circle.y + circle.radius > canv.height) {
		        circle.y = canv.height - circle.radius;
		        circle.vy = -Math.abs(circle.vy);
		    }
	
	        // right
	        if(circle.x + circle.radius > canv.width) {
		        circle.x = canv.width - circle.radius;
		        circle.vx = -Math.abs(circle.vx);
		    }
	
	
	        // left
			if(circle.x - circle.radius < 0) {
		       // circle.x = canv.width - circle.radius;
		        circle.vx = Math.abs(circle.vx);
		    }
			
			
			
	        c.fillStyle = 'rgba('+parseInt(Math.random() * 255, 10)+','+ parseInt(Math.random() * 255, 10)+' ,200, 0.2)';
	        //c.clearRect(0, 0, canv.width, canv.height);
            c.fillRect(0, 0, canv.width, canv.height);
		
            c.beginPath();
            c.arc(circle.x, circle.y, circle.radius, 0, 2*Math.PI);
            c.closePath();
		    c.fillStyle = 'black';
            c.fill();
	     }
		 
	   // if(circle.y < canv.height - circle.radius) 
	    requestAnimFrame(executeFrame);
    }    	

	
	canv.addEventListener('mousedown', function(e) {
	
	    var dx, dy,	i, circle;
			
	    console.log(e.pageX, e.pageY);  // test to check where mouse clicks are made
		
		for(i = 0; i < numCircles; i++) {
		    circle = circles[i];
			dx = e.pageX - circle.x;
		    dy = e.pageY - circle.y;
		    circle.vx += dx * pullStrength;
		    circle.vy += dy * pullStrength;
		}
		
	});
    // Start animation

    executeFrame();

})();