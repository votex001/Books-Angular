import { Component } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import logo from "/imgs/logo.svg";
import { connect } from "react-redux";
import { RootState } from "../../store/store";
import { User } from "../assets/models/user.model";

interface HeaderProps {
  user: User | null;
}

export class _Header extends Component<HeaderProps> {
  links = [
    { title: "Home", to: "/" },
    { title: "Profile", to: "/profile", hidden: !this.props.user },
    { title: "Login", to: "/login", hidden: this.props.user },
    { title: "Sign out", to: "/logout", hidden: !this.props.user },
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
            <ul className="list">
              {this.links.map(
                (link) =>
                  !link.hidden && (
                    <li key={link.to}>
                      <Link to={link.to}>{link.title}</Link>
                    </li>
                  )
              )}
            </ul>
          </nav>
        </main>
      </section>
    );
  }
}
const mapStateToProp = (state: RootState) => ({
  user: state.userModule.user,
});

export const Header = connect(mapStateToProp)(_Header);
