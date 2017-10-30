import { canvas, ctx } from './canvas';
import Tank from './tank';
import Mouse from './mouse';
import Bullet from './bullet';
import World from './world';


canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

let world = new World(250, 0, 50, 600);
let world2 = new World(500, 0, 50, 600);
let worldObjects = [];

worldObjects.push(world);
worldObjects.push(world2);

let playerTank = new Tank(canvas.width / 2, canvas.height / 2, 0, 0, 0, 112.5, 52.5);

let mouse = new Mouse();
let bullets = [];


const setMouseOver = () => {
	mouse.mouseOver = true;
}

const setMouseOut = () => {
	mouse.mouseOver = false;
}

const setMouseMoveCordinates = (e) => {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
}

const setBulletCordinates = (e) => {
	//don't shoot if tank turret is up against wall.
	if(playerTank.collisionDetected){
		return;
	}

	let bullet = new Bullet(playerTank.x, playerTank.y, 3);

	bullet.setBulletVelocity(playerTank.rotation);
	bullet.moveBulletToEndOfTurret(playerTank.x, playerTank.y, playerTank.width, playerTank.rotation);

	bullets.push(bullet);
}

const bulletControl = () => {
	bullets.map(function(thisBullet, index){

		thisBullet.collisionDection(worldObjects);
		thisBullet.updateBulletPosition();

		if(thisBullet.ricochets > 0){
			return thisBullet.draw();
		}
		else{
			bullets.splice(index, 1);
		}
	});
}

const tankControl = () => {
	if(mouse.mouseOver){
		playerTank.setTankRotation(mouse.x, mouse.y);
		playerTank.setTankVelocity();
		playerTank.collisionDection(worldObjects);
		playerTank.updateTankPosition(mouse.x, mouse.y, mouse.radius);
	}

	playerTank.draw();
}


const gameLoop = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	worldObjects.map(function(thisObject, index){
		thisObject.draw();
	});

	bulletControl();
	tankControl();
}

const limitLoop = (fn, fps) => {
	// Use var then = Date.now(); if you
    // don't care about targetting < IE9
    var then = new Date().getTime();

    // custom fps, otherwise fallback to 60
    fps = fps || 60;
    var interval = 1000 / fps;
 
    return (function loop(time){
        requestAnimationFrame(loop);
 
        // again, Date.now() if it's available
        var now = new Date().getTime();
        var delta = now - then;
 
        if (delta > interval) {
            // Update time
            // now - (delta % interval) is an improvement over just 
            // using then = now, which can end up lowering overall fps
            then = now - (delta % interval);
 
            // call the fn
            fn();
        }
    }(0));
}

var frameRate = 60;

limitLoop(gameLoop, frameRate);


canvas.addEventListener("mouseover", setMouseOver, false);
canvas.addEventListener("mouseout", setMouseOut, false);

canvas.addEventListener("mousemove", setMouseMoveCordinates, false);
canvas.addEventListener("click", setBulletCordinates, false);