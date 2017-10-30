import { canvas, ctx } from './canvas';

export default class Bullet{
	constructor(x, y, radius){
		this._x = x;
		this._y = y;
		this._vx = 0;
		this._vy = 0;
		this._radius = radius;
		this._speed = 20;
		this._ricochets = 3;
	}

	set x(x){
		this._x = x;
	}

	set y(y){
		this._y = y;
	}

	set ricochets(ricochets){
		this._ricochets = ricochets;
	}

	get x(){
		return this._x;
	}

	get y(){
		return this._y;
	}

	get radius(){
		return this._radius;
	}

	get ricochets(){
		return this._ricochets;
	}

	setBulletVelocity(tankRotation){
		this._vx = Math.cos(tankRotation) * this._speed;
		this._vy = Math.sin(tankRotation) * this._speed;
	}

	moveBulletToEndOfTurret(tankX, tankY, tankWidth, tankRotation){
		this._x = (Math.cos(tankRotation) * (tankWidth / 2)) + tankX;
		this._y = (Math.sin(tankRotation) * (tankWidth / 2)) + tankY;
	}

	updateBulletPosition(){
		this._x += this._vx;
		this._y += this._vy;
	}

	collisionDection(worldObjects){
		//canvas edges detection
		if(this._y > (canvas.height - this._radius) || this._y < this._radius){
			this._vy = -this._vy;
			this._ricochets--;
		}
		else if(this._x > (canvas.width - this._radius) || this._x< this._radius){
			this._vx = -this._vx;
			this._ricochets--;
		}

		let bullet = this;
		//world objects detection
		worldObjects.map(function(obj, index){
			if(bullet._x + bullet._vx > obj.x && 
				bullet._x + bullet._vx < obj.x +  obj.width && 
				bullet._y > obj.y && 
				bullet._y < obj.y + obj.height
			){
				bullet._vx = -bullet._vx
				bullet._ricochets--;
			}
			else if(bullet._y + bullet._vy > obj.y && 
				bullet._y + bullet._vy < obj.y + obj.height && 
				bullet._x > obj.x && 
				bullet._x < obj.x +  obj.width
			){
				bullet._vy = -bullet._vy
				bullet._ricochets--;
			}
		});
	}

	draw(){
		ctx.save();

		ctx.beginPath();
		ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2, true);
		ctx.fillStyle = 'red';
		ctx.fill();
		ctx.closePath();

		ctx.restore();
	}
}