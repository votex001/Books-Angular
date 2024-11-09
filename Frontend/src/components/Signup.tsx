import { Component, ReactNode } from "react";

interface signupState {
  email: string;
  fullName: string;
  password: string;
  confirmPass: string;
}

export class Signup extends Component<{}, signupState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      fullName: "",
      password: "",
      confirmPass: "",
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(this.state);
  };

  render(): ReactNode {
    return (
      <section>
        <header></header>
        <main>
          <form onSubmit={this.onSubmit}>
            <label>
              <h2>Email</h2>
              <input
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </label>
            <label>
              <h2>Full Name</h2>
              <input
                name="fullName"
                value={this.state.fullName}
                onChange={this.handleChange}
              />
            </label>
            <label>
              <h2>Password</h2>
              <input
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </label>
            <label>
              <h2>Confirm Password</h2>
              <input
                name="confirmPass"
                value={this.state.confirmPass}
                onChange={this.handleChange}
              />
            </label>
            <button>Sign Up</button>
          </form>
        </main>
      </section>
    );
  }
}
