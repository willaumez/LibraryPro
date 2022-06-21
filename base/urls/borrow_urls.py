from django.urls import path
from base.views import borrow_views as views

urlpatterns = [
        path('add/', views.addBorrowItems, name='borrow-add'),
        path('myborrows/', views.getMyBorrows, name='myborrows'),
        path('', views.getBorrows, name='borrows'),

        path('<str:pk>/', views.getBorrowById, name='user-borrow'),
        path('<str:pk>/take/', views.updateBorrowIsTake, name='take'),

        path('<str:pk>/return/', views.updateBorrowIsReturn, name='return'),

        path('delete/<str:pk>/', views.deleteBorrow, name="borrow-delete"),

]
