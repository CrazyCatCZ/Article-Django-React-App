import { useMutation } from "@apollo/react-hooks";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";
import {
  PROFILE_FOLLOW_MUTATION,
  PROFILE_UNFOLLOW_MUTATION,
} from "../Api/profile/profile";
import { UserContext } from "../UserContext";

const ProfileBodyButtons = ({ getProfileInfo }) => {
  const { user: currentUser } = useContext(UserContext);
  const {
    totalFollowers,
    followers,
    user: { username },
  } = getProfileInfo;

  const history = useHistory();
  const [followProfile] = useMutation(PROFILE_FOLLOW_MUTATION);
  const [unfollowProfile] = useMutation(PROFILE_UNFOLLOW_MUTATION);

  const handleOnFollow = async () => {
    await followProfile({
      variables: { following: username },
    });
    window.location.reload(false); // Reset site
  };

  const handleOnUnfollow = async () => {
    await unfollowProfile({
      variables: { following: username },
    });
    window.location.reload(false); // Reset site
  };

  const handleOnMessage = () => {
    // Redirect to chat room
    history.push(`/message/${username}`);
  };

  // Check if user follow this profile
  const userIsFollowingProfile = followers.some((follower) => {
    return follower.username === currentUser;
  });

  return (
    <div className="profile-buttons-container">
      {/* If this is not users profile */}
      {currentUser !== username ? (
        <div className="profile-buttons">
          <Button as="div" labelPosition="right">
            {userIsFollowingProfile ? (
              <Button onClick={handleOnUnfollow} color="blue">
                <Icon name="user times" />
                Unfollow
              </Button>
            ) : (
              <Button onClick={handleOnFollow} color="blue">
                <Icon name="user plus" />
                Follow
              </Button>
            )}
            <Label basic color="blue" pointing="left">
              {totalFollowers}
            </Label>
          </Button>
          <Button
            onClick={handleOnMessage}
            className="profile-message-button"
            color="blue"
          >
            <Icon name="comment" /> Message
          </Button>
        </div>
      ) : (
        <Button as="div" labelPosition="right">
          <Button color="blue">
            <Icon name="users" />
            Followers
          </Button>
          <Label basic color="blue" pointing="left">
            {totalFollowers}
          </Label>
        </Button>
      )}
    </div>
  );
};

export default ProfileBodyButtons;
