export enum ElementStates {
  Default = "default",
  Changing = "changing",
  Modified = "modified",
}

export interface IElement {
  value: string;
  state: ElementStates;
}
