from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Category)
admin.site.register(Ordered)
admin.site.register(Book)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Borrow)
admin.site.register(BorrowItem)
admin.site.register(BorrowAddress)
admin.site.register(ShippingAddress)
