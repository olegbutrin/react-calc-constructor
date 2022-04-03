import Button from "../button/button";
import styles from "./sumpad.module.css";
import { TWidgetActivityMode } from "../../utils/types";

const SumPad = (props: { mode: TWidgetActivityMode }) => {
  const resultEvent = () => {};
  return (
    <div className={styles.pad}>
      <Button
        label="="
        mode={props.mode}
        key={"result"}
        onClick={resultEvent}
        style={{ background: "#5D5FEF", minHeight: "64px", height: "64px"}}
        textStyle={{color: "#FFFFFF"}}
      />
    </div>
  );
};

export default SumPad;
