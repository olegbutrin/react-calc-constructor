import { ReactElement } from "react";
import Switcher from "../switcher/switcher";
import Display from "../display/display";
import ActionPad from "../actionpad/actionpad";
import NumPad from "../numpad/numpad";
import SumPad from "../sumpad/sumpad";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./canvas.module.css";
import Constructor from "../constructor/constructor";
import { useDispatch, useSelector } from "../../services/hooks";

import {
  TDraggableType,
  TDraggableNames,
  TDnDItemType,
} from "../../utils/types";

const DragConatainer = (props: {
  dragType: TDraggableType;
  dragName: TDraggableNames;
  children: ReactElement;
  locked: boolean;
}) => {
  const [, dragRef] = useDrag({
    type: props.dragType,
    item: { name: props.dragName, type: props.dragType } as TDnDItemType,
  });

  return props.locked ? (
    <div className={styles.locked} draggable={false}>
      {props.children}
    </div>
  ) : (
    <div className={styles.container} ref={dragRef} draggable={true}>
      {props.children}
    </div>
  );
};

const Canvas = () => {
  const dispatch = useDispatch();
  const app = useSelector((store) => store.app);
  const constr = useSelector((store) => store.constr);

  return (
    <div className={styles.canvas}>
      <div className={styles.top}>
        <Switcher />
      </div>
      <div className={false ? styles.mainHidden : styles.main}>
        <DndProvider backend={HTML5Backend}>
          <div className={false ? styles.itemsHidden : styles.items}>
            <DragConatainer
              dragType="display"
              dragName="display"
              locked={constr.display === "display" || app.mode === "runtime"}
            >
              <Display mode="constructor" />
            </DragConatainer>
            <DragConatainer
              dragType="pad"
              dragName="actionpad"
              locked={
                constr.pads.includes("actionpad") || app.mode === "runtime"
              }
            >
              <ActionPad mode="constructor" />
            </DragConatainer>
            <DragConatainer
              dragType="pad"
              dragName="numpad"
              locked={constr.pads.includes("numpad") || app.mode === "runtime"}
            >
              <NumPad mode="constructor" />
            </DragConatainer>
            <DragConatainer
              dragType="pad"
              dragName="sumpad"
              locked={constr.pads.includes("sumpad") || app.mode === "runtime"}
            >
              <SumPad mode="constructor" />
            </DragConatainer>
          </div>
          <Constructor />
        </DndProvider>
      </div>
    </div>
  );
};

export default Canvas;
