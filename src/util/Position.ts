export default class Position {
  constructor(x: number, y: number) {
    this._y = y;
    this._x = x;
  }

  public toString() {
    return `x: ${this._x}, y: ${this._y}`;
  }

  private _x: number;

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  private _y: number;

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }
}