import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import logo from "/imgs/logo.svg";
import { connect } from "react-redux";
import { RootState } from "../../store/store";
import { User } from "../assets/models/user.model";
import { userService } from "../services/user.service";

interface HeaderProps {
  user: User | null;
}

export class _Header extends Component<HeaderProps> {
  get getLinks() {
    const { user } = this.props;
    return [
      { title: "Home", to: "/" },
      { title: "Profile", to: "/profile", hidden: !user },
      { title: "Login", to: "/login", hidden: user },
      {
        title: "Sign out",
        to: "",
        hidden: !user,
        onClick: async (e: React.MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault();
          userService.logout();
        },
      },
    ].map(
      (link) =>
        !link.hidden && (
          <li key={link.to}>
            <Link to={link.to} onClick={link.onClick || undefined}>
              {link.title}
            </Link>
          </li>
        )
    );
  }
  render(): ReactNode {
    return (
      <section className="header">
        <main className="header-main">
          <Link to={"/"} className="logo">
            <ReactSVG src={logo} />
            <h1>MyBook</h1>
          </Link>
          <nav className="navigation">
            <ul className="list">{this.getLinks}</ul>
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
