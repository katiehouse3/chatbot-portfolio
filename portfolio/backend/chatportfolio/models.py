from django.db import models


# Create your models here.
class Usermessage(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    message = models.CharField(max_length=500)

    # string representation of the class
    def __str__(self):

        #it will return the title
        return self.message


class Botresponse(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    message_id = models.ForeignKey(Usermessage, on_delete=models.CASCADE)
    response = models.CharField(max_length=500)

    # string representation of the class
    def __str__(self):

        #it will return the title
        return self.response
