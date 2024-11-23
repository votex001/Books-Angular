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
    const user = await login();
    if (user) {
      console.log(user);
    }
  };
  render(): any {
    return <>{this.props.children}</>;
  }
}
