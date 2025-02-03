from django.shortcuts import render
from django.conf import settings

# import view sets from the REST framework
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

# import the TodoSerializer from the serializer file
from .serializers import UsermessageSerializer, BotresponseSerializer

# import the Todo model from the models file
from .models import Usermessage, Botresponse

from .data.prompt import experience
import os
from huggingface_hub import InferenceClient


class ChatbotMessage(APIView):
    def post(self, request):
        serializer = UsermessageSerializer(data=request.data)
        if serializer.is_valid():
            query = serializer.validated_data['query']
            print(query)
            client = InferenceClient(api_key=settings.HUGGINGFACE_TOKEN_API)

            prompt = f"""
            ### WHO ARE YOU
            You are a helpful chatbot who answers questions about Katie's experience. 

            ### EXPERIENCE CONTEXT
            Katie's experience is in the triple brackets below. Answer questions based on the experience.
            ```
            {experience}
            ```

            ### EXAMPLES
            User: What is katie's email?
            Response: katiehouse3@gmail.com

            User: What was katie's GPA?
            Response: Katie's GPA at her MS in Computer Science at UMass Amherst was 3.7

            User: {query}
            Response:
            """

            messages = [{"role": "user", "content": prompt}]

            completion = client.chat.completions.create(
                model="google/gemma-2-2b-it", messages=messages, max_tokens=1000
            )
            
            chat_response = completion.choices[0].message.content
            return Response({"response": chat_response}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    

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
