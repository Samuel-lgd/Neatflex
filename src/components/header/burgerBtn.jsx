import { React, useState } from "react";
import style from "./burgerBtn.module.css";

function BurgerBtn({ onClick, visible, open, handleOpen }) {
  // const [open, setOpen] = useState(true);

  const handleClick = () => {
    if (open === true) {
      handleOpen(false);
    } else {
      handleOpen(true);
    }
    onClick(open);
  };
  return visible ? (
    <div className={style.burger} onClick={handleClick}>
      <div
        className={
          open === false ? `${style.line} ${style.rotateDown}` : style.line
        }
        id={style.top}
      ></div>
      <div
        className={open === false ? `${style.line} ${style.hide}` : style.line}
        id={style.mid}
      ></div>
      <div
        className={
          open === false ? `${style.line} ${style.rotateUp}` : style.line
        }
        id={style.bot}
      ></div>
    </div>
  ) : null;
}

export default BurgerBtn;
