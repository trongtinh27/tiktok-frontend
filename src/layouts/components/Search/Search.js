import { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import HeadlessTippy from "@tippyjs/react/headless";

import * as searchService from "~/services/searchService";
import HistoryItem from "~/components/HistoryItem";
import AccountItem from "~/components/AccountItem";
import { SearchIcon } from "~/components/Icons";
import { useDebounce } from "~/hooks";
import styles from "./Search.module.scss";

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);

  const debounce = useDebounce(searchValue, 500);

  const inputRef = useRef();

  useEffect(() => {
    if (!debounce.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      setLoading(true);

      const result = await searchService.search(debounce);
      setSearchResult(result);

      setLoading(false);
    };
    fetchApi();
  }, [debounce]);

  const handleClear = () => {
    setSearchValue("");
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
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
          onChange={handleChange}
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
        <button
          className={cx("search-btn")}
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className={cx("search-icon")}>
            <SearchIcon />
          </div>
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default Search;