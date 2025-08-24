# payments/serializers.py
from rest_framework import serializers
from .models import Wallet, Payment

class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ["id", "balance", "currency", "created_at"]

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ["id", "payment_id", "code", "amount", "is_used", "created_at"]
