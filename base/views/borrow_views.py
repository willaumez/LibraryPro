from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Book, Borrow, BorrowItem, BorrowAddress
from base.serializer import BookSerializer, UserSerializer, BorrowSerializer
from datetime import datetime

from rest_framework import status
from datetime import datetime


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addBorrowItems(request):
    user = request.user
    data = request.data
    borrowItems = data['borrowItems']
    if borrowItems and len(borrowItems) == 0:
        return Response({'detail': 'No Borrow Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # (1) Create borrow
        borrow = Borrow.objects.create(
            user=user,
            codeVer=data['codeVerif'],
            dateLimit=datetime.strptime(data['limitDate'], "%d/%m/%Y"),
        )
        # (2) Create shipping address
        shipping = BorrowAddress.objects.create(
            borrow=borrow,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            country=data['shippingAddress']['country'],
        )
        # (3) Create Borrow items and set Borrow to BorrowItems relationship
        for i in borrowItems:
            book = Book.objects.get(_id=i['book'])
            item = BorrowItem.objects.create(
                book=book,
                borrow=borrow,
                title=i['title'],
                image=i['image'],
            )

        serializer = BorrowSerializer(borrow, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyBorrows(request):
    user = request.user
    borrows = user.borrow_set.all()
    serializer = BorrowSerializer(borrows, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getBorrows(request):
    borrows = Borrow.objects.all()
    serializer = BorrowSerializer(borrows, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getBorrowById(request, pk):
    user = request.user
    try:
        borrow = Borrow.objects.get(_id=pk)
        if user.is_staff or borrow.user == user:
            serializer = BorrowSerializer(borrow, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorized to view this borrow'}, status=status.HTTP_400_BAD_REQUEST)

    except:
        return Response({'detail': 'Borrow does not exists'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateBorrowIsTake(request, pk):
    borrow = Borrow.objects.get(_id=pk)
    borrow.isTake = True
    borrow.takeAt = datetime.now()
    borrow.save()
    return Response('Borrow was take')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateBorrowIsReturn(request, pk):
    borrow = Borrow.objects.get(_id=pk)
    borrow.isReturn = True
    borrow.returnAt = datetime.now()
    borrow.save()
    return Response('Borrow was Return')


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteBorrow(request, pk):
    borrow = Borrow.objects.get(_id=pk)
    borrow.delete()
    return Response('Borrowing deleted')














