import { useDispatch, useSelector } from "../../services/hooks";
import { setAppMode } from "../../services/actions/app.actions";

import { EyeIcon, SelectorIcon } from "../icons";
import styles from "./switcher.module.css";

import { TWidgetActivityMode } from "../../utils/types";

const SwitcherButton = (props: {
  active: boolean;
  mode: TWidgetActivityMode;
  text: string;
  onClick: React.MouseEventHandler<HTMLElement>;
}) => {
  const buttonClass = props.active
    ? styles.activebutton
    : styles.inactivebutton;
  return (
    <div
      className={buttonClass}
      onClick={props.active ? () => {} : props.onClick}
    >
      {props.mode === "runtime" ? (
        <EyeIcon active={props.active} />
      ) : (
        <SelectorIcon active={props.active} />
      )}
      <div className={styles.text}>{props.text}</div>
    </div>
  );
};

const Switcher = () => {
  const dispatch = useDispatch();
  const app = useSelector((store) => store.app);

  const isConstructor = app.mode === "constructor";
  const isRuntime = app.mode === "runtime";

  const switchToRuntimeMode = () => {
    dispatch(setAppMode("runtime"));
  };

  const switchToConstructorMode = () => {
    dispatch(setAppMode("constructor"));
  };

  return (
    <div className={styles.switcher}>
      <SwitcherButton
        active={isRuntime}
        mode={"runtime"}
        text={"Runtime"}
        onClick={switchToRuntimeMode}
      />
      <SwitcherButton
        active={isConstructor}
        mode={"constructor"}
        text={"Constructor"}
        onClick={switchToConstructorMode}
      />
    </div>
  );
};

export default Switcher;
