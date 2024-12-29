from django.contrib import admin
from .models import Usermessage, Botresponse


# Register the models
class UsermessageAdmin(admin.ModelAdmin):
    list_display = ("created_at", "message")


class BotresponseAdmin(admin.ModelAdmin):
    list_display = ("created_at", "message_id", "response")


admin.site.register(Usermessage, UsermessageAdmin)
admin.site.register(Botresponse, BotresponseAdmin)
