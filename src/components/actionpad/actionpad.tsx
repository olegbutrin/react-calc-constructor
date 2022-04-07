import { addAction } from "../../services/actions/calculator.actions";
import { useDispatch, useSelector } from "../../services/hooks";
import { TWidgetActivityMode } from "../../utils/types";
import Button from "../button/button";
import styles from "./actionpad.module.css";

const ActionPad = (props: { mode?: TWidgetActivityMode }) => {
  const dispatch = useDispatch();
  const app = useSelector((store) => store.app);
  const calc = useSelector((store) => store.calc);

  const summEvent = () => {
    dispatch(addAction("+"));
  };
  const diffEvent = () => {
    dispatch(addAction("-"));
  };
  const multiEvent = () => {
    dispatch(addAction("*"));
  };
  const divEvent = () => {
    dispatch(addAction("/"));
  };

  const btnStyle: { border?: string } = {};
  if (app.mode === "runtime" && props.mode === "runtime") {
    btnStyle.border = "2px solid #5D5FEF";
  }

  return (
    <div className={styles.pad}>
      <Button
        label="/"
        mode={app.mode}
        key={"div"}
        onClick={divEvent}
        style={calc.action === "/" ? btnStyle : undefined}
      />
      <Button
        label="*"
        mode={app.mode}
        key={"multi"}
        onClick={multiEvent}
        style={calc.action === "*" ? btnStyle : undefined}
      />
      <Button
        label="-"
        mode={app.mode}
        key={"diff"}
        onClick={diffEvent}
        style={calc.action === "-" ? btnStyle : undefined}
      />
      <Button
        label="+"
        mode={app.mode}
        key={"summ"}
        onClick={summEvent}
        style={calc.action === "+" ? btnStyle : undefined}
      />
    </div>
  );
};

export default ActionPad;
