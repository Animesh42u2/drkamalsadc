import type { FC } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scrolls to the top of the page whenever the route changes. */
const ScrollToTop: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
