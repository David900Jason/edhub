# payments/models.py
import uuid
import random
import string
from django.db import models
from django.conf import settings

def generate_payment_code(length=8):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

def generate_fake_id(length=6):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

class Wallet(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="wallet",
        limit_choices_to={"role": "student"},
    )
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    currency = models.CharField(max_length=4, default="EGP")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.full_name}'s Wallet"


class Payment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    code = models.CharField(max_length=12, default=generate_payment_code)
    payment_id = models.CharField(max_length=6, default=generate_fake_id)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    wallet = models.ForeignKey(
        "Wallet",
        on_delete=models.CASCADE,
        related_name="payments",
        null=True,
        blank=True
    )
    is_used = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment {self.code} - {self.amount} EGP"
