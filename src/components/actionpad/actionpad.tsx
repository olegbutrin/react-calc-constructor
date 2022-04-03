import Button from "../button/button";
import styles from "./actionpad.module.css";
import { TWidgetActivityMode } from "../../utils/types";

const ActionPad = (props: { mode: TWidgetActivityMode }) => {
  const summEvent = () => {};
  const diffEvent = () => {};
  const multiEvent = () => {};
  const divEvent = () => {};
  return (
    <div className={styles.pad}>
      <Button label="/" mode={props.mode} key={"div"} onClick={divEvent} />
      <Button label="*" mode={props.mode} key={"multi"} onClick={multiEvent} />
      <Button label="-" mode={props.mode} key={"diff"} onClick={diffEvent} />
      <Button label="+" mode={props.mode} key={"summ"} onClick={summEvent} />
    </div>
  );
};

export default ActionPad;
