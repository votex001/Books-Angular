import { Component, ReactNode } from "react";
import { User } from "../../assets/models/user.model";
import { connect } from "react-redux";
import { RootState } from "../../../store/store";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { login } from "../../../store/actions/user.actions";

interface ProfileDetailsState extends RouteComponentProps {
  user: User | null;
}

class _ProfileDetails extends Component<ProfileDetailsState> {
  async componentDidMount(): Promise<void> {
    await login();
    if (!this.props.user) {
      this.handleRedirect();
    }
  }

  handleRedirect = () => {
    this.props.history.push("/");
  };
  render(): ReactNode {
    return <pre>{JSON.stringify(this.props.user, null, 2)}</pre>;
  }
}
const mapStateToProp = (state: RootState) => ({
  user: state.userModule.user,
});
export const ProfileDetails = connect(mapStateToProp)(
  withRouter(_ProfileDetails)
);
