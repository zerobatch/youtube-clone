import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Dropdown, Comment, Icon, Image, Message } from "semantic-ui-react";

const UserDropdown = ({ user, handleSignOut }) => (
  <Dropdown
    pointing="top right"
    trigger={
      <Image
        src="https://yt3.ggpht.com/a-/AAuE7mCWkFY3eid-4HRMOycMuwcemf0v-06Cl5fsuw=s88-c-k-c0x00ffffff-no-rj-mo"
        alt="avatar"
        size="mini"
        circular
        verticalAlign="middle"
      />
    }
  >
    <Dropdown.Menu>
      <Dropdown.Item as={Message}>
        <Comment.Group style={{ backgroundColor: "hsl(0%,0%,93.3%)" }}>
          <Comment>
            <Comment.Avatar src={user.avatar} />
            <Comment.Content>
              <Comment.Author as="a">{user.username}</Comment.Author>
              <Comment.Text>{user.email}</Comment.Text>
            </Comment.Content>
          </Comment>
        </Comment.Group>
      </Dropdown.Item>
      <Dropdown.Item>
        <Icon name="user" color="grey" />
        <Link to={`/channel/${user.username}`}>My channel</Link>
      </Dropdown.Item>
      <Dropdown.Item onClick={handleSignOut}>
        <Icon name="sign-out" color="grey" />
        Sign out
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

UserDropdown.propTypes = {
  handleSignOut: PropTypes.func.isRequired,
  user: PropTypes.shape({
    //   username: PropTypes.string,
    email: PropTypes.string
    //   avatar: PropTypes.string,
    //   public: PropTypes.number
  })
};
export default UserDropdown;
