import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import logo from "/imgs/logo.svg";

export class Header extends Component {
  links = [
    { title: "Home", to: "/" },
    { title: "Profile", to: "/profile" },
    { title: "Login", to: "/login" },
  ];

  render() {
    return (
      <section className="header">
        <main className="header-main">
          <Link to={"/"} className="logo">
            <ReactSVG src={logo} />
            <h1>MyBook</h1>
          </Link>
          <nav className="navigation">
            <ul className="">
              {this.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </main>
      </section>
    );
  }
}
