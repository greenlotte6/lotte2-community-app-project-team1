import React from "react";

export const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-column">
            <h4>Column One</h4>
            <ul>
              <li>Twenty One</li>
              <li>Thirty Two</li>
              <li>Fourty Three</li>
              <li>Fifty Four</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Column Two</h4>
            <ul>
              <li>Sixty Five</li>
              <li>Seventy Six</li>
              <li>Eighty Seven</li>
              <li>Ninety Eight</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Column Three</h4>
            <ul>
              <li>One Two</li>
              <li>Three Four</li>
              <li>Five Six</li>
              <li>Seven Eight</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Column Four</h4>
            <div className="store-badges">
              <img src="images/app-store icon.png" alt="App Store" />
              <img src="images/Play_Store.png" alt="Google Play" />
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>CompanyName © 2025. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">version</a>
          </div>
        </div>
      </footer>
    </>
  );
};
