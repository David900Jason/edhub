from django.contrib import admin
from .models import Todo

# Register your models here.
@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ('task', 'status', 'created_at', 'user')
    list_filter = ('status', 'user')
    search_fields = ('task',)

