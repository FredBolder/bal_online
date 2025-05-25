import Navbar from "./Navbar";
import Footer from "../Components/Footer";

function AboutPage() {
  return (
    <div className="page">
      <header>
        <Navbar />
      </header>
      <main>
        <h1 className="title">About</h1>
        <div className="boxWithScroll">
          <p>
            The first Bal game was programmed by Fred Bolder in Turbo Pascal. Later it was converted by Fred Bolder to C# and 
            many levels and new objects were added. During a webdevelopment course, Fred Bolder made together with Michał Kotkowicz, 
            Donnie Avant and Diana Sahlean the web site Games From Scratch including the game Bal. 
            Bal was totally rewritten for JavaScript. The series 1 levels were copied from the C# bal game, but the series 2 levels 
            and the series Small levels were made during the course. The C# bal game has more level series, but they were not copied. 
            Later Fred Bolder decided to make a separate Bal web site based on the Bal code from Games From Scratch, but most of the 
            code had to change a lot, because of the many new objects. There were also a lot of levels added to the existing series.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AboutPage;
