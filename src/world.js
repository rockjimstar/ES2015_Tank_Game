import { canvas, ctx } from './canvas';

export default class World{
	constructor(x, y, width, height){
		this._x = x;
		this._y = y;
		this._width = width;
		this._height = height;
	}

	get x(){
		return this._x;
	}

	get y(){
		return this._y;
	}

	get height(){
		return this._height;	
	}

	get width(){
		return this._width;	
	}


	draw(){
		ctx.save();

		ctx.beginPath();

		ctx.rect(this._x, this._y, this._width, this._height);
		ctx.stroke();

		ctx.closePath();

		ctx.restore();
	}
}