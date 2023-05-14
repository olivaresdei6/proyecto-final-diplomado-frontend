
import CatalogoPrestamo from "./CatalogoPrestamo.jsx";

const BookList = ({ books }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
                <CatalogoPrestamo
                    key={book.id}
                    url={book.image}
                    title={book.title}
                    description={book.description}
                    author={book.author}
                    units={book.units}
                />
            ))}
        </div>
    );
};

export default BookList;
