# import serializers from the REST framework
from rest_framework import serializers

# import the todo data model
from .models import Messages

class ChatbotMessageSerializer(serializers.Serializer):
    query = serializers.CharField(max_length=500)



class MessagesSerializer(serializers.ModelSerializer):

    # create a meta class
    class Meta:
        model = Messages
        fields = '__all__'
