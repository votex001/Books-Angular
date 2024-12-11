import React, { Component, ReactNode } from "react";
import { userService } from "../../services/user.service";
import { login } from "../../../store/actions/user.actions";

interface signupState {
  form: {
    email: string;
    fullName: string;
    password: string;
    confirmPass: string;
  };
  alert: boolean;
  confPassAlert: boolean;
  nextStep: boolean;
}

export class Signup extends Component<{}, signupState> {
  constructor(props: any) {
    super(props);
    this.state = {
      form: {
        email: "",
        fullName: "",
        password: "",
        confirmPass: "",
      },
      alert: false,
      confPassAlert: false,
      nextStep: false,
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState((prevState) => {
      return { ...prevState, form: { ...prevState.form, [name]: value } };
    });
  };

  onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState(
      (prevState) => {
        return { ...prevState, formErr: false };
      },
      async () => {
        const { email, fullName, password, confirmPass } = this.state.form;
        if (!email || !fullName || !password || !confirmPass) {
          return this.setState({ alert: true });
        } else if (confirmPass !== password) {
          return this.setState({ confPassAlert: true });
        } else {
          const res = await userService.signUp(this.state.form);

          if (res.status === 201) {
            this.setState({ nextStep: true });
          }
        }
      }
    );
  };

  onConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const codeInput =
      form.querySelector<HTMLInputElement>('input[name="code"]');
    try {
      if (codeInput) {
        await userService.confirmEmail(this.state.form.email, codeInput.value);
        login();
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err);
    }
  };

  get alert() {
    return {
      fullName: this.state.alert && !this.state.form.fullName && (
        <p>Enter your full name</p>
      ),
      password: this.state.alert && !this.state.form.password && (
        <p>Password can't be empty</p>
      ),
      confPass: this.state.alert && !this.state.form.confirmPass && (
        <p>Confirm your password</p>
      ),
      matchPass: this.state.confPassAlert && !!this.state.form.confirmPass && (
        <p>Passwords do not match</p>
      ),
    };
  }

  render(): ReactNode {
    return (
      <section>
        <header></header>
        <main>
          {this.state.nextStep ? (
            <form onSubmit={this.onConfirm}>
              <h2>Confirm Your Email</h2>
              <p>We have sent a code to your email. Please enter it below:</p>
              <input name="code" required />
              <button>Confirm</button>
            </form>
          ) : (
            <form onSubmit={this.onSubmit}>
              <label>
                <h2>Email</h2>
                <input
                  type="email"
                  name="email"
                  value={this.state.form.email}
                  onChange={this.handleChange}
                  required
                />
              </label>
              <label>
                <h2>Full Name</h2>
                <input
                  name="fullName"
                  value={this.state.form.fullName}
                  onChange={this.handleChange}
                />
                {this.alert.fullName}
              </label>
              <label>
                <h2>Password</h2>
                <input
                  name="password"
                  value={this.state.form.password}
                  onChange={this.handleChange}
                />
                {this.alert.password}
              </label>
              <label>
                <h2>Confirm Password</h2>
                <input
                  name="confirmPass"
                  value={this.state.form.confirmPass}
                  onChange={this.handleChange}
                />
                {this.alert.confPass}
                {this.alert.matchPass}
              </label>
              <button>Sign Up</button>
            </form>
          )}
        </main>
      </section>
    );
  }
}
