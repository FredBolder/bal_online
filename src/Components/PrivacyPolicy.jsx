import Navbar from "./Navbar";
import Footer from "./Footer";

function PrivacyPolicy() {
  return (
    <div className="page">
      <header>
        <Navbar />
      </header>
      <main>
        <h1 className="title">Privacy Policy</h1>
        <div className="boxWithScroll">
          This site does not collect or store any personal information. 
          However, it may contain links to other websites, which may collect personal 
          data according to their own privacy policies. We recommend reviewing those policies 
          before interacting with their content.
          If you have any questions or concerns, please feel free to contact me by sending a message to&nbsp;
          <a className="link" href="mailto:fgh.bolder@gmail.com">
            fgh.bolder@gmail.com
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
