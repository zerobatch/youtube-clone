import React, { Component } from "react";
import PropTypes from "prop-types";
import { VideoItem } from "./partials";
import { VirtualList } from "../Common";

class VideoList extends Component {
  static propTypes = {
    category: PropTypes.string,
    videos: PropTypes.array
  };

  static defaultProps = {
    category: "",
    videos: []
  };

  state = {
    videos: [],
    error: null
  };

  async componentDidMount() {
    try {
      const videos = await this.props.getVideosFromCategory(
        this.props.category
      );

      this.setState({ videos });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <section className="VideoList">
        <div className="VideoList__Category">Recomendados</div>
        <VirtualList itemCount={5} itemSize={this.state.videos.length}>
          {this.state.videos.map(video => (
            <VideoItem key={video.description} video={video} />
          ))}
        </VirtualList>
      </section>
    );
  }
}

export default VideoList;
