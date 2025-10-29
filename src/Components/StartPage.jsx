import { Link } from "react-router-dom";

function StartPage() {
    return (
        <div>
            <header>
                <div className="pageTitle">
                    <h1>Bal - The Game for Smart People</h1>
                </div>
            </header>
            <main>
                <div className="verticalNavButtonGroup">
                    <Link className="navButton" to="/bal">Play</Link>
                    <Link className="navButton" to="/help">How to Play</Link>
                    <Link className="navButton" to="/overview">Overview</Link>
                    <Link className="navButton" to="/privacy">Privacy</Link>
                    <Link className="navButton" to="/about">About</Link>
                </div>
            </main>
        </div>
    );
}

export default StartPage;
