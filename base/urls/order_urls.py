from django.urls import path
from base.views import order_views as views

urlpatterns = [
    path('add/', views.addOrderItems, name='order-add'),
    path('ordered/add/', views.createOrdered, name='ordered-add'),
    path('ordered/delete/<str:pk>/', views.deleteOrdered, name='ordered-delete'),
    path('ordered/', views.getOrdered, name='ordereds'),
    path('myorders/', views.getMyOrders, name='myorders'),
    path('ordered/myordered/', views.getMyOrdered, name='myordered'),
    path('', views.getOrders, name='orders'),

    path('<str:pk>/', views.getOrderById, name='user-order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
    path('<str:pk>/deliver/', views.updateOrderToDelivered, name='deliver'),

    path('delete/<str:pk>/', views.deleteOrder, name="order-delete"),

]
