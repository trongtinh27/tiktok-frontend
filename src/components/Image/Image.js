import images from "~/assets/images";
import { useState } from "react";
import classNames from "classnames";
import styles from "./Image.module.scss";
import PropTypes from "prop-types";

function Image({
  src,
  alt,
  className,
  fallback: tagFallback = images.noImage,
  ...props
}) {
  const [fallback, setFallback] = useState("");

  const handleError = () => {
    setFallback(tagFallback);
  };

  return (
    <img
      className={classNames(styles.wrapper, className)}
      {...props}
      src={fallback || (src === null ? tagFallback : src)}
      alt={alt}
      onError={handleError}
    ></img>
  );
}

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  fallback: PropTypes.string,
};

export default Image;
