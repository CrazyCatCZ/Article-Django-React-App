import { useMutation } from "@apollo/react-hooks";
import React, { useContext } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { POST_LIKE_MUTATION, POST_UNLIKE_MUTATION } from "../../Api/post/post";
import { UserContext } from "../../UserContext";

const LikeButton = ({ id, likes, usersLikes }) => {
  const { user } = useContext(UserContext);
  const [likePost] = useMutation(POST_LIKE_MUTATION);
  const [unlikePost] = useMutation(POST_UNLIKE_MUTATION);

  const handleOnLike = async () => {
    await likePost({ variables: { id: id } });
    window.location.reload(false); // Reset site
  };

  const handleOnUnlike = async () => {
    await unlikePost({ variables: { id: id } });
    window.location.reload(false); // Reset site
  };

  // Check if user has liked this post
  const userHasLikedPost = usersLikes.some(({ username }) => {
    return username === user;
  });

  return (
    <>
      <Button as="div" labelPosition="right">
        {userHasLikedPost ? (
          <Button onClick={handleOnUnlike} color="red">
            <Icon name="thumbs down" />
            Unlike
          </Button>
        ) : (
          <Button onClick={handleOnLike} color="red">
            <Icon name="thumbs up" />
            Like
          </Button>
        )}
        <Label basic color="red" pointing="left">
          {likes}
        </Label>
      </Button>
    </>
  );
};

export default LikeButton;
