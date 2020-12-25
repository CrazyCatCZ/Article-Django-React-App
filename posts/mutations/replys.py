import datetime

import graphene
from django_graphql_ratelimit import ratelimit
from graphene_django.types import DjangoObjectType
from graphql import GraphQLError
from graphql_jwt.decorators import login_required
from users.models import CustomUser

from posts.models import Comment, Reply


class ReplyType(DjangoObjectType):
   class Meta:
      model = Reply


# Create reply
class ReplyComment(graphene.Mutation):
   class Arguments:
      id = graphene.ID(required=True)
      content = graphene.String(required=True)

   message = graphene.String()

   @staticmethod
   @ratelimit(key="ip", rate="3/m", block=True)
   def mutate(root, info, id, content):
      message = ''
      user = info.context.user
      comment = Comment.objects.get(id=id)
      posted = datetime.datetime.now().strftime('%d %B %Y')
      today = datetime.datetime.now().strftime('%d %B %Y')

      # Filter replies that belongs to user and are posted today
      replies_posted_today = Reply.objects.filter(user__username=user, posted=today)
      
      if content == '':
         raise GraphQLError('Content is not filled')

      elif replies_posted_today.count() >= 20:
         message = 'You have reached your maximum replies per day!'

      # Success
      else:
         reply = Reply(comment=comment, user=user, content=content, posted=posted)
         reply.save()
         message = 'Success'

      return ReplyComment(message=message)


# Delete reply
class DeleteReply(graphene.Mutation):
   class Arguments:
      id = graphene.ID(required=True)

   message = graphene.String()

   @staticmethod
   def mutate(root, info, id):
      message = ''
      user = info.context.user
      reply = Reply.objects.get(id=id)

      not_users_reply = user != reply.user

      if not_users_reply:
         raise GraphQLError('This is not your reply!')

      reply.delete()
      message = 'Success'

      return DeleteReply(message=message)
