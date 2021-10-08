export type colorArr = [number, number, number, number];

export default class Color {
  constructor(
    private red: number,
    private green: number,
    private blue: number,
    private alpha: number
  ) {
    this.roundValuesToInts();
    this.isValid();
  }

  public calculateDifference(other: Color): Color {
    return new Color(
      Math.abs(this.red - other.getRed()),
      Math.abs(this.green - other.getGreen()),
      Math.abs(this.blue - other.getBlue()),
      Math.abs(this.alpha - other.getAlpha())
    );
  }

  private isValid(): boolean {
    if (!Color.isValidValue(this.red))
      Color.throwInvalidColorValueError("red", this.red);
    if (!Color.isValidValue(this.green))
      Color.throwInvalidColorValueError("green", this.green);
    if (!Color.isValidValue(this.blue))
      Color.throwInvalidColorValueError("blue", this.blue);
    if (!Color.isValidValue(this.alpha))
      Color.throwInvalidColorValueError("alpha", this.alpha);

    return true;
  }

  private roundValuesToInts(): void {
    this.red = Math.round(this.red);
    this.green = Math.round(this.green);
    this.blue = Math.round(this.blue);
    this.alpha = Math.round(this.alpha);
  }

  private static throwInvalidColorValueError(colorName: string, colorValue: number): void {
    throw new Error(`Invalid color value for ${colorName}: ${colorValue}`);
  }

  private static isValidValue(value: number): boolean {
    return value <= 255 && value >= 0;
  }

  public getAsArray(): colorArr {
    return [this.red, this.green, this.blue, this.alpha];
  }

  public getRed(): number {
    return this.red;
  }

  public getGreen(): number {
    return this.green;
  }

  public getBlue(): number {
    return this.blue;
  }

  public getAlpha(): number {
    return this.alpha;
  }
}
