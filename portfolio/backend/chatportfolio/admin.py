from django.contrib import admin
from .models import Messages


# Register the models
class MessagesAdmin(admin.ModelAdmin):
    list_display = ("created_at", "user_message", "response")


admin.site.register(Messages, MessagesAdmin)
