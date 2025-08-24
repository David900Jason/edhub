# payments/views.py
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Wallet, Payment
from .serializers import WalletSerializer, PaymentSerializer

# -------- Student Views --------
class WalletMeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        wallet, _ = Wallet.objects.get_or_create(user=request.user)
        serializer = WalletSerializer(wallet)
        return Response(serializer.data)


class WalletPaymentsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        wallet, _ = Wallet.objects.get_or_create(user=request.user)
        payments = wallet.payments.all()
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)


class WalletTopUpView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        code = request.data.get("code")
        try:
            payment = Payment.objects.get(code=code, is_used=False)
        except Payment.DoesNotExist:
            return Response({"detail": "Invalid or already used payment code."}, status=status.HTTP_400_BAD_REQUEST)

        wallet, _ = Wallet.objects.get_or_create(user=request.user)
        wallet.balance += payment.amount
        wallet.save()

        payment.is_used = True
        payment.save()

        return Response({
            "new_balance": wallet.balance,
            "message": "Top-up successful!"
        }, status=status.HTTP_200_OK)


# -------- Admin Views --------
class AdminPaymentCreateView(generics.CreateAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()
