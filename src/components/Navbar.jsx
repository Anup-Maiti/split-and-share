import { Wallet, Share2 } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        <div className="logo-icon">
          <Wallet size={21} />
        </div>

        <span>Slipt & Share</span>
      </div>

      <div className="nav-links">
        <a href="#dashboard">Dashboard</a>
        <a href="#expenses">Expenses</a>
        <a href="#summary">Summary</a>

        <button className="share-btn">
          <Share2 size={17} />
          Share
        </button>
      </div>

    </nav>
  );
}

export default Navbar;