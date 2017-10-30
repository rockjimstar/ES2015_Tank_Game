export default class Mouse {
	constructor(){
		this._x = 0;
		this._y = 0;
		this._radius = 2;
		this._mouseOver = false;
	}

	set x(x){
		this._x = x;
	}

	set y(y){
		this._y = y;
	}

	set mouseOver(mouseOver){
		this._mouseOver = mouseOver;
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

	get mouseOver(){
		return this._mouseOver;
	}
}