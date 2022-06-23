from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Book, Review, Category, Ordered
from base.serializer import BookSerializer, UserSerializer, CategorySerializer
from datetime import datetime
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


@api_view(['GET'])
def getBooks(request):
    query = request.query_params.get('keyword')
    cate = request.query_params.get('category')
    if query == None:
        query = ''

    books = Book.objects.filter(category=cate) if cate != None else Book.objects.filter(title__icontains=query)

    page = request.query_params.get('page')
    paginator = Paginator(books, 8)

    try:
        books = paginator.page(page)
    except PageNotAnInteger:
        books = paginator.page(1)
    except EmptyPage:
        books = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)

    serial = BookSerializer(books, many=True)
    return Response({'books': serial.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getBook(request, pk):
    serial = Book.objects.get(_id=pk)
    book = BookSerializer(serial, many=False)
    return Response(book.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteBook(request, pk):
    book = Book.objects.get(_id=pk)
    book.delete()
    return Response('Book deleted')


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createBook(request):
    user = request.user
    data = request.data
    category = Category.objects.get(_id=data['category'])

    book = Book.objects.create(
        user=user,
        title=data['title'],
        author=data['author'],
        isbn=data['isbn'],
        date_pub=data['date_pub'],
        price=data['price'],
        qte=data['qte'],
        description=data['description'],
        category=category,
        categoryName=category,
        createdAt=datetime.now(),
        image=request.FILES.get('image'),
    )

    serializer = BookSerializer(book, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateBook(request, pk):
    data = request.data
    book = Book.objects.get(_id=pk)
    category = Category.objects.get(_id=data['category'])

    book.title = data['title']
    book.author = data['author']
    book.isbn = data['isbn']
    book.date_pub = data['date_pub']
    book.price = data['price']
    book.qte = data['qte']
    book.description = data['description']
    book.category = category
    book.categoryName = category.nom

    book.save()
    serializer = BookSerializer(book, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    book_id = data['book_id']
    book = Book.objects.get(_id=book_id)

    book.image = request.FILES.get('image')
    book.save()

    return Response('Image was uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createBookReview(request, pk):
    user = request.user
    book = Book.objects.get(_id=pk)
    data = request.data

    review = Review.objects.create(
        user=user,
        book=book,
        name=user.first_name,
        comment=data['comment'],
    )
    reviews = book.review_set.all()

    book.numReviews = len(reviews)

    book.save()
    return Response({'detail': 'Review Added'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createBookReview2(request, pk):
    user = request.user
    book = Book.objects.get(_id=pk)
    data = request.data

    # 1 Review already exist
    alreadyExist = book.review_set.filter(user=user).exists()

    if alreadyExist:
        content = {'details': 'Book already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    # Create Review
    else:
        review = Review.objects.create(
            user=user,
            book=book,
            name=user.first_name,
            comment=data['comment'],
        )
        reviews = book.review_set.all()
        book.numReviews = len(reviews)

        book.save()
        return Response({'detail': 'Review Added'})
