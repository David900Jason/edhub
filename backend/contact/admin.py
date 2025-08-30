from django.contrib import admin
from .models import ContactMessage

# Register your models here.
@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'message', 'type', 'created_at')
    list_filter = ('type', 'created_at')
    search_fields = ('name', 'email', 'message')
    ordering = ('-created_at',)