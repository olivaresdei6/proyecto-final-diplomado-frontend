const Card = ({ book }) => {
    return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4 transform hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col bg-white shadow-2xl rounded-lg overflow-hidden">
                <div className="flex-shrink-0">
                    <img className="h-48 w-full object-cover" src={book.imageUrl} alt={book.title} />
                </div>
                <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">{book.title}</h3>
                        <p className="mt-2 text-sm text-gray-500">{book.description}</p>
                        <p className="mt-2 text-sm text-gray-500">{book.observations}</p>
                    </div>
                    <div>
                        <p className="mt-2 text-sm text-gray-500">Autor: {book.author}</p>
                        <p className="mt-2 text-sm text-gray-500">Unidades disponibles: {book.availableUnits}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Card;
