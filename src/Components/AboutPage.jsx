import React from "react";
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
            During a webdevelopment course, I (Fred Bolder) made together with Michał Kotkowicz,
            Donnie Avant and Diana Sahlean the web site 
            &nbsp;<a href="https://games-41ql.onrender.com/" target="_blank" rel="noreferrer">Games From Scratch</a>&nbsp;
            including the game
            &nbsp;<a href="https://fredbolder.github.io/bal/" target="_blank" rel="noreferrer">Bal</a>&nbsp;
            that was first programmed by me in C# for Windows. Bal was totally rewritten for JavaScript by our team.
            Games From Scratch consists of a frontend and a backend and is deployed on render.com.
            When you use a frontend and a backend for free on render, there are long delays, which is of course not nice.
            Therefore I decided to make a new Bal website using the Bal code of Games From Scratch, but without backend.
            This has advantages and disadvantages. Everything works now very fast, but no information on the progress of
            the game is stored.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AboutPage;
