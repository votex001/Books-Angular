import { Component, ReactNode } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { httpService } from "../../services/http.service";
import { ResetForm } from "./ResetForm";

interface Params {
  token: string;
}

interface ResetPassProps extends RouteComponentProps<Params> {}
interface ResetPassState {
  loading: boolean;
  email: string;
  message: string;
}

class _resetPass extends Component<ResetPassProps, ResetPassState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      email: "",
      message: "",
    };
  }
  componentDidMount(): void {
    this.checkToken();
  }

  checkToken = async () => {
    const { token } = this.props.match.params;
    type VerifyResetTokenResponse =
      | { success: true; email: string }
      | { success: false; message: string };
    try {
      const ans = await httpService.post<VerifyResetTokenResponse>(
        "auth/verify-reset-token",
        {
          token,
        }
      );
      if (ans.success) {
        this.setState({ loading: false, email: ans.email });
      } else {
        this.setState({ loading: false, message: ans.message });
      }
    } catch (err) {
      console.log(err);
      this.setState({ loading: false, message: "Network problem, try later." });
    }
  };
  onSubmit = async ({ newPassword }: { newPassword: string }) => {
    const ans: any = await httpService.post("auth/reset-password", {
      token: this.props.match.params.token,
      newPassword,
    });
    this.setState({ email: "", message: ans.message });
  };

  render(): ReactNode {
    return (
      <section>
        {this.state.loading ? (
          <>Loading...</>
        ) : (
          <div>
            {this.state.email ? (
              <ResetForm email={this.state.email} onSubmit={this.onSubmit} />
            ) : (
              this.state.message
            )}
          </div>
        )}
      </section>
    );
  }
}

export const ResetPass = withRouter(_resetPass);
