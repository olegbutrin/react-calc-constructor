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
  TDropResult,
} from "../../utils/types";
import { addDisplay, addPad } from "../../services/actions/constructor.actions";

const DragConatainer = (props: {
  dragType: TDraggableType;
  dragName: TDraggableNames;
  children: ReactElement;
  locked: boolean;
}) => {
  //
  const dispatch = useDispatch();
  const { dragType, dragName } = props;

  const [, dragRef] = useDrag(
    () => ({
      type: dragType,
      item: { name: dragName, type: dragType },
      options: {
        dropEffect: "copy",
      },
      end(item, monitor) {
        const dropResult = monitor.getDropResult() as TDropResult;
        if (dropResult) {
          if (dropResult.name === item.type) {
            switch (item.type) {
              case "display":
                dispatch(addDisplay());
                break;
              case "pad":
                dispatch(addPad(item.name));
                break;
            }
          }
        }
      },
    }),
    [dragType, dragName]
  );
  //

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
              <ActionPad />
            </DragConatainer>
            <DragConatainer
              dragType="pad"
              dragName="numpad"
              locked={constr.pads.includes("numpad") || app.mode === "runtime"}
            >
              <NumPad />
            </DragConatainer>
            <DragConatainer
              dragType="pad"
              dragName="sumpad"
              locked={constr.pads.includes("sumpad") || app.mode === "runtime"}
            >
              <SumPad />
            </DragConatainer>
          </div>
          <Constructor />
        </DndProvider>
      </div>
    </div>
  );
};

export default Canvas;
