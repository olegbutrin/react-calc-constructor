import { useSelector } from "../../services/hooks";
import Button from "../button/button";
import styles from "./sumpad.module.css";

const SumPad = () => {
  const app = useSelector((store) => store.app);
  const resultEvent = () => {};
  return (
    <div className={styles.pad}>
      <Button
        label="="
        mode={app.mode}
        key={"result"}
        onClick={resultEvent}
        style={{ background: "#5D5FEF", minHeight: "64px", height: "64px"}}
        textStyle={{color: "#FFFFFF"}}
      />
    </div>
  );
};

export default SumPad;
