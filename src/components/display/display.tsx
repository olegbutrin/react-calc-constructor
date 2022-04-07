import styles from "./display.module.css";
import { useDispatch, useSelector } from "../../services/hooks";
import { TWidgetActivityMode } from "../../utils/types";
import { clearCalc } from "../../services/actions/calculator.actions";
import { SyntheticEvent } from "react";

const digitCount = 7;

const Display = (props: { mode: TWidgetActivityMode }) => {
  const dispatch = useDispatch();
  const app = useSelector((store) => store.app);
  const calc = useSelector((store) => store.calc);

  const asNum =
    calc.digits.length > 1
      ? calc.digits.includes(".")
        ? Number.parseFloat(calc.digits.join("")).toFixed(
            Math.min(calc.digits.slice(calc.digits.indexOf(".") + 1).length, 2)
          )
        : Number.parseInt(calc.digits.join("")).toString()
      : calc.digits[0];
  const content =
    asNum.length > digitCount
      ? "…" + asNum.slice(-digitCount).replace(".", ",")
      : (
          asNum.replace(".", ",") +
          (calc.digits[calc.digits.length - 1] === "." ? "," : "")
        )
          .replace(/,,$/, ",")
          .replace(/^,/, "0,");

  const value =
    calc.digits.length === 0
      ? "0"
      : calc.digits.join("").replace(".", ",").replace(/^,/, "0,");

  const clearCalculator = (event: SyntheticEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(clearCalc());
  };

  return (
    <div
      className={
        app.mode === "runtime" && props.mode === "runtime"
          ? styles.displayActive
          : styles.display
      }
      onDoubleClick={
        app.mode === "runtime" && props.mode === "runtime"
          ? clearCalculator
          : undefined
      }
      data-title={props.mode === "constructor" ? "0" : [calc.memory, calc.action, value].join(" ") }
    >
      <div
        className={
          props.mode !== "constructor" && content !== value
            ? styles.textProxy
            : styles.text
        }
      >
        {props.mode === "constructor" ? "0" : calc.error || content}
      </div>
    </div>
  );
};

export default Display;
