import graphene
from graphene_django.types import DjangoObjectType
from graphql import GraphQLError
from graphql_jwt.decorators import login_required

from users.models import CustomUser, Profile


class ProfileType(DjangoObjectType):
   class Meta:
      model = Profile


# Get profile info 
class GetProfileInfo(graphene.Mutation):
   class Arguments:
      user = graphene.String(required=True)
      
   profile = graphene.Field(ProfileType)
   message = graphene.String()

   @staticmethod
   def mutate(root, info, user):
      message = ''

      users_profile_exists = CustomUser.objects.filter(username=user).count() != 0

      if users_profile_exists:
         message = 'Success'
         user = CustomUser.objects.get(username=user)
         profile = Profile.objects.get(user=user)

         return GetProfileInfo(profile=profile, message=message)
      
      else: 
         raise GraphQLError("This profile doesn't exist")

# Check if user has already profile
class CheckUserProfile(graphene.Mutation):
   class Arguments:
      user = graphene.String(required=True)
      
   profile = graphene.Field(ProfileType)

   @staticmethod
   def mutate(root, info, user):
      user = CustomUser.objects.get(username=user)
      profile, created = Profile.objects.get_or_create(user=user)

      return CheckUserProfile(profile=profile)


# Update the profile by given inputs on frontend
class UpdateProfile(graphene.Mutation):
   class Arguments:
      user = graphene.String(required=True)
      new_user = graphene.String(required=True)
      new_email = graphene.String(required=True)
      image = graphene.String(required=True)

   message = graphene.String()

   @staticmethod
   def mutate(root, info, user, new_user, new_email, image):
      message = ''

      # New_user and new_email combined
      new_user_and_new_email = new_user + new_email
      forbidden_chars = [
         '!','#','$','%','^','&','*','(',')','`','/',',',';','[',']',
         '+','-','>','<','=','\\','*','+','{','}',':','"','|','?'
      ]

      user = CustomUser.objects.get(username=user)
      profile = Profile.objects.get(user=user)

      user_already_exists = CustomUser.objects.filter(username=new_user).exists()
      email_already_exists = CustomUser.objects.filter(email=new_email).exists()

      nothing_was_changed = user.username == new_user and user.email == new_email and image == 'none'
      this_name_already_exists = user_already_exists == True and user.username != new_user
      this_email_already_exists = email_already_exists == True and user.email != new_email

      fields_include_forbidden_characters = not [char for char in forbidden_chars if char in new_user_and_new_email] == []
      email_include_multiple_at_signs = new_email.count('@') > 1 or new_email.count('.') > 1
      fields_include_special_characters = '@' in new_user or '.' in new_user

      if nothing_was_changed:
         message = 'You need to change your username, email or image in order to update your profile!'

      elif this_name_already_exists:
         message = 'This name is already taken!'

      elif this_email_already_exists:
         message = 'This email already exists!'

      elif fields_include_forbidden_characters == True or fields_include_special_characters:
         message = 'Name or email must not include special characters!'

      elif email_include_multiple_at_signs:
         message = 'Please enter a correct email'

      # If new_user has reached more than 40 chars
      elif len(new_user) >= 40:
         message = 'Your new name has reached maximum of characters! (40 characters)'

      # If new_email has reached more than 50 chars
      elif len(new_email) >= 50:
         message = 'Your new email has reached maximum of characters! (50 characters)'

      else:
         user_selected_image = image != 'none' 

         if user_selected_image:
            profile.image = image

         user.username = new_user
         user.email = new_email

         user.save()
         profile.save()
         message = 'Success'

      return UpdateProfile(message=message)


# Follow user profile
class FollowProfile(graphene.Mutation):
   class Arguments:
      follower = graphene.String(required=True)
      following = graphene.String(required=True)
      
   message = graphene.String()

   @staticmethod
   def mutate(root, info, follower, following):
      message = ''

      # Follower 
      follower = CustomUser.objects.get(username=follower)

      # Following
      following = CustomUser.objects.get(username=following)
      following_profile = Profile.objects.get(user=following)

      if follower == following:
         raise GraphQLError('You cannot follow yourself!')

      else:
         message = 'Success'

         # Add the user to profile followers
         following_profile.followers.add(follower)

         # Count how many followers has the following user
         total_followers = following_profile.followers.all().count()

         # Set the followers to followers total_followers
         following_profile.total_followers = total_followers
         
         # Save the following users profile 
         following_profile.save()

      return FollowProfile(message=message)


# Unfollow user profile
class UnfollowProfile(graphene.Mutation):
   class Arguments:
      follower = graphene.String(required=True)
      following = graphene.String(required=True)
      
   message = graphene.String()

   @staticmethod
   def mutate(root, info, follower, following):
      message = ''
      follower = CustomUser.objects.get(username=follower)

      following = CustomUser.objects.get(username=following)
      following_profile = Profile.objects.get(user=following)

      # Remove follower from followers
      following_profile.followers.remove(follower)

      # Count the total_followers of follower
      total_followers = following_profile.followers.all().count()

      # Save it to total_followers
      following_profile.total_followers = total_followers
      following_profile.save()

      return UnfollowProfile(message=message)
