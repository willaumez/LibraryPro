import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Form, Button, Table, Row, Col, Card} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import {listBooks, deleteBook, createBook, listBookDetails, updateBook,} from "../actions/bookActions";
import {listCategories} from "../actions/categoryActions";
import {Modal} from "react-bootstrap";
import {BOOK_CREATE_RESET, BOOK_DETAILS_RESET, BOOK_UPDATE_RESET,} from "../constants/bookConstants";
import ReactS3 from "react-s3";
import {deleteFile} from "react-s3";
import S3FileUpload from "react-s3/lib/ReactS3";
import {aws} from "../keys";
import { Buffer } from "buffer";
import {Pagination} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useParams} from "react-router";
Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;

const config = {
    bucketName: aws.AWS_STORAGE_BUCKET_NAME,
    dirName: '', /* optional */
    region: aws.AWS_S3_FILE_REGION,
    accessKeyId: aws.AWS_ACCESS_KEY_ID,
    secretAccessKey: aws.AWS_SECRET_ACCESS_KEY,
}

const configDelete = {
    bucketName: aws.AWS_STORAGE_BUCKET_NAME,
    region: aws.AWS_S3_FILE_REGION,
    accessKeyId: aws.AWS_ACCESS_KEY_ID,
    secretAccessKey: aws.AWS_SECRET_ACCESS_KEY,
}


function BookListScreen({keyword}) {
    const navigate = useNavigate();
    const [bookId, setBookId] = useState(false)

    const dispatch = useDispatch()

    const bookDetails = useSelector(state => state.bookDetails)
    const {loading: loadingDetail, error: errorDetail, success: successDetail, book} = bookDetails

    const bookUpdate = useSelector(state => state.bookUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = bookUpdate

    const bookList = useSelector(state => state.bookList)
    let {loading, error, books, bookT, page, pages} = bookList

    const categoryList = useSelector(state => state.categoryList)
    const {loading: loadingCategory, error: errorCategory, categories} = categoryList

    const bookDelete = useSelector(state => state.bookDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = bookDelete

    const bookCreate = useSelector(state => state.bookCreate)
    const {loading: loadingCreate, error: errorCreate, success: successCreate, book: createBoo} = bookCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [isbn, setIsbn] = useState('')
    const [date_pub, setDate_pub] = useState('')
    const [price, setPrice] = useState('')
    const [qte, setQte] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState(false)
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)

    let formData = new FormData()


    //const userUpdate = useSelector(state => state.userUpdate)
    //const { error: errorUpdate, loading: loadingUpdate, success:successUpdate } = userUpdate

    const [show, setShow] = useState(false);
    const [create, setCreate] = useState(false);
    const handleClose = () => setShow(false);
    const createClose = () => setCreate(false);


    useEffect(() => {
        dispatch({type: BOOK_CREATE_RESET})
        if (successUpdate) {
            dispatch({type: BOOK_UPDATE_RESET})
            navigate(`#`)
        } else {
            if (userInfo && userInfo.isAdmin) {
                dispatch(listBooks(keyword))
                dispatch(listCategories())
                if (book.title) {
                    setTitle(book.title)
                    setAuthor(book.author)
                    setImage(book.image)
                    setCategory(book.category)
                    setDate_pub(book.date_pub)
                    setDescription(book.description)
                    setIsbn(book.isbn)
                    setPrice(book.price)
                    setQte(book.qte)
                } else {
                    if (successCreate) {
                        //editBook
                    } else {
                        dispatch(listBooks(keyword))
                    }
                }
            } else {
                navigate('/login')
            }
        }


    }, [dispatch, userInfo, navigate, successDelete, successCreate, book, bookId, successUpdate, keyword])
    //console.log(categories)


    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        formData.append('book_id', bookId)
        setUploading(true)
        try {
            const config = {
                headers: {"Content-Type": "multipart/form-data"}
            }
            const {data} = await axios.post("/api/books/upload", formData, config)
            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
        dispatch(listBookDetails(bookId))

    }

    const insertFileHandler = async (e) => {
        ReactS3.uploadFile(e.target.files[0], config)
            .then((data) => {
                console.log(data.location)
            })
            .catch((err) => {
                alert(err)
            })

        const file = e.target.files[0]
        formData.append('image', file)
    }


    const deleteHandler = (id, image) => {
        const imageDelete = image.split('https://libraryprojectg2.s3.amazonaws.com/media/')[1]
        if (window.confirm('Are you sure you want to delete this book ?')) {
            S3FileUpload
                .deleteFile(imageDelete, configDelete)
                .then(response => console.log(response))
                .catch(err => console.error(err))

            window.Buffer = window.Buffer || require("buffer").Buffer;

            dispatch(deleteBook(id))
        }
    }

    const createBookHandler = () => {
        setCreate(true);
    }

    const submitCreateHandler = (e) => {
        e.preventDefault()
        formData.append('title', title)
        formData.append('author', author)
        formData.append('category', category)
        formData.append('date_pub', date_pub)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('qte', qte)
        formData.append('isbn', isbn)
        formData.append('price', price)
        dispatch(createBook(formData))
        setCreate(false)
    }

    let editHandler = (id) => {
        setShow(true);
        setBookId(id)
        dispatch(listBookDetails(id))
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateBook({
            _id: bookId, title, author, category,
            date_pub, description, price, qte, isbn,
        }))
        setShow(false)
    }

    const change = (e) => {
        e.preventDefault()
        page = page + 1
    }

    return (
        <div><Row className='align-items-center'>
            <Col className='text-center'>
                <Button className='my-3 bg-success' style={{float: "right", borderRadius: 20}}
                        onClick={createBookHandler}>
                    <i className="fas fa-plus"></i> Create Book
                </Button>
            </Col>
        </Row>

            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}


            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {errorDetail && <Message variant='danger'>{errorDetail}</Message>}

            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

            {loading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>) : (
                <div style={{overflow: 'auto', height: '75vh'}}>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead style={{tableLayout: "fixed", textAlign: "center", position: "sticky"}}>
                        <tr>
                            <th>TITLE</th>
                            <th>AUTHOR</th>
                            <th>CATEGORY</th>
                            <th>QUANTITY</th>
                            <th>PRICE</th>


                        </tr>
                        </thead>
                        <tbody style={{overflow: 'auto', textAlign: "center"}}>
                        {books.map(book => (
                            <tr key={book._id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>

                                <td>{book.categoryName}</td>
                                <td>{book.qte}</td>
                                <td>{book.price} Dhs</td>


                                <td>
                                    <Button variant='light' className='btn-sm' onClick={() => editHandler(book._id)}>
                                        <i className='fas fa-edit fa-2x'></i>
                                    </Button>
                                </td>
                                <td>
                                    <Button variant='danger' className='btn-sm'
                                            onClick={() => deleteHandler(book._id, book.image)}>
                                        <i className='far fa-trash-alt fa-2x'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}

                        </tbody>
                    </Table>
                    <Paginate page={page} pages={pages} isAdmin={true} keyword={keyword}/>
                    {books.length === 0 && <Message variant='info'>Books list is empty </Message>}
                </div>
            )}


            <Modal show={show} onHide={handleClose} animation={true} size="lg"
                   aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton style={{margin: "auto"}}>
                    <Modal.Title id="contained-modal-title-vcenter">Edit Book</Modal.Title>
                </Modal.Header>

                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                <Modal.Body>
                    {loadingDetail ? <Loader/> : errorDetail ? <Message variant='danger'>{errorDetail}</Message> : (
                        <Form onSubmit={submitHandler}>
                            <Row>
                                <Col md={4} sm={4}>
                                    <Card.Img src={book.image}
                                              style={{height: 400, borderRadius: '10px'}}/>
                                </Col>
                                <Col>
                                    <Row>
                                        <Form.Group className="mb-4" controlid='title'>
                                            <Form.Label>Title: </Form.Label>
                                            <Form.Control
                                                type='name' placeholder='Enter Title'
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}>
                                            </Form.Control>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group className="mb-4" controlid='author'>
                                            <Form.Label>Author: </Form.Label>
                                            <Form.Control
                                                type='name' placeholder='Enter Author'
                                                value={author}
                                                onChange={(e) => setAuthor(e.target.value)}>
                                            </Form.Control>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group className="mb-4" controlid='isbn'>
                                            <Form.Label>ISBN: </Form.Label>
                                            <Form.Control
                                                type='name' placeholder='Enter Isbn'
                                                value={isbn}
                                                onChange={(e) => setIsbn(e.target.value)}>
                                            </Form.Control>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Label>Select Category:</Form.Label>
                                        <Form.Select aria-label="Default select example" controlid='category'
                                                     defaultValue={category[0]}
                                                     onChange={(e) => setCategory(e.target.value)}
                                                     style={{width: '50%', margin: "auto"}}>
                                            <option>{book.categoryName}</option>
                                            {categories.map(category => (
                                                <option key={category._id} value={category._id}>{category.nom}</option>
                                            ))}
                                        </Form.Select>
                                    </Row>
                                </Col>
                            </Row>
                            <Row style={{marginTop: 20}}>
                                <Col>
                                    <Form.Group className="mb-4" controlid='date_pub'>
                                        <Form.Label>Publication Date:</Form.Label>
                                        <Form.Control required
                                                      type='date' placeholder='Enter Publication Date'
                                                      value={date_pub.substring(0, 10)}
                                                      timeFormat="YYYY-MM-DD HH:mm"
                                                      onChange={(e) => setDate_pub(e.target.value)}>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-4" controlid='image'>
                                        <Form.Label> Image:</Form.Label>

                                        <Form.Control type='file' placeholder='Choose File' custom='true'
                                                      onChange={uploadFileHandler}>
                                        </Form.Control>
                                        {uploading && <Loader/>}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-4" controlid='qte'>
                                        <Form.Label>Quantity: </Form.Label>
                                        <Form.Control
                                            type='number' placeholder='Enter Quantity'
                                            value={qte}
                                            onChange={(e) => setQte(e.target.value)}>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-4" controlid='price'>
                                        <Form.Label>Price: </Form.Label>
                                        <Form.Control
                                            type='number' placeholder='Enter Price'
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Form.Group className="mb-4" controlid='description'>
                                    <Form.Label>Description: </Form.Label>
                                    <Form.Control
                                        type='name' placeholder='Enter Description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                            </Row>

                            <Button type='submit' variant='success'
                                    style={{float: "right", borderRadius: 10, marginTop: 30}}> Update </Button>
                            <Button onClick={handleClose} variant='success'
                                    style={{float: "left", borderRadius: 10, marginTop: 30}}> Close </Button>

                        </Form>
                    )}


                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>


            <Modal show={create} onHide={createClose} animation={true} size="lg"
                   aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton style={{margin: "auto"}}>
                    <Modal.Title id="contained-modal-title-vcenter">Create Book</Modal.Title>
                </Modal.Header>

                {loadingCreate && <Loader/>}
                <Modal.Body>
                    {loadingDetail ? <Loader/> : errorDetail ? <Message variant='danger'>{errorDetail}</Message> : (
                        <Form onSubmit={submitCreateHandler}>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-4" controlid='title'>
                                        <Form.Label>Title: </Form.Label>
                                        <Form.Control
                                            type='name' placeholder='Enter Title'
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-4" controlid='author'>
                                        <Form.Label>Author: </Form.Label>
                                        <Form.Control
                                            type='name' placeholder='Enter Author'
                                            value={author}
                                            onChange={(e) => setAuthor(e.target.value)}>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-4" controlid='isbn'>
                                        <Form.Label>ISBN: </Form.Label>
                                        <Form.Control
                                            type='name' placeholder='Enter Isbn'
                                            value={isbn}
                                            onChange={(e) => setIsbn(e.target.value)}>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Label>Select Category:</Form.Label>
                                    <Form.Select aria-label="Default select example" controlid='category' required
                                                 defaultValue={category[0]}
                                                 onChange={(e) => setCategory(e.target.value)}>
                                        <option></option>
                                        {categories.map(category => (
                                            <option key={category._id} value={category._id}>{category.nom}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-4" controlid='date_pub'>
                                        <Form.Label>Publication Date:</Form.Label>
                                        <Form.Control required
                                                      type='date' placeholder='Enter Publication Date'
                                                      value={date_pub.substring(0, 10)}
                                                      timeFormat="YYYY-MM-DD HH:mm"
                                                      onChange={(e) => setDate_pub(e.target.value)}>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-4" controlid='image'>
                                        <Form.Label> Image:</Form.Label>
                                        <Form.Control type='file' placeholder='Choose File'
                                                      onChange={insertFileHandler}>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-4" controlid='qte'>
                                        <Form.Label>Quantity: </Form.Label>
                                        <Form.Control
                                            type='number' placeholder='Enter Quantity'
                                            value={qte}
                                            onChange={(e) => setQte(e.target.value)}>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-4" controlid='price'>
                                        <Form.Label>Price: </Form.Label>
                                        <Form.Control
                                            type='number' placeholder='Enter Price'
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Form.Group className="mb-4" controlid='description'>
                                    <Form.Label>Description: </Form.Label>
                                    <Form.Control
                                        type='name' placeholder='Enter Description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                            </Row>

                            <Button type='submit' variant='success'
                                    style={{float: "right", borderRadius: 10, marginTop: 30}}> Create </Button>
                            <Button onClick={createClose} variant='success'
                                    style={{float: "left", borderRadius: 10, marginTop: 30}}> Close </Button>
                        </Form>
                    )}


                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>


        </div>
    )
}

export default BookListScreen


