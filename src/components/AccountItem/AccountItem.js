import classNames from "classnames/bind";
import style from "./AccountItem.module.scss";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import Image from "~/components/Image";
import { Link } from "react-router-dom";

const cx = classNames.bind(style);

function AccountItem({ data, onClick }) {
  return (
    <Link to={`/@${data.nickname}`} className={cx("wrapper")} onClick={onClick}>
      <Image className={cx("avatar")} src={data.avatar} alt={data.full_name} />
      <div className={cx("info")}>
        <p className={cx("name")}>
          <span>{data.nickname}</span>
          {data.tick && (
            <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} />
          )}
        </p>
        <span className={cx("full-name")}>{data.full_name}</span>
      </div>
    </Link>
  );
}

AccountItem.prototype = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default AccountItem;
