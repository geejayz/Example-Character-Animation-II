//Use window.unload to ensure the html page has loaded before
//the JavaScript is run
window.onload = function(){


//Create an object for our zombie character
var zombie = {
	IMAGE: "images/zombie-spritesheet.png",
	SIZEX: 275,
	SIZEY: 425,
	COLUMNS: 7,
	numberOfFrames: 4, //
	currentFrame: 0,
	
	sourceX: 0,
	sourceY: 0,
	
	//States
	WALKING: 0,
	DAZED: 1,
	DYING: 2,
	state: undefined,
	
	animateCharacter: function() {
		//Determine the current state
		
				
		//Use currentFrame to determine the correct frame to display
		this.sourceX = this.currentFrame * this.SIZEX;
		this.sourceY = 425 * this.state;
		
		//Increase currentFrame by 1 if it's no greater than the total no of frames
		if (this.currentFrame < this.numberOfFrames) {
			this.currentFrame++;
		}
		else {
			this.currentFrame = 0;
		}

	}
};


//Get a reference to the canvas
var canvas = document.querySelector("canvas");

//Get a reference to the canvas's drawing surface
var drawingSurface = canvas.getContext("2d");

//Create a variable to track the horizontal position of the zombie
var path = 0;

//Create a variable to determine whether to animate or not
var animateOn = true;

//Set initial zombie state to WALKING
zombie.state = zombie.WALKING;

//Load the animation tilesheet
var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = zombie.IMAGE;

function loadHandler() {
	updateAnimation();
}

function updateAnimation() {	
	if(animateOn) {
	//Set a timer to update the animation every 300 milliseconds
	setTimeout(updateAnimation, 150);
	}
	
	//Update the character animation
	zombie.animateCharacter();
	
	//Render the animation
	render();
}
	

function render() {
	//Clear the canvas of any previous frames
	drawingSurface.clearRect(0,0, canvas.width, canvas.height);
	
	//Draw character's current animation frame
	drawingSurface.drawImage (
		image,
		zombie.sourceX, zombie.sourceY, zombie.SIZEX, zombie.SIZEY,
		path,0, (zombie.SIZEX/2), (zombie.SIZEY/2)
	);
	
	
	
	//Only move forward if the zombie state is walking
	if (zombie.state === zombie.WALKING) {
		//Check to ensure zombie has not reach end of the path
		if (path < canvas.width - 10 - zombie.SIZEX/2) {
			path = path + 10;
		}
		else {
			zombie.numberOfFrames = 6;
			zombie.state = zombie.DYING;
		}		
	}
	
	
	if(zombie.state === zombie.DYING && zombie.currentFrame === zombie.numberOfFrames) {
		animateOn = false;
	}
	
}



};
