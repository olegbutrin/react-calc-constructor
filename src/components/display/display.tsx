import styles from "./display.module.css";

import { TWidgetActivityMode } from "../../utils/types";

const Display = (props: { mode: TWidgetActivityMode }) => {
  return (
    <div className={styles.display}>
      <div className={styles.text}>
        {props.mode === "constructor" ? "0" : "0"}
      </div>
    </div>
  );
};

export default Display;
