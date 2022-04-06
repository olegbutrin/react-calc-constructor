import { addSum } from "../../services/actions/calculator.actions";
import { useDispatch, useSelector } from "../../services/hooks";
import { TWidgetActivityMode } from "../../utils/types";
import Button from "../button/button";
import styles from "./sumpad.module.css";

const SumPad = (props: { mode?: TWidgetActivityMode }) => {
  const dispatch = useDispatch();
  const app = useSelector((store) => store.app);

  const resultEvent = () => {
    dispatch(addSum("="));
  };

  const btnStyle: {
    background: string;
    minHeight: string;
    height: string;
    border?: string;
  } = {
    background: "#5D5FEF",
    minHeight: "64px",
    height: "64px",
  };

  return (
    <div className={styles.pad}>
      <Button
        label="="
        mode={app.mode}
        key={"result"}
        onClick={
          app.mode === "runtime" && props.mode === "runtime"
            ? resultEvent
            : undefined
        }
        style={btnStyle}
        textStyle={{ color: "#FFFFFF" }}
      />
    </div>
  );
};

export default SumPad;
