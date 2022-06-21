from django.urls import path
from base.views import book_views as views


urlpatterns = [

    path('', views.getBooks, name="books"),
    path('<str:pk>/', views.getBook, name="book"),

    path('<str:pk>/reviews/', views.createBookReview, name="create-reviews"),

    path('create', views.createBook, name="book-create"),
    path('upload', views.uploadImage, name="image-upload"),

    path('delete/<str:pk>/', views.deleteBook, name="book-delete"),
    path('update/<str:pk>/', views.updateBook, name="book-update"),

]
