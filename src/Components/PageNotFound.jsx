import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      <header>
        <div className="center">
          <div className="horizontalNavButtonGroup">
            <Link className="navButton" to="/">Back</Link>
            <Link className="navButton" to="/bal">Play</Link>
          </div>
        </div>
      </header>
      <main>
        <div className="center">
          <div className="pageNotFound">Page not found</div>
        </div>
      </main>
    </div>
  );
}

export default PageNotFound;

