import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import React, { Component } from "react";
import { login } from "../../../store/actions/user.actions";
import { Link } from "react-router-dom";
interface LoginState {
  form: {
    email: string;
    password: string;
  };
  err: boolean;
}
export class Login extends Component<{}, LoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      form: { email: "", password: "" },
      err: false,
    };
  }
  onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = this.state.form;
    try {
      if (email && password) {
        const user = await login({ email, password });
        console.log(user);
        if (user) {
          window.location.href = "/";
        }
      }
    } catch (e) {
      this.setState({ err: true });
    }
  };
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    this.setState((prevState) => {
      return { ...prevState, form: { ...prevState.form, [name]: value } };
    });
  };
  render() {
    return (
      <section>
        <main>
          <div>
            <form onSubmit={this.onSubmit}>
              <label>
                <Input
                  type="email"
                  name="email"
                  value={this.state.form.email}
                  onChange={this.onChange}
                  required
                />
              </label>
              <label>
                <Input.Password
                  name="password"
                  placeholder="input password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  onChange={this.onChange}
                  value={this.state.form.password}
                />
              </label>
              {this.state.err && <span>Wrong email or password</span>}
              <Link to={"/resetPassword"}>Forgot Password?</Link>
              <button>Login</button>
            </form>
          </div>
        </main>
      </section>
    );
  }
}
