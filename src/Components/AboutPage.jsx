import { Link } from "react-router-dom";

function AboutPage() {
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
          <div className="pageTitle">
            <h1>Bal - About</h1>
          </div>
          <div className="textBox">
            The first Bal game was programmed by Fred Bolder in Turbo Pascal. Later it was converted by Fred Bolder to C# for Windows and
            many levels and new objects were added. During a webdevelopment course, Fred Bolder made together with Michał Kotkowicz,
            Donnie Avant and Diana Sahlean the web site Games From Scratch including the game Bal.
            Bal was totally rewritten for JavaScript. The series 1 levels were copied from the C# bal game, but most of the other levels
            were made during the course. The C# bal game has more level series, but they were not copied.
            Later Fred Bolder decided to make a separate Bal web site based on the Bal code from Games From Scratch, but most of the
            code had to change a lot, because of the many new objects and possibilities. There were many new levels added, including
            most levels from the C# bal game.
          </div>
        </div>
      </main>
    </div>
  );
}

export default AboutPage;

