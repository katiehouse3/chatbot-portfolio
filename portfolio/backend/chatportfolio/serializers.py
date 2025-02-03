# import serializers from the REST framework
from rest_framework import serializers

# import the todo data model
from .models import Usermessage, Botresponse


class UsermessageSerializer(serializers.Serializer):
    query = serializers.CharField(max_length=500)


class BotresponseSerializer(serializers.ModelSerializer):

    # create a meta class
    class Meta:
        model = Botresponse
        fields = ("id", "created_at", "message_id", "response")
