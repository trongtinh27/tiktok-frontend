import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import MenuItem from "./MenuItem";
import style from "./Menu.module.scss";
import Header from "~/components/Popper/Menu/Header";
import { useState } from "react";

const cx = classNames.bind(style);

const defaultFn = () => {};

function Menu({ children, items = [], onChange = defaultFn() }) {
  const [historyMenu, setHistoryMenu] = useState([{ data: items }]);
  const currentMenu = historyMenu[historyMenu.length - 1];

  const renderItems = () => {
    return currentMenu.data.map((item, index) => {
      const isParent = !!item.children;
      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistoryMenu((prev) => [...prev, item.children]);
            } else {
              onChange(item);
            }
          }}
        />
      );
    });
  };

  return (
    <Tippy
      interactive
      hideOnClick={false}
      delay={[0, 700]}
      placement="bottom-end"
      render={(attrs) => (
        <div className={cx("setting-popup-list")} tabIndex="-1" {...attrs}>
          <PopperWrapper>
            {historyMenu.length > 1 && (
              <Header
                title={currentMenu.title}
                onBack={() => {
                  setHistoryMenu((prev) => prev.slice(0, prev.length - 1));
                }}
              />
            )}
            {renderItems()}
          </PopperWrapper>
        </div>
      )}
      onHide={() => {
        setHistoryMenu((prev) => prev.slice(0, 1));
      }}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
