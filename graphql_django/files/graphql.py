from datetime import timedelta

GRAPHENE = {
    'MIDDLEWARE': [
        'graphql_jwt.middleware.JSONWebTokenMiddleware',
    ],
}

AUTHENTICATION_BACKENDS = [
<<<<<<< HEAD
    "graphql_auth.backends.GraphQLAuthBackend"
=======
    'graphql_jwt.backends.JSONWebTokenBackend',
>>>>>>> b4b246cc3ab4610ce2f82bfb34f096ba9cab66ce
    'django.contrib.auth.backends.ModelBackend',
]

GRAPHQL_JWT = {
    "JWT_VERIFY_EXPIRATION": True,
    "JWT_LONG_RUNNING_REFRESH_TOKEN": True,
    'JWT_EXPIRATION_DELTA': timedelta(minutes=15),
    'JWT_REFRESH_EXPIRATION_DELTA': timedelta(days=7),

    "JWT_ALLOW_ANY_CLASSES": [
        "graphql_auth.mutations.Register",
        "graphql_auth.mutations.VerifyAccount",
        "graphql_auth.mutations.ResendActivationEmail",
        "graphql_auth.mutations.SendPasswordResetEmail",
        "graphql_auth.mutations.PasswordReset",
        "graphql_auth.mutations.ObtainJSONWebToken",
        "graphql_auth.mutations.VerifyToken",
        "graphql_auth.mutations.RefreshToken",
        "graphql_auth.mutations.RevokeToken",
        "graphql_auth.mutations.VerifySecondaryEmail",
    ]
}

#Subscriptions
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer"
    }
}
