import styles from "./constructor.module.css";
import { DropIcon } from "../icons";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "../../services/hooks";

import { TDraggableNames, TDraggablePads } from "../../utils/types";

import {
  removeDisplay,
  removePad,
  swapPads,
} from "../../services/actions/constructor.actions";
import Display from "../display/display";
import { MouseEventHandler, ReactElement, SyntheticEvent, useRef } from "react";
import ActionPad from "../actionpad/actionpad";
import NumPad from "../numpad/numpad";
import SumPad from "../sumpad/sumpad";

const DisplayContainer = (props: {
  children?: ReactElement;
  onDblClick: MouseEventHandler<HTMLElement>;
}) => {
  const app = useSelector((store) => store.app);
  return app.mode === "runtime" ? (
    <div className={styles.displayContainer} data-pad={"display"}>
      {props.children}
    </div>
  ) : (
    <div
      className={styles.displayContainer}
      data-pad={"display"}
      onDoubleClick={props.onDblClick}
    >
      {props.children}
    </div>
  );
};

const PadContainer = (props: {
  children?: ReactElement;
  pad: TDraggableNames;
  onDblClick: MouseEventHandler<HTMLElement>;
}) => {
  //
  const dispatch = useDispatch();
  const app = useSelector((store) => store.app);
  const constr = useSelector((store) => store.constr);

  const pad = props.pad as TDraggablePads;
  const itemRef = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "pad",
      item: { name: pad, type: "pad" },
      options: {
        dropEffect: "move",
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [pad]
  );

  const [, drop] = useDrop({
    accept: "pad",
    hover(item: any, monitor) {
      if (!itemRef.current) {
        return;
      }
      const hoverIndex = constr.pads.indexOf(item.name);
      const itemIndex = constr.pads.indexOf(pad);
      if (hoverIndex === -1) {
        return;
      }
      if (hoverIndex === itemIndex) {
        return;
      }
      const itemBounds = itemRef.current.getBoundingClientRect();
      const itemCenter = (itemBounds.bottom - itemBounds.top) / 2;
      const monitorOffset = monitor.getClientOffset();
      if (monitorOffset) {
        if (monitorOffset.y - itemBounds.top < itemCenter) {
          if (itemIndex > hoverIndex) {
            return;
          }
        } else {
          if (hoverIndex > itemIndex) {
            return;
          }
        }
      }
      dispatch(swapPads(item.name, pad));
    },
    collect: (monitor) => ({
      isDragOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  drag(drop(itemRef));

  const styleDrag = {
    opacity: 0.8,
    background: "#FFFFFF",
    boxShadow:
      "0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "4px 2px",
    borderRadius: "4px",
  };

  return app.mode === "runtime" ? (
    <div
      className={styles.displayContainer}
      data-pad={props.pad}
      ref={itemRef}
      draggable={false}
    >
      {props.children}
    </div>
  ) : (
    <>
      <div
        className={styles.draggableContainer}
        style={isDragging ? styleDrag : undefined}
        onDoubleClick={props.onDblClick}
        data-pad={props.pad}
        ref={itemRef}
        draggable={true}
      >
        {props.children}
      </div>
    </>
  );
};

const Constructor = () => {
  const dispatch = useDispatch();
  const app = useSelector((store) => store.app);
  const constr = useSelector((store) => store.constr);

  const mode = app.mode;

  const isEmpty = constr.display === "" && constr.pads.length === 0;
  const isDisplay = constr.display === "display";

  const [{ isDisplayOver, canDisplayDrop }, dropDisplayTarget] = useDrop({
    accept: "display",
    drop: () => ({
      name: "display",
      allowedDropEffect: "any",
    }),
    collect: (monitor) => ({
      isDisplayOver: !!monitor.isOver(),
      canDisplayDrop: !!monitor.canDrop(),
    }),
  });

  const [{ isPadOver, canPadDrop }, dropPadTarget] = useDrop({
    accept: "pad",
    drop: () => ({
      name: "pad",
      allowedDropEffect: "any",
    }),
    collect: (monitor) => ({
      isPadOver: !!monitor.isOver(),
      canPadDrop: !!monitor.canDrop(),
    }),
  });

  const handleDisplayRemove = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (mode === "constructor") {
      dispatch(removeDisplay());
    }
  };

  const handleActionPadRemove = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (mode === "constructor") {
      dispatch(removePad("actionpad"));
    }
  };

  const handleNumPadRemove = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (mode === "constructor") {
      dispatch(removePad("numpad"));
    }
  };

  const handleSumPadRemove = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (mode === "constructor") {
      dispatch(removePad("sumpad"));
    }
  };

  return isEmpty ? (
    <div className={styles.noIndent} ref={dropPadTarget}>
      <div
        className={
          (isDisplayOver && canDisplayDrop) || (isPadOver && canPadDrop)
            ? styles.dropEmpty
            : styles.empty
        }
        ref={dropDisplayTarget}
      >
        <DropIcon />
        <div className={styles.placeholderHeader}>Перетащите сюда</div>
        <div className={styles.placeholderText}>
          любой элемент <br />
          из левой панели
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.main}>
      <div
        className={styles.dropzone}
        style={isDisplayOver ? { background: "#F0F9FF" } : undefined}
        ref={dropDisplayTarget}
      >
        {isDisplay && (
          <DisplayContainer
            key={"display"}
            onDblClick={handleDisplayRemove}
            children={<Display mode={mode} />}
          />
        )}
      </div>
      <div
        className={styles.spacer}
        style={!isPadOver ? { visibility: "hidden" } : undefined}
      />
      <div
        className={styles.pads}
        style={isPadOver ? { background: "#F0F9FF" } : undefined}
        ref={dropPadTarget}
      >
        {constr.pads.map((pad) => {
          return (
            <PadContainer
              key={pad}
              pad={pad}
              onDblClick={
                pad === "actionpad"
                  ? handleActionPadRemove
                  : pad === "numpad"
                  ? handleNumPadRemove
                  : pad === "sumpad"
                  ? handleSumPadRemove
                  : () => {}
              }
              children={
                pad === "actionpad" ? (
                  <ActionPad />
                ) : pad === "numpad" ? (
                  <NumPad />
                ) : pad === "sumpad" ? (
                  <SumPad />
                ) : undefined
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default Constructor;
