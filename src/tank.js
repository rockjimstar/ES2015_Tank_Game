import { canvas, ctx } from './canvas';
import tankImg from './images/tank.png'

export default class Tank {
	constructor(x, y, vx, vy, rotation, width, height){
		this._x = x;
		this._y = y;
		this._previousX = 0;
		this._previousY = 0;
		this._vx = vx;
		this._vy = vy;
		this._rotation = rotation;
		this._width = width;
		this._height = height;
		this._speed = 10;
		this._tankImage = new Image();
		this._tankImage.src = tankImg;
		this._collisionDetected = false;
	}

	set x(x){
		this._x = x;
	}

	set y(y){
		this._y = y;
	}

	get x(){
		return this._x;
	}

	get y(){
		return this._y;
	}

	get rotation(){
		return this._rotation;
	}

	get height(){
		return this._height;	
	}

	get width(){
		return this._width;	
	}

	get collisionDetected(){
		return this._collisionDetected;	
	}

	setTankVelocity(){
		this._vx = Math.cos(this._rotation) * this._speed;
		this._vy = Math.sin(this._rotation) * this._speed;
	}

	setTankRotation(mouseX, mouseY){
		let targetX  = mouseX - this._x;
		let targetY  = mouseY - this._y;
		this._rotation = Math.atan2(targetY, targetX); 
	}

	updateTankPosition(mouseX, mouseY, mouseRadius){
		var a = this._x - mouseX;
		var b = this._y - mouseY;

		var distance = Math.sqrt(a * a + b * b);

		if(distance > mouseRadius + (this._width / 2) && !this._collisionDetected){
			this._x += this._vx;
			this._y += this._vy;
		}
	}

	collisionDection(worldObjects){
		let frontBumperX = (Math.cos(this._rotation) * (this._width / 2)) + this._x;
		let frontBumperY = (Math.sin(this._rotation) * (this._width / 2)) + this._y;

		this._collisionDetected = false;
		let tank = this;
		//world objects detection
		worldObjects.map(function(obj, index){
			if(frontBumperX + tank._vx > obj.x && 
				frontBumperX + tank._vx < obj.x +  obj.width && 
				frontBumperY + tank._vy > obj.y && 
				frontBumperY + tank._vy < obj.y + obj.height
			){

				tank._collisionDetected = true;
			}
			else if(frontBumperX > obj.x && 
				frontBumperX < obj.x +  obj.width && 
				frontBumperY > obj.y && 
				frontBumperY < obj.y + obj.height
			){

				tank._collisionDetected = true;
			}
			else if(tank._x + tank._vx > obj.x && 
				tank._x + tank._vx < obj.x +  obj.width && 
				tank._y + tank._vy > obj.y && 
				tank._y + tank._vy < obj.y + obj.height
			){

				tank._collisionDetected = true;
			}
		});
	}

	draw(){
		ctx.save();

		ctx.translate(this._x, this._y);
		ctx.rotate(this._rotation);

		ctx.beginPath();
		ctx.drawImage(this._tankImage, -this._width / 2, -this._height / 2, this._width, this._height);
		ctx.fill();
		ctx.closePath();

		ctx.restore();
	}
}