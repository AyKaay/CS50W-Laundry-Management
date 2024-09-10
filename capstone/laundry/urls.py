from django.conf import settings
from django.conf.urls.static import static
from django.urls import path

from . import views

urlpatterns = [
    # path("", views.index, name="index"),
    
    # User administration management
    path("post/login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("post/register", views.register, name="register"),
    path("get/user/<str:user_id>", views.get_user, name="get_user"),
    path("get/users", views.get_user_list, name="get_user_list"),
    path("delete/user/<str:user_id>", views.delete_user, name="delete_user"),
    path("put/user/<str:user_id>", views.update_user, name="update_user"),

    # Product management
    path("post/product", views.create_product, name="create_product"),
    path("get/products", views.get_product_list, name="get_product_list"),
    path("get/product/<str:product_id>", views.get_product, name="get_product"),
    path("delete/product/<str:product_id>", views.delete_product, name="delete_product"),
    path("put/product/<str:product_id>", views.update_product, name="update_product"),

    # Customer management
    path("get/customers", views.get_customer_list, name="get_customer_list"),
    path("get/customer/<str:customer_id>", views.get_customer, name="get_customer"),
    path("post/customer", views.create_customer, name="create_customer"),
    path("delete/customer/<str:customer_id>", views.delete_customer, name="delete_customer"),
    path("put/customer/<str:customer_id>", views.update_customer, name="update_customer"),
    
    # Bill Management
    path("get/bills", views.get_bill_lists, name="get_bill"),
    path("post/bill", views.create_bill, name="create_bill"),

]
# `http://127.0.0.1:8000/get/products`