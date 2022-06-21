from django.urls import path
from base.views import category_views as views


urlpatterns = [

    path('', views.getCategories, name="categories"),
    path('<int:pk>/', views.getCategory, name="category"),


    path('create', views.createCategory, name="category-create"),

    path('delete/<str:pk>/', views.deleteCategory, name="category-delete"),
    path('update/<str:pk>/', views.updateCategory, name="category-update"),

]
