import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import React, { Component } from "react";
import { login } from "../../../store/actions/user.actions";
interface LoginState {
  form: {
    email: string;
    password: string;
  };
}
export class Login extends Component<{}, LoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      form: { email: "", password: "" },
    };
  }
  onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = this.state.form;
    if (email && password) {
      const user = await login({ email, password });
      if(user){
        window.location.href = "/"
      }
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
              <button type="button">Forgot Password?</button>
              <button>Login</button>
            </form>
          </div>
        </main>
      </section>
    );
  }
}
