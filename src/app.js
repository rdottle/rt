import './style/app.css';
import * as p5 from 'p5';

import homeIcon from './images/favi.png';

console.log(homeIcon);

document.querySelector('#favi').href = homeIcon;
// import * as d3 from 'd3';
let NUMSINES = 50; // how many of these things can we do at once?
let sines = new Array(NUMSINES); // an array to hold all the current angles
let rad; // an initial radius value for the central sine
let i; // a counter variable

// play with these to get a sense of what's going on:
let fund = 0.005; // the speed of the central sine
let ratio = 1; // what multiplier for speed is each additional sine?
let alpha = 30; // how opaque is the tracing system

let trace = false; // are we tracing?

window.onload =	function () {
	let sketch = function(p) {
	    p.setup = function(){
			rad = p.height / 4; // compute radius for 
			p.createCanvas(window.innerWidth, window.innerHeight);
			p.background(255);

			for (let i = 0; i<sines.length; i++) {
				sines[i] = p.PI; // start EVERYBODY facing NORTH
			}
		}
		p.draw = function () {
			if (!trace) {
			p.background(255); // clear screen if showing geometry
			p.stroke(0, 255); // black pen
			p.noFill(); // don't fill
			}

			// MAIN ACTION
			p.push(); // start a transformation matrix
			p.translate(p.width / 2, p.height / 2); // move to middle of screen

			for (let i = 0; i < sines.length; i++) {
				let erad = 0; // radius for small "point" within circle... this is the 'pen' when tracing
			// setup for tracing
			if (trace) {
			  p.stroke(0, 0, 255 * (p.float(i) / sines.length), alpha); // blue
			  p.fill(0, 0, 255, alpha / 2); // also, um, blue
			  erad = 5.0 * (1.0 - p.float(i) / sines.length); // pen width will be related to which sine
			}
			let radius = rad / (i + 1); // radius for circle itself
			p.rotate(sines[i]); // rotate circle
			if (!trace) p.ellipse(0, 0, radius * 12, radius * 12); // if we're simulating, draw the sine
			p.push(); // go up one level
			p.translate(0, radius); // move to sine edge
			if (!trace) p.ellipse(0, 0, 200, 200); // draw a little circle
			if (trace) p.ellipse(0, 0, erad, erad); // draw with erad if tracing
			p.pop(); // go down one level
			p.translate(0, radius); // move into position for next sine
			sines[i] = (sines[i] + (fund + (fund * i * ratio))) % p.TWO_PI; // update angle based on fundamental
			}

			p.pop(); // pop down final transformation
		}
        p.keyReleased = function () {
		  if (p.key==' ') {
		    trace = !trace;
		    p.background(255);
		  }
		}
  	};
  	new p5(sketch, 'container');
};
