import Button from "../button/button";
import styles from "./numpad.module.css";
import { TWidgetActivityMode } from "../../utils/types";
import React, { MouseEventHandler } from "react";

type TNumButtonsType = Map<string, MouseEventHandler<HTMLDivElement>>;

const NumPad = (props: { mode: TWidgetActivityMode }) => {
  const btnOnClick = (value: string) => {
    console.log(value);
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
        btnOnClick(",");
      },
    ],
  ]);

  const buttons: JSX.Element[] = [];
  numButtons.forEach((callback, label) => {
    if (label === "0") {
      buttons.push(
        <Button
          key={label}
          label={label}
          mode={props.mode}
          onClick={callback}
          style={{ gridColumn: "span 2" }}
        />
      );
    } else {
      buttons.push(
        <Button
          key={label}
          label={label}
          mode={props.mode}
          onClick={callback}
        />
      );
    }
  });

  return <div className={styles.pad}>{buttons}</div>;
};

export default NumPad;
