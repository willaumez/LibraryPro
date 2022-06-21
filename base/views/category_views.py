from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Category, Book
from datetime import datetime
from django.utils.timezone import utc
from rest_framework import status
from base.serializer import CategorySerializer
import sqlite3


@api_view(['GET'])
def getCategories(request):
    category = Category.objects.all()
    serial = CategorySerializer(category, many=True)
    return Response(serial.data)


@api_view(['GET'])
def getCategory(request, pk):
    category = Category.objects.get(_id=pk)
    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteCategory(request, pk):
    category = Category.objects.get(_id=pk)
    "DELETE FROM sqlite_sequence WHERE name = 'base_Category'"

    "UPDATE sqlite_sequence SET seq = 0 WHERE name = 'Category'"

    "BEGIN TRANSACTION; UPDATE sqlite_sequence SET seq = 1 WHERE name = 'Category';"
    "INSERT INTO sqlite_sequence(Category, seq) SELECT 'Category', 1 WHERE NOT EXISTS (SELECT changes() AS change ROM sqlite_sequence WHERE change <> 0); COMMIT;"

    category.delete()
    return Response('category deleted')


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createCategory(request):
    user = request.user
    data = request.data
    category = Category.objects.create(
        user=user,
        nom=data['nom'],
        description=data['description'],
        dateCreate=datetime.now(),
    )

    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateCategory(request, pk):
    data = request.data
    user = request.user
    category = Category.objects.get(_id=pk)

    category.user = user
    category.nom = data['nom']
    category.description = data['description']
    category.dateCreate = datetime.utcnow().replace(tzinfo=utc)

    category.save()
    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)
