import React, { Component } from "react";
import { httpService } from "../../services/http.service";
interface ResetPasswordState {
  email: string;
  message: string;
}
export class ResetPassword extends Component<{}, ResetPasswordState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      message: "",
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: e.target.value });
  };

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email } = this.state;
    if (!email) {
      this.setState({ message: "Please enter your email address." });
    }
    try {
      const res = await httpService.post<any>("auth/request-password-reset", {
        email,
      });
      if (res.ok) {
        this.setState({
          message: "A password reset link has been sent to your email.",
          email: "",
        });
      } else {
        this.setState({
          message: res.message || "Failed to send reset email.",
        });
      }
    } catch (err) {
      console.log(err);
      this.setState({ message: "Network error. Please try again later." });
    }
  };
  render() {
    const { email, message } = this.state;
    return (
      <section className="reset-password">
        <h2>Reset Password</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={this.handleChange}
            placeholder="Enter your email"
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>
        {message && <p className="message">{message}</p>}
      </section>
    );
  }
}
