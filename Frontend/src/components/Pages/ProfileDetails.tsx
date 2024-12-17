import { Component, ReactNode } from "react";
import { User } from "../../assets/models/user.model";
import { connect } from "react-redux";
import { RootState } from "../../../store/store";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { editUser, login } from "../../../store/actions/user.actions";
import CloudinaryUpload, { CloudinaryAttachment } from "../CloudinaryUpload";
import avatar from "/imgs/avatar.jpg";

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

  handleAttachment = (data: CloudinaryAttachment) => {
    console.log(data);
    if (!this.props.user) {
      return;
    }
    editUser({ ...this.props.user, imgUrl: data.url });
  };

  render(): ReactNode {
    return (
      <section>
        <header>
          <CloudinaryUpload
            anchorEl={
              <span>
                <img src={this.props.user?.imgUrl || avatar} />
              </span>
            }
            onAttachUrl={this.handleAttachment}
          />
        </header>
      </section>
    );
  }
}
const mapStateToProp = (state: RootState) => ({
  user: state.userModule.user,
});
export const ProfileDetails = connect(mapStateToProp)(
  withRouter(_ProfileDetails)
);
