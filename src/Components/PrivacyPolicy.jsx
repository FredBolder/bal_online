import React from "react";
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
          <h4>Effective Date: 09-05-2025</h4>
          <h5>
            This Privacy Policy outlines the types of personal information we collect, 
            how we use it, and the choices you have regarding your information. Please read
            this policy carefully.
          </h5>
          <ol>
            <li>
              Information we Collect and Store:
              <ul>
                <li>
                  We collect and store no information from the users.
                </li>
              </ul>
            </li>
            <li>
              Users under 13:
              <ul>
                <li>
                  Our website is also offered to users under 13 years of age,
                  and we take special care to comply with applicable regulations
                  concerning the privacy of minors.
                </li>
              </ul>
            </li>
            <li>
              Contact Information:
              <ul>
                <li>
                  If you have any questions or concerns about our privacy
                  practices, you may contact us at{" "}
                  <a className="link" href="mailto:fgh.bolder@gmail.com">
                    fgh.bolder@gmail.com
                  </a>
                </li>
              </ul>
            </li>
            <li>
              No Purchases:
              <ul>
                <li>
                  Please note that we do not allow users to make purchases on
                  our website.
                </li>
              </ul>
            </li>
            <li>
              Compliance with Regulations:
              <ul>
                <li>
                  Our privacy practices are in compliance with the California
                  Online Privacy Protection Act (CalOPPA), the General Data
                  Protection Regulation (GDPR), and the California Consumer
                  Privacy Act (CCPA).
                </li>
              </ul>
            </li>
          </ol>
          <h5>Additional Information:</h5>
          <ul>
            <li>
              Data Security:
              <ul>
                <li>
                  We implement reasonable security measures to protect the
                  confidentiality, integrity, and availability of your personal
                  information.
                </li>
              </ul>
            </li>
            <li>
              Third-Party Services:
              <ul>
                <li>
                  Our website may contain links to third-party websites or
                  services. Please note that we are not responsible for the
                  privacy practices of these third parties.
                </li>
              </ul>
            </li>
            <li>
              Changes to this Privacy Policy:
              <ul>
                <li>
                  We may update our Privacy Policy from time to time. The
                  effective date at the top of the page will reflect the date of
                  the most recent changes. We encourage you to review this
                  Privacy Policy periodically.
                </li>
              </ul>
            </li>
          </ul>
          <h5>
            By using our Website, you consent to the practices described in this
            Privacy Policy. If you do not agree to the terms of this Privacy
            Policy, please do not use the Website.
          </h5>
          <h4>Last Updated: 09-05-2025</h4>
          <h4>Thank you for your trust and for using our Website!</h4>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
