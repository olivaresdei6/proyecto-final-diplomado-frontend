const BlogSection = () => {
    const blogs = [
        {
            titulo: "Nuevas adquisiciones",
            fecha: "13 de mayo, 2023",
            descripcion: "Descubre las últimas incorporaciones a nuestra extensa colección. ¡No te pierdas las novedades!",
        },
        {
            titulo: "Noches de lectura bajo la luna",
            fecha: "8 de mayo, 2023",
            descripcion: "Un repaso a nuestra última noche de lectura al aire libre. ¡El próximo evento será aún más mágico!",
        },
        {
            titulo: "El poder de los clásicos",
            fecha: "1 de mayo, 2023",
            descripcion: "Exploramos por qué los clásicos literarios siguen capturando nuestra imaginación, generación tras generación.",
        },
    ];

    return (
        <section id="blog" className="bg-gray-900 text-white py-20 px-10 md:px-20">
            <div className="container mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-10 text-center">Noticias de la Leerati</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, index) => (
                        <div key={index} className="bg-gray-700 p-5 rounded shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <h3 className="text-2xl font-bold mb-2">{blog.titulo}</h3>
                            <p className="text-gray-300 italic mb-4">{blog.fecha}</p>
                            <p className="text-gray-300">{blog.descripcion}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
