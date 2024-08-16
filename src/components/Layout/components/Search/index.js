import { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import HeadlessTippy from "@tippyjs/react/headless";
import HistoryItem from "~/components/HistoryItem";
import AccountItem from "~/components/AccountItem";
import { SearchIcon } from "~/components/Icons";
import styles from "./Search.module.scss";

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResult([]);
      return;
    }

    setLoading(true);

    fetch(
      `https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(
        searchValue
      )}&type=less`
    )
      .then((res) => res.json())
      .then((res) => {
        setSearchResult(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [searchValue]);

  const handleClear = () => {
    setSearchValue("");
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  return (
    <HeadlessTippy
      visible={showResult && searchResult.length > 0}
      interactive
      render={(attrs) => (
        <ul className={cx("search-result")} tabIndex="-1" {...attrs}>
          <div className={cx("search-result__header")}>Tìm kiếm gần đây</div>
          <HistoryItem> My tippy box</HistoryItem>
          <HistoryItem> My tippy box</HistoryItem>
          <HistoryItem> My tippy box</HistoryItem>

          <div className={cx("search-result__header")}>Tài khoản</div>
          {searchResult.map((result) => (
            <AccountItem key={result.id} data={result} />
          ))}
        </ul>
      )}
      onClickOutside={handleHideResult}
    >
      <div className={cx("search-box")}>
        <input
          value={searchValue}
          ref={inputRef}
          placeholder="Tìm kiếm"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          onFocus={() => {
            setShowResult(true);
          }}
        />
        {
          /* clear */
          !!searchValue && !loading && (
            <button
              type="submit"
              className={cx("clear-btn")}
              onClick={handleClear}
            >
              <FontAwesomeIcon
                className={cx("clear")}
                icon={faCircleXmark}
              ></FontAwesomeIcon>
            </button>
          )
        }

        {
          /* loading */
          loading && (
            <FontAwesomeIcon
              className={cx("loading")}
              icon={faSpinner}
            ></FontAwesomeIcon>
          )
        }
        <span className={cx("span-spliter")}></span>
        <button className={cx("search-btn")}>
          <div className={cx("search-icon")}>
            <SearchIcon />
          </div>
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default Search;
