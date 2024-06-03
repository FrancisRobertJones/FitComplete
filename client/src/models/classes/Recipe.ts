export class NewRecipe {
  constructor(
    public title: string,
    public description: string,
    public ingredients: string[],
    public imageUrl: string,
    public instructions: string[]
  ) {}
}
