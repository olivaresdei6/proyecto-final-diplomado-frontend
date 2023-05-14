import React from 'react';
import Card from './Card';

const BookSection = () => {
    const books = [
        // Aquí van los datos de tus libros
        // Ejemplo:
        {
            title: 'Libro 1',
            imageUrl: 'https://coffeebytes.dev/comentar-el-codigo-esta-mal-resena-de-clean-code/images/clean_code.jpg',
            description: 'Descripción del libro 1',
            observations: 'Observaciones del libro 1',
            author: 'Autor del libro 1',
            availableUnits: 10
        },

        {
            title: 'Libro 1',
            imageUrl: 'https://coffeebytes.dev/comentar-el-codigo-esta-mal-resena-de-clean-code/images/clean_code.jpg',
            description: 'Descripción del libro 1',
            observations: 'Observaciones del libro 1',
            author: 'Autor del libro 1',
            availableUnits: 10
        },

        {
            title: 'Libro 1',
            imageUrl: 'https://coffeebytes.dev/comentar-el-codigo-esta-mal-resena-de-clean-code/images/clean_code.jpg',
            description: 'Descripción del libro 1',
            observations: 'Observaciones del libro 1',
            author: 'Autor del libro 1',
            availableUnits: 10
        },

        {
            title: 'Libro 1',
            imageUrl: 'https://coffeebytes.dev/comentar-el-codigo-esta-mal-resena-de-clean-code/images/clean_code.jpg',
            description: 'Descripción del libro 1',
            observations: 'Observaciones del libro 1',
            author: 'Autor del libro 1',
            availableUnits: 10
        },

        {
            title: 'Libro 1',
            imageUrl: 'https://coffeebytes.dev/comentar-el-codigo-esta-mal-resena-de-clean-code/images/clean_code.jpg',
            description: 'Descripción del libro 1',
            observations: 'Observaciones del libro 1',
            author: 'Autor del libro 1',
            availableUnits: 10
        },

        {
            title: 'Libro 1',
            imageUrl: 'https://coffeebytes.dev/comentar-el-codigo-esta-mal-resena-de-clean-code/images/clean_code.jpg',
            description: 'Descripción del libro 1',
            observations: 'Observaciones del libro 1',
            author: 'Autor del libro 1',
            availableUnits: 10
        },

        {
            title: 'Libro 1',
            imageUrl: 'https://coffeebytes.dev/comentar-el-codigo-esta-mal-resena-de-clean-code/images/clean_code.jpg',
            description: 'Descripción del libro 1',
            observations: 'Observaciones del libro 1',
            author: 'Autor del libro 1',
            availableUnits: 10
        },

        {
            title: 'Libro 1',
            imageUrl: 'https://coffeebytes.dev/comentar-el-codigo-esta-mal-resena-de-clean-code/images/clean_code.jpg',
            description: 'Descripción del libro 1',
            observations: 'Observaciones del libro 1',
            author: 'Autor del libro 1',
            availableUnits: 10
        },

        {
            title: 'Libro 1',
            imageUrl: 'https://coffeebytes.dev/comentar-el-codigo-esta-mal-resena-de-clean-code/images/clean_code.jpg',
            description: 'Descripción del libro 1',
            observations: 'Observaciones del libro 1',
            author: 'Autor del libro 1',
            availableUnits: 10
        },

        {
            title: 'Libro 1',
            imageUrl: 'https://coffeebytes.dev/comentar-el-codigo-esta-mal-resena-de-clean-code/images/clean_code.jpg',
            description: 'Descripción del libro 1',
            observations: 'Observaciones del libro 1',
            author: 'Autor del libro 1',
            availableUnits: 10
        },
        // Repite para los 10 libros
    ];

    return (
        <section id="catalogo" className="px-4 py-16 bg-gray-900 text-white">
            <div className="container mx-auto">
                <h2 className="text-4xl font-extrabold tracking-tight text-center sm:text-5xl md:text-6xl">Nuestro catálogo</h2>
                <p className="mt-4 max-w-3xl mx-auto text-center text-xl">Descubre los libros que tenemos para ti.</p>
                <div className="mt-10 flex flex-wrap justify-center">
                    {books.map((book, index) => (
                        <Card key={index} book={book} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BookSection;
