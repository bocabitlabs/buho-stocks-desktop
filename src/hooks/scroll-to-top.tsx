import { useLayoutEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";

function ScrollToTop() {
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
