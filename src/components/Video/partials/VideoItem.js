import React from "react";
import { Image, Feed } from "semantic-ui-react";
import ReactTimeAgo from "react-time-ago";

export const VideoItem = ({
  video: { thumbnail, title, visualizations, created_at }
}) => {
  return (
    <article className="VideoItem">
      <Image alt="video_name" src={thumbnail} size="medium" centered />
      <Feed>
        <Feed.Event>
          <Feed.Label>
            <img
              alt="video_user"
              src="https://yt3.ggpht.com/a-/AAuE7mCWkFY3eid-4HRMOycMuwcemf0v-06Cl5fsuw=s88-c-k-c0x00ffffff-no-rj-mo"
            />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>{title}</Feed.Summary>
            <Feed.Meta className="VideoDetail__TimeAgo">
              <Feed.Like>
                <p style={{ marginBottom: 0 }}>ATHLEAN-X</p>
                <p>
                  {" "}
                  {visualizations} vistas •{" "}
                  <ReactTimeAgo date={created_at} locale="en" />
                </p>
              </Feed.Like>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    </article>
  );
};
