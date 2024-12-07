import React, { Component, ReactNode } from "react";
interface ResetFormProps {
  email: string;

  onSubmit: ({ newPassword }: { newPassword: string }) => void;
}
interface ResetFromState {
  form: {
    pass: string;
    confirmPass: string;
  };
  errMsg: boolean;
}
export class ResetForm extends Component<ResetFormProps, ResetFromState> {
  constructor(props: any) {
    super(props);
    this.state = {
      form: {
        pass: "",
        confirmPass: "",
      },
      errMsg: false,
    };
  }

  onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { pass, confirmPass } = this.state.form;
    if (!pass || !confirmPass || pass !== confirmPass) {
      this.setState({ errMsg: true });
    } else {
      this.props.onSubmit({ newPassword: pass });
    }
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    this.setState((prevState) => {
      return {
        ...prevState,
        errMsg: false,
        form: { ...prevState.form, [name]: value },
      };
    });
  };

  render(): ReactNode {
    const { pass, confirmPass } = this.state.form;
    const { errMsg } = this.state;
    return (
      <section>
        <form onSubmit={this.onSubmit}>
          <h1>{this.props.email}</h1>
          <label>
            <p>New password</p>
            <input name="pass" onChange={this.handleChange} value={pass} />
            {errMsg && !pass && <span>New password can't be empty</span>}
          </label>
          <label>
            <p>Confirm password</p>
            <input
              name="confirmPass"
              onChange={this.handleChange}
              value={confirmPass}
            />
            {errMsg && !confirmPass && <span>Confirm your password</span>}
            {errMsg && pass !== confirmPass && confirmPass && (
              <span>Passwords do not match</span>
            )}
          </label>
          <button>Change password</button>
        </form>
      </section>
    );
  }
}
