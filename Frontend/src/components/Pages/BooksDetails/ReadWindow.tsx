import { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
interface params {
  id: string;
}

interface ReadWindowParams extends RouteComponentProps<params> {}
class _readWindow extends Component<ReadWindowParams> {
  render() {
    const { params } = this.props.match;
    return <p>{params.id}</p>;
  }
}

export const ReadWindow = withRouter(_readWindow);
