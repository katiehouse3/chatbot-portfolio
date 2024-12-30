from django.shortcuts import render

# import view sets from the REST framework
from rest_framework import viewsets

# import the TodoSerializer from the serializer file
from .serializers import UsermessageSerializer, BotresponseSerializer

# import the Todo model from the models file
from .models import Usermessage, Botresponse


# create a class for the Todo model viewsets
class UsermessageView(viewsets.ModelViewSet):

    # create a serializer class and 
    # assign it to the TodoSerializer class
    serializer_class = UsermessageSerializer

    # define a variable and populate it 
    # with the Todo list objects
    queryset = Usermessage.objects.all()


# create a class for the Todo model viewsets
class BotresponseView(viewsets.ModelViewSet):

    # create a serializer class and 
    # assign it to the TodoSerializer class
    serializer_class = BotresponseSerializer

    # define a variable and populate it 
    # with the Todo list objects
    queryset = Botresponse.objects.all()