from django.db import models




class Messages(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    user_message = models.CharField(max_length=5000)
    response = models.CharField(max_length=5000)

    # string representation of the class
    def __str__(self):

        #it will return the title
        return self.response
