import { useState, useRef, useEffect } from "react";
import { useCookies } from "react-cookie";
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
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  // search history
  const [cookies, setCookie] = useCookies(["searchHistory"]);
  const [searchHistory, setSearchHistory] = useState(
    cookies.searchHistory ? cookies.searchHistory.split(",") : []
  );

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

  useEffect(() => {
    setCookie("searchHistory", searchHistory.join(","), { path: "/" });
  }, [searchHistory, setCookie]);

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

  const handleAccountClick = (nickname) => {
    let updatedHistory = [...searchHistory];
    const index = updatedHistory.indexOf(nickname);

    // Nếu nickname đã tồn tại, xóa nó khỏi vị trí cũ
    if (index > -1) {
      updatedHistory.splice(index, 1);
    }

    // Thêm nickname mới vào đầu queue
    updatedHistory.unshift(nickname);

    // Giới hạn kích thước của queue (ví dụ: 5 phần tử)
    if (updatedHistory.length > 5) {
      updatedHistory.pop(); // Loại bỏ phần tử cuối cùng trong queue
    }

    setSearchHistory(updatedHistory);

    // Đóng menu và xóa kết quả tìm kiếm
    setShowResult(false);
    setSearchResult([]);
  };

  const handleRemoveHistory = (historyItem) => {
    const updatedHistory = searchHistory.filter((item) => item !== historyItem);

    setSearchHistory(updatedHistory);
  };

  return (
    <HeadlessTippy
      visible={showResult && (showResult || searchResult.length > 0)}
      interactive
      render={(attrs) => (
        <ul className={cx("search-result")} tabIndex="-1" {...attrs}>
          {searchHistory.length > 0 && (
            <div className={cx("search-result__header")}>Tìm kiếm gần đây</div>
          )}
          {searchHistory.map((history) => (
            <HistoryItem key={history} onRemove={handleRemoveHistory}>
              {history}
            </HistoryItem>
          ))}

          {searchResult.length > 0 && (
            <div className={cx("search-result__header")}>Tài khoản</div>
          )}
          {searchResult.map((result) => (
            <AccountItem
              key={result.id}
              data={result}
              onClick={() => handleAccountClick(result.nickname)}
            />
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
              <FontAwesomeIcon className={cx("clear")} icon={faCircleXmark} />
            </button>
          )
        }

        {
          /* loading */
          loading && (
            <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
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
