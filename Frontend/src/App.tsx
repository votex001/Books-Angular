import { Component, ReactNode } from "react";
import { login } from "../store/actions/user.actions";
interface AppProps {
  children: ReactNode;
}
export class App extends Component<AppProps> {
  componentDidMount(): void {
    this.autoLogin();
  }

  autoLogin = async () => {
    await login();
  };
  render(): any {
    return <>{this.props.children}</>;
  }
}
