from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseRedirect
from django.urls import reverse

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Bills, BillDetail
from .serializers import *

from .models import *

# ====] NOTES [====
# 2. TODO FIX USER AUTHENTICATION - AUTHORISATION

'''
USER ADMINISTRATION MANAGEMENT
'''

# POST USER LOGIN
@api_view(["POST"])
@csrf_exempt
def login_view(request):
    data = request.data
    
    # Attempt to sign user in
    username = data.get("username")
    password = data.get("password")

    user = authenticate(request, username=username, password=password)

    # Check if authentication successful
    if user is not None:
        login(request, user)
        return Response({
            "status": {
                "code": 200,
                "description": "Login successful",
            },
        }, status=status.HTTP_200_OK)
        
    else:
        return Response({
            "status": {
                "code": 400,
                "description": "Login unsuccessful: Username/Password mismatch",
            },
        }, status=status.HTTP_400_BAD_REQUEST)

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

# POST USER REGISTER
@api_view(["POST"])
@csrf_exempt
def register(request):
    data = request.data
    
    # Collect data from request
    name = data.get("name")
    username = data.get("username")
    email = data.get("email")
    role = data.get("role")
    
    # Ensure password matches confirmation
    password = data.get("password")
    confirmation = data.get("confirmation")
    
    if password != confirmation:
        return Response({
            "status": {
                "code": 400,
                "description": "Register unsuccessful: Passwords must match",
            },
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # Attempt to create new user
    try:
        user = User.objects.create_user(username=username, email=email, password=password)
        user.name = name  # Add extra fields like 'name' and 'role'
        user.role = role
        user.save()
        
        # Serialize and return user data
        user_data = UserSerializer(user).data
        
        return Response({
            "status": {
                "code": 200,
                "description": "Registration successful",
            },
            "data": user_data
        }, status=status.HTTP_200_OK)

    except IntegrityError:
        return Response({
            "status": {
                "code": 400,
                "description": "Username already taken.",
            }
        }, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        return Response({
            "status": {
                "code": 400,
                "description": f"Registration unsuccessful: {str(e)}",
            },
        }, status=status.HTTP_400_BAD_REQUEST)

# GET USERS LIST
@api_view(["GET"])
def get_user_list(request):
    user_list = User.objects.all()
    
    user_list = UserSerializer(user_list, many=True).data
    
    return Response({
        "status": {
            "code": 200,
            "description": "Ok"
        },
        "data": user_list,
        "paging": None
    }, status=status.HTTP_200_OK)

# GET USER
@api_view(["GET"])
def get_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        user_data = UserSerializer(user).data
        
        return Response({
            "status": {
                "code": 200,
                "description": "Alles Klar",
            },
            "data": user_data,
        }, status=status.HTTP_200_OK)
        
    except User.DoesNotExist:
        return Response({
            "status": {
                "code": 404,
                "description": "User not found",
            },
            "data": [],
        }, status=status.HTTP_404_NOT_FOUND)

# DELETE USER
@api_view(["DELETE"])
def delete_user(request, user_id):
    try: 
        user = User.objects.get(id=user_id)
        user.delete()
        return Response({
            "status": {
                "code": 200,
                "description": "Delete successful",
            },
        }, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({
            "status": {
                "code": 404,
                "description": "user not found",
            },
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            "status": {
                "code": 400,
                "description": f"Delete unsuccessful: {str(e)}",
            },
        }, status=status.HTTP_400_BAD_REQUEST)
        
# PUT UPDATE USER   
@api_view(["PUT"])
def update_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        data = request.data
        
        username = data.get("username", user.username)
        email = data.get("email", user.email)
        role = data.get("role", user.role)        
        
        user.save()
        
        user_data = UserSerializer(user).data

        return Response({
            "status": {
                "code": 200,
                "description": "Update successful",
            },
            "data": user_data
        }, status=status.HTTP_200_OK)
        
    except User.DoesNotExist:
        return Response({
            "status": {
                "code": 404,
                "description": "User not found",
            },
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            "status": {
                "code": 400,
                "description": f"Update unsuccessful: {str(e)}",
            },
        }, status=status.HTTP_400_BAD_REQUEST)
        
'''
PRODUCTS MANAGEMENT
'''
# GET PRODUCTS LISTS
@api_view(["GET"])
def get_product_list(request):
    product_list = Products.objects.all()
    
    product_data = ProductsSerializer(product_list, many=True).data
    
    return Response({
        "status": {
            "code": 200,
            "description": "Ok"
        },
        "data": product_data,
        "paging": None
    }, status=status.HTTP_200_OK)

# GET PRODUCT
@api_view(["GET"])
def get_product(request, product_id):
    try:
        product = Products.objects.get(id=product_id)
        product_data = ProductsSerializer(product).data
        
        return Response({
            "status": {
                "code": 200,
                "description": "Alles Klar",
            },
            "data": product_data,
        }, status=status.HTTP_200_OK)
        
    except Products.DoesNotExist:
        return Response({
            "status": {
                "code": 404,
                "description": "Product not found",
            },
            "data": [],
        }, status=status.HTTP_404_NOT_FOUND)
    
# DELETE PRODUCT
@api_view(["DELETE"])
def delete_product(request, product_id):
    try: 
        product = Products.objects.get(id=product_id)  # Ensure product exists
        product.delete()
        return Response({
            "status": {
                "code": 200,
                "description": "Delete successful",
            },
        }, status=status.HTTP_200_OK)
    except Products.DoesNotExist:
        return Response({
            "status": {
                "code": 404,
                "description": "Product not found",
            },
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            "status": {
                "code": 400,
                "description": f"Delete unsuccessful: {str(e)}",
            },
        }, status=status.HTTP_400_BAD_REQUEST)

# PUT UPDATE PRODUCT
@api_view(["PUT"])
def update_product(request, product_id):
    try:
        product = Products.objects.get(id=product_id)
        data = request.data
        
        name = data.get("name", product.name)
        price = data.get("price", product.price)
        
        product.name = name
        product.price = price
        product.save()
        
        product_data = ProductsSerializer(product).data

        return Response({
            "status": {
                "code": 200,
                "description": "Update successful",
            },
            "data": product_data
        }, status=status.HTTP_200_OK)
    except Products.DoesNotExist:
        return Response({
            "status": {
                "code": 404,
                "description": "Product not found",
            },
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            "status": {
                "code": 400,
                "description": f"Update unsuccessful: {str(e)}",
            },
        }, status=status.HTTP_400_BAD_REQUEST)
            
# POST CREATE PRODUCT
@api_view(['POST'])
def create_product(request):
    data = request.data
    try:
        name = data.get("name")
        price = data.get("price")
        
        product = Products.objects.create(name=name, price=price)
        product_data = ProductsSerializer(product).data
        
        return Response({
            "status": {
                "code": 200,
                "description": "Product created successfully",
            },
            "data": product_data
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            "status": {
                "code": 400,
                "description": f"Create unsuccessful: {str(e)}",
            },
        }, status=status.HTTP_400_BAD_REQUEST)

'''
CUSTOMER MANAGEMENT
'''
# GET CUSTOMERS LISTS
@api_view(["GET"])
def get_customer_list(request):
    customer_list = Customers.objects.all()
    
    customer_data = CustomersSerializer(customer_list, many=True).data
    
    return Response({
        "status": {
            "code": 200,
            "description": "Ok"
        },
        "data": customer_data,
        "paging": None
    }, status=status.HTTP_200_OK)

# GET customer
@api_view(["GET"])
def get_customer(request, customer_id):
    try:
        customer = Customers.objects.get(id=customer_id)
        customer_data = CustomersSerializer(customer).data
        
        return Response({
            "status": {
                "code": 200,
                "description": "Alles Klar",
            },
            "data": customer_data,
        }, status=status.HTTP_200_OK)
        
    except Customers.DoesNotExist:
        return Response({
            "status": {
                "code": 404,
                "description": "customer not found",
            },
            "data": [],
        }, status=status.HTTP_404_NOT_FOUND)
    
# DELETE customer
@api_view(["DELETE"])
def delete_customer(request, customer_id):
    try: 
        customer = Customers.objects.get(id=customer_id)
        customer.delete()
        return Response({
            "status": {
                "code": 200,
                "description": "Delete successful",
            },
        }, status=status.HTTP_200_OK)
    except Customers.DoesNotExist:
        return Response({
            "status": {
                "code": 404,
                "description": "customer not found",
            },
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            "status": {
                "code": 400,
                "description": f"Delete unsuccessful: {str(e)}",
            },
        }, status=status.HTTP_400_BAD_REQUEST)

# PUT UPDATE customer
@api_view(["PUT"])
def update_customer(request, customer_id):
    try:
        customer = Customers.objects.get(id=customer_id)
        data = request.data
        
        name = data.get("name", customer.name)
        phone_number = data.get("phone_number", customer.phone_number)
        address = data.get("address", customer.address)
        
        customer.name = name
        customer.phone_number = phone_number
        customer.address = address
        customer.save()
        
        customer_data = CustomersSerializer(customer).data

        return Response({
            "status": {
                "code": 200,
                "description": "Update successful",
            },
            "data": customer_data
        }, status=status.HTTP_200_OK)
    except Customers.DoesNotExist:
        return Response({
            "status": {
                "code": 404,
                "description": "Customer not found",
            },
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            "status": {
                "code": 400,
                "description": f"Update unsuccessful: {str(e)}",
            },
        }, status=status.HTTP_400_BAD_REQUEST)
            
# POST CREATE customer
@api_view(['POST'])
def create_customer(request):
    data = request.data
    try:
        name = data.get("name")
        phone_number = data.get("phone_number")
        address = data.get("address")
        
        customer = Customers.objects.create(
            name=name, 
            phone_number=phone_number,
            address=address
        )
        customer_data = CustomersSerializer(customer).data
        
        return Response({
            "status": {
                "code": 200,
                "description": "Customer created successfully",
            },
            "data": customer_data
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            "status": {
                "code": 400,
                "description": f"Create unsuccessful: {str(e)}",
            },
        }, status=status.HTTP_400_BAD_REQUEST)

'''
BILL MANAGEMENTS
'''

# GET Bill per id
@api_view(['GET'])
def get_bill(request, bill_id):
    try:
        bill = Bills.objects.get(id=bill_id)
        # bill_details = BillDetail.objects.filter(bill_id=bill_id)
        
        # Serialiser
        bill_data = BillsSerializer(bill).data
        # bill_details_data = BillDetailSerializer(bill_details, many=True).data
        
        response_data = {
            "id": bill_data["id"],
            "billDate": bill_data["created_at"],
            "customer": bill_data["customer"],
            # "user": bill_data["user"],
            "billDetails": bill_details_data,
            "createdAt": bill_data["created_at"],
            "updatedAt": bill_data["updated_at"]
        }
        
        return Response({
            "status": {
                "code": 200,
                "description": "Ok"
            },
            "data": [response_data],
            "paging": None
        }, status=status.HTTP_200_OK)
    
    except Bills.DoesNotExist:
        return Response({
            "status": {
                "code": 404,
                "description": "Bill not found"
            },
            "data": [],
            "paging": None
        }, status=status.HTTP_404_NOT_FOUND)
  
# GET Bill list     
@api_view(['GET'])
def get_bill_lists(request):
    if request.method == 'GET':
        bill_list = Bills.objects.all()
        
        data = []
        for bill in bill_list:
            bill_details = BillDetail.objects.filter(bill_id=bill.id)

            # Format the bill data
            data.append({
                "id": str(bill.id),
                "billDate": bill.created_at.isoformat(),
                "customer": {
                    "id": str(bill.customer.id),
                    "name": bill.customer.name,
                    "phoneNumber": bill.customer.phone_number,
                    "address": bill.customer.address,
                    "createdAt": bill.customer.created_at.isoformat(),
                    "updatedAt": bill.customer.updated_at.isoformat(),
                },
                # "user": {
                #     "id": str(bill.user.id),
                #     "name": bill.user.username,
                #     "email": bill.user.email,
                #     "username": bill.user.username,
                #     "role": bill.user.role,
                #     "createdAt": bill.user.created_at.isoformat(),
                #     "updatedAt": bill.user.updated_at.isoformat(),
                # },
                "billDetails": [
                    {
                        "id": str(detail.id),
                        "billId": str(detail.bill_id),
                        "product": {
                            "id": str(detail.product.id),
                            "name": detail.product.name,
                            "price": detail.product.price,
                            "createdAt": detail.product.created_at.isoformat(),
                            "updatedAt": detail.product.updated_at.isoformat(),
                        },
                        "qty": detail.qty,
                        "createdAt": detail.created_at.isoformat(),
                        "updatedAt": detail.updated_at.isoformat(),
                    }
                    for detail in bill_details
                ],
                "createdAt": bill.created_at.isoformat(),
                "updatedAt": bill.updated_at.isoformat(),
            })

        # Returning the structured response with status and data
        return Response({
            "status": {
                "code": 200,
                "description": "Ok"
            },
            "data": data,
            "paging": None  # Optional if you're not implementing pagination yet
        }, status=status.HTTP_200_OK)

# TODO CREATE POST FOR BILLS (FIX)
@api_view(['POST'])
def create_bill(request):
    if request.method == "POST":
        data = request.data
        customer_id = data.get("customerId")
        bill_details_data = data.get("billDetails", [])

        # Create the Bill
        bill = Bills.objects.create(customer_id=customer_id)

        # Validate the bill object
        if not bill:
            return Response({
                "status": {
                    "code": 400,
                    "description": "Failed to create bill"
                }
            }, status=status.HTTP_400_BAD_REQUEST)

        # Create Bill Details
        for detail in bill_details_data:
            product_id = detail["product"]["id"]
            qty = detail["qty"]

            try:
                product = Products.objects.get(id=product_id)
            except Products.DoesNotExist:
                return Response({
                    "status": {
                        "code": 404,
                        "description": f"Product with id {product_id} not found"
                    }
                }, status=status.HTTP_404_NOT_FOUND)
                
            if not BillDetail.objects.filter(bill=bill, product=product).exists():
                BillDetail.objects.create(
                    bill=bill,
                    product=product,
                    qty=qty,
                )

        # Serialize the Bill and Bill Details
        bill_data = BillsSerializer(bill).data
        bill_details_data = BillDetailSerializer(BillDetail.objects.filter(bill=bill), many=True).data

        return Response({
            "status": {
                "code": 200,
                "description": "Alles Klar"
            },
            "data": {
                "id": bill_data["id"],
                "billDate": bill_data["created_at"],
                "customer": bill_data["customer"],
                # "user": bill_data["user"],
                "billDetails": bill_details_data,
                "createdAt": bill_data["created_at"],
                "updatedAt": bill_data["updated_at"]
            }
        }, status=status.HTTP_200_OK)