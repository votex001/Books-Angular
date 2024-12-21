import { Component, ReactNode } from "react";
import { User } from "../../assets/models/user.model";
import { connect } from "react-redux";
import { RootState } from "../../../store/store";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { editUser, login } from "../../../store/actions/user.actions";
import CloudinaryUpload, { CloudinaryAttachment } from "../CloudinaryUpload";
import avatar from "/imgs/avatar.jpg";
import { Books } from "../Books";
import { Book } from "../../assets/models/favoriteBooks.models";
import { favService } from "../../services/fav.service";

interface ProfileDetailsProps extends RouteComponentProps {
  user: User | null;
}
interface ProfileDetailsState {
  userBooks: Book[];
}

class _ProfileDetails extends Component<
  ProfileDetailsProps,
  ProfileDetailsState
> {
  componentDidMount(): void {
    this.onLogin();
    this.getMyBooks();
  }
  constructor(props: any) {
    super(props);
    this.state = {
      userBooks: [],
    };
  }

  async getMyBooks() {
    try {
      const { books } = await favService.getUserFav();
      this.setState({ userBooks: books });
    } catch (err) {
      console.log(err);
    }
  }

  async onLogin() {
    try {
      await login();
      if (!this.props.user) {
        this.handleRedirect();
      }
    } catch (err) {
      console.log(err);
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
    const { user } = this.props;
    return (
      <section>
        <header>
          <CloudinaryUpload
            anchorEl={
              <span>
                <img src={user?.imgUrl || avatar} />
              </span>
            }
            onAttachUrl={this.handleAttachment}
          />
          <section>
            <h1>{user?.fullName}</h1>
            <p>{user?.email}</p>
          </section>
        </header>
        <main>
          <h2>Your favorites books</h2>
          {this.state.userBooks && <Books books={this.state.userBooks} />}
        </main>
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
