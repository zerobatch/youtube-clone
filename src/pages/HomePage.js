import React, { Component } from "react";
import { FixedSizeList as List } from "react-window";

import VideoList from "../components/Video/VideoList";

class HomePage extends Component {
  render() {
    return (
      <List useIsScrolling>
        <VideoList {...this.props} />;
      </List>
    );
  }
}

export default HomePage;
