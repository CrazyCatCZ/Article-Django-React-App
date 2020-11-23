import graphene
import graphql_jwt
from graphql_auth import mutations


class AuthMutation(graphene.ObjectType):
   register = mutations.Register.Field()
   verify_account = mutations.VerifyAccount.Field()
   resend_activation_email = mutations.ResendActivationEmail.Field()
   send_password_reset_email = mutations.SendPasswordResetEmail.Field()
   password_reset = mutations.PasswordReset.Field()
   password_change = mutations.PasswordChange.Field()
   archive_account = mutations.ArchiveAccount.Field()
   delete_account = mutations.DeleteAccount.Field()
   update_account = mutations.UpdateAccount.Field()
   send_secondary_email_activation =  mutations.SendSecondaryEmailActivation.Field()
   verify_secondary_email = mutations.VerifySecondaryEmail.Field()
   swap_emails = mutations.SwapEmails.Field()

   # django-graphql-jwt inheritances
<<<<<<< HEAD
   token_auth = mutations.ObtainJSONWebToken.Field()
   verify_token = mutations.VerifyToken.Field()
   refresh_token = mutations.RefreshToken.Field()
   revoke_token = mutations.RevokeToken.Field() 
   
=======
   token_auth = graphql_jwt.ObtainJSONWebToken.Field()
   verify_token = graphql_jwt.Verify.Field()
   refresh_token = graphql_jwt.Refresh.Field()

>>>>>>> b4b246cc3ab4610ce2f82bfb34f096ba9cab66ce
   #delete JWT token
   delete_token_cookie = graphql_jwt.DeleteJSONWebTokenCookie.Field()
   delete_refresh_token_cookie = graphql_jwt.DeleteRefreshTokenCookie.Field()





 