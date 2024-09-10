from rest_framework import serializers
from .models import User, Products, Customers, Bills, BillDetail

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'first_name', 'last_name', 'created_at', 'updated_at']

class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = ['id', 'name', 'price', 'created_at', 'updated_at']

class CustomersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = ['id', 'name', 'email', 'phone_number', 'address', 'created_at', 'updated_at']

class BillDetailSerializer(serializers.ModelSerializer):
    product = ProductsSerializer()

    class Meta:
        model = BillDetail
        fields = ['id', 'product', 'qty', 
                #   'price',
                  'created_at', 'updated_at']

class BillsSerializer(serializers.ModelSerializer):
    customer = CustomersSerializer()
    # user = UserSerializer()
    bill_details = BillDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Bills
        fields = [
            'id',
            'customer',
            # 'user',
            'bill_details',
            'created_at',
            'updated_at'
            ]
