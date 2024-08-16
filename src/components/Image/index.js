import images from "~/assets/images";
import { useState } from "react";
import classNames from "classnames";
import styles from "./Image.module.scss";

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
      src={fallback || src}
      alt={alt}
      onError={handleError}
    ></img>
  );
}

export default Image;
