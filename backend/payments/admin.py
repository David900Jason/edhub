from django.contrib import admin
from .models import Payment, Wallet

# Register your models here.
@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ("id", "code", "amount", "is_used", "created_at", "wallet")
    list_filter = ("is_used", "wallet")
    search_fields = ("code",)
    readonly_fields = ("created_at",)
    fields = ("code", "amount", "is_used", "created_at", "wallet")

@admin.register(Wallet)
class WalletAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "balance", "currency", "created_at")
    list_filter = ("user",)
    search_fields = ("user__full_name",)
    readonly_fields = ("created_at",)
    fields = ("user", "balance", "currency", "created_at")
