import { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { bookService } from "../services/bookService";

interface Params {
  id: string;
}
interface BookTextProps extends RouteComponentProps<Params> {}
interface BookTextState {
  text: string;
  loading: boolean;
}

class _bookText extends Component<BookTextProps, BookTextState> {
  constructor(props: any) {
    super(props);
    this.state = {
      text: "",
      loading: true,
    };
  }

  componentDidMount() {
    const { params } = this.props.match;
    this.getText(params.id);
  }

  getText = async (id: string) => {
    try {
      const bookTXT = await bookService.getBookTxt(id);
      console.log(bookTXT);
      this.setState({ loading: false, text: bookTXT });
    } catch (err) {
      console.log(err);
      //TODO
      this.setState({ loading: false, text: "BookText[errHTML] 36" });
    }
  };

  render() {
    const { text, loading } = this.state;

    return (
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div
            className="text"
            dangerouslySetInnerHTML={{ __html: text }}
          ></div>
        )}
      </div>
    );
  }
}

export const BookText = withRouter(_bookText);
