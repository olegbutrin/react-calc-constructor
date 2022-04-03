import styles from "./constructor.module.css";
import { DropIcon } from "../icons";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "../../services/hooks";

import { TDnDItemType, TDraggableNames } from "../../utils/types";
import {
  addDisplay,
  addPad,
  removeDisplay,
  removePad,
} from "../../services/actions/constructor.actions";
import Display from "../display/display";
import { MouseEventHandler, ReactElement, SyntheticEvent } from "react";
import ActionPad from "../actionpad/actionpad";
import NumPad from "../numpad/numpad";
import SumPad from "../sumpad/sumpad";

const RunContainer = (props: {
  className: string;
  children?: ReactElement;
  pad?: TDraggableNames;
  onDblClick: MouseEventHandler<HTMLElement>;
}) => {
  return (
    <div
      className={props.className}
      onDoubleClick={props.onDblClick}
      data-pad={props.pad}
    >
      {props.children}
    </div>
  );
};

const Constructor = () => {
  const dispatch = useDispatch();
  const app = useSelector((store) => store.app);
  const constr = useSelector((store) => store.constr);

  const mode = app.mode;

  const isEmpty = constr.display === "" && constr.pads.length === 0;
  const isDisplay = constr.display === "display";

  const handleDrop = (item: TDnDItemType) => {
    switch (item.type) {
      case "display":
        dispatch(addDisplay());
        break;
      case "pad":
        dispatch(addPad(item.name));
        break;
    }
  };

  const [{ isDisplayOver, canDisplayDrop }, dropDisplayTarget] = useDrop({
    accept: "display",
    drop(item: TDnDItemType) {
      handleDrop(item);
    },
    collect: (monitor) => ({
      isDisplayOver: !!monitor.isOver(),
      canDisplayDrop: !!monitor.canDrop(),
    }),
  });

  const [{ isPadOver, canPadDrop }, dropPadTarget] = useDrop({
    accept: "pad",
    drop(item: TDnDItemType) {
      handleDrop(item);
    },
    collect: (monitor) => ({
      isPadOver: !!monitor.isOver(),
      canPadDrop: !!monitor.canDrop(),
    }),
  });

  const handleDisplayRemove = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(removeDisplay());
  };

  const handleActionPadRemove = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(removePad("actionpad"));
  };

  const handleNumPadRemove = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(removePad("numpad"));
  };

  const handleSumPadRemove = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(removePad("sumpad"));
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
      <div className={styles.dropzone} ref={dropDisplayTarget}>
        <RunContainer
          className={
            isDisplayOver && canDisplayDrop
              ? styles.dropPlaceholder
              : isDisplay
              ? styles.displayContainer
              : styles.dropContainer
          }
          onDblClick={handleDisplayRemove}
          children={isDisplay ? <Display mode={mode} /> : undefined}
        />
      </div>

      <div className={styles.pads} ref={dropPadTarget}>
        {constr.pads.map((pad) => {
          return (
            <RunContainer
              key={pad}
              pad={pad}
              className={styles.displayContainer}
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
                  <ActionPad mode={mode} />
                ) : pad === "numpad" ? (
                  <NumPad mode={mode} />
                ) : pad === "sumpad" ? (
                  <SumPad mode={mode} />
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
