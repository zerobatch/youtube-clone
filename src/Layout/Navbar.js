import React from "react";
import { Icon } from "semantic-ui-react";
import { YoutubeIcon } from "../components/Custom/CustomIcons";
import DynamicAuthModal from "../components/AuthForms/DynamicAuthModal";
import UserDropdown from "./UserDropdown";

export const Navbar = ({ context }) => {
  return (
    <nav className="Navbar">
      <div className="Navbar__Content">
        <div className="Navbar__Brand">
          <Icon name="bars" size="large" />
          <a href="/">
            <YoutubeIcon className="Navbar__Logo" />
          </a>
        </div>
        <div className="Navbar__Menu">
          {context.isUserSignedIn ? (
            <UserDropdown user={context.user} handleSignOut={context.signOut} />
          ) : (
            <DynamicAuthModal context={context} />
          )}
        </div>
      </div>
    </nav>
  );
};
