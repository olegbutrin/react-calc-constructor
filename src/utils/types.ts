export type TWidgetActivityMode = "constructor" | "runtime";

export type TDraggableType = "display" | "pad";
export type TDraggableNames = "display" | "actionpad" | "numpad" | "sumpad";
export type TDraggableDisplay = "display";
export type TDraggablePads = Exclude<TDraggableNames, TDraggableDisplay>;

export type TDnDItemType = {
  name: TDraggableNames;
  type: TDraggableType;
}