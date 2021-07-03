import { useLayoutEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";

/**
 * Scrolls to the top of the page when a page with this component inside loads.
 * @returns null
 */
export function ScrollToTop() {
  const history = useHistory();
  useLayoutEffect(() => {
    const unlisten = history.listen(() => {
      document.getElementById("mainDiv")!.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return null;
}

export default withRouter(ScrollToTop);
