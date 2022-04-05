import { useSelector } from "../../services/hooks";
import Button from "../button/button";
import styles from "./actionpad.module.css";

const ActionPad = () => {
  const app = useSelector((store) => store.app);

  const summEvent = () => {};
  const diffEvent = () => {};
  const multiEvent = () => {};
  const divEvent = () => {};

  return (
    <div className={styles.pad}>
      <Button label="/" mode={app.mode} key={"div"} onClick={divEvent} />
      <Button label="*" mode={app.mode} key={"multi"} onClick={multiEvent} />
      <Button label="-" mode={app.mode} key={"diff"} onClick={diffEvent} />
      <Button label="+" mode={app.mode} key={"summ"} onClick={summEvent} />
    </div>
  );
};

export default ActionPad;
