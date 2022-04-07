import { useDispatch, useSelector } from "../../services/hooks";
import Button from "../button/button";
import styles from "./numpad.module.css";
import { MouseEventHandler } from "react";

import { addNum, TDigits } from "../../services/actions/calculator.actions";
import { TWidgetActivityMode } from "../../utils/types";

type TNumButtonsType = Map<string, MouseEventHandler<HTMLDivElement>>;

const NumPad = (props: { mode?: TWidgetActivityMode }) => {
  const dispatch = useDispatch();
  const app = useSelector((store) => store.app);
  const calc = useSelector((store) => store.calc);

  const btnOnClick = (value: TDigits) => {
    dispatch(addNum(value));
  };

  const numButtons: TNumButtonsType = new Map([
    [
      "7",
      () => {
        btnOnClick("7");
      },
    ],
    [
      "8",
      () => {
        btnOnClick("8");
      },
    ],
    [
      "9",
      () => {
        btnOnClick("9");
      },
    ],
    [
      "4",
      () => {
        btnOnClick("4");
      },
    ],
    [
      "5",
      () => {
        btnOnClick("5");
      },
    ],
    [
      "6",
      () => {
        btnOnClick("6");
      },
    ],
    [
      "1",
      () => {
        btnOnClick("1");
      },
    ],
    [
      "2",
      () => {
        btnOnClick("2");
      },
    ],
    [
      "3",
      () => {
        btnOnClick("3");
      },
    ],
    [
      "0",
      () => {
        btnOnClick("0");
      },
    ],
    [
      ",",
      () => {
        btnOnClick(".");
      },
    ],
  ]);

  const buttons: JSX.Element[] = [];
  numButtons.forEach((callback, label) => {
    if (label === "0") {
      const btnStyle: { gridColumn: string; border?: string } = {
        gridColumn: "span 2",
      };
      if (
        app.mode === "runtime" &&
        props.mode === "runtime" &&
        calc.digits[calc.digits.length - 1] === label
      ) {
        btnStyle.border = "2px solid #5D5FEF";
      }
      buttons.push(
        <Button
          key={label}
          label={label}
          mode={app.mode}
          onClick={callback}
          style={btnStyle}
        />
      );
    } else if (label === ",") {
      const btnStyle: { border?: string } = {};
      if (calc.digits[calc.digits.length - 1] === ".") {
        btnStyle.border = "2px solid #5D5FEF";
      }
      buttons.push(
        <Button
          key={label}
          label={label}
          mode={app.mode}
          onClick={callback}
          style={
            app.mode === "runtime" && props.mode === "runtime"
              ? btnStyle
              : undefined
          }
        />
      );
    } else {
      const btnStyle: { border?: string } = {};
      if (calc.digits[calc.digits.length - 1] === label) {
        btnStyle.border = "2px solid #5D5FEF";
      }
      buttons.push(
        <Button
          key={label}
          label={label}
          mode={app.mode}
          onClick={callback}
          style={
            app.mode === "runtime" && props.mode === "runtime"
              ? btnStyle
              : undefined
          }
        />
      );
    }
  });

  return <div className={styles.pad}>{buttons}</div>;
};

export default NumPad;
