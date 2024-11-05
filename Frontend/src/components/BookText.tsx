import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

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

  async componentDidMount() {
    const { params } = this.props.match;
    await this.fetchText(params.id);
  }

  fetchText = async (id: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:2027/api/books/${id}/txt`);
      if (response.ok) {
        const textData = await response.text();
        const processedTxt = this.processHtml(textData);
        this.setState({ text: processedTxt, loading: false });
      } else {
        console.error("Failed to fetch text:", response.statusText);
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error("Error fetching text:", error);
      this.setState({ loading: false });
    }
  };
  processHtml(html: string): string {
    // Create a new DOMParser instance
    const parser = new DOMParser();
    // Parse the HTML string into a document
    const doc = parser.parseFromString(html, "text/html");

    // Select all img elements and update their src attributes
    const images = doc.querySelectorAll("img");
    images.forEach((img) => {
      const src = img.getAttribute("src");
      // Check if the src is a relative URL
      if (src && !src.startsWith("http")) {
        // Modify the src to include the full URL
        img.setAttribute(
          "src",
          `https://www.gutenberg.org/cache/epub/${this.props.match.params.id}/${src}`
        );
      }
    });

    // Return the modified HTML as a string
    return doc.body.innerHTML;
  }

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
