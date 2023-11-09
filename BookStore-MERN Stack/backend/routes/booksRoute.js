import express from 'express'
import {Book } from '../models/bookmodels.js'

const router =express.Router()

//Route for save a new Book
router.post('/', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(404).send({
                message: 'send all required fields: title,authore,publishedYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})


//Route for get all books from database
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });


    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });

    }
})


// router to get an books by id
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;
        const books = await Book.findById(id);
        return response.status(200).json(books);
    } catch (error) {
        console.log(error.message)
    }
})

//router for the update the book by id
router.put('/:id', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: 'send all required fields : title ,author, publishYear'
            })
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).json({ message: 'Book is not found' });
        } else {

            return response.status(200).json({ message: 'Book is updated Sucessfully' });
        }
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message });

    }
})

//router for delete  by id
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: 'Book is Not found' });
        }
        else {
            return response.status(200).json({ messade: 'Book is deleted Sucessfully' });
        }
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message });
    }
})

export default router;