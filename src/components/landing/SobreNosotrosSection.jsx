const SobreNosotrosSection = () => {
    return (
        <section id="nosotros" className="bg-gray-800 text-white py-20 px-10 md:px-20">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                <div className="w-full md:w-1/2">
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">Sobre Leerati</h2>
                    <p className="mb-4 text-gray-300">Leerati es un espacio de encuentro entre el pasado, el presente y el futuro. Un lugar donde se encuentran historias y conocimientos que han trascendido el tiempo.</p>
                    <p className="mb-4 text-gray-300">Desde nuestras más antiguas obras literarias hasta los textos contemporáneos más provocativos, nuestro catálogo es una verdadera caja de tesoros esperando ser descubierta.</p>
                    <p className="mb-4 text-gray-300">Nos enorgullece ser un faro de sabiduría y entretenimiento para nuestra comunidad. ¡Ven y descubre la magia que reside entre nuestras páginas!</p>
                </div>
                <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center">
                    <img className="w-3/4" src="https://images5.alphacoders.com/659/659155.jpg" alt="Biblioteca Fantástica" />
                </div>
            </div>
        </section>
    )
};

export default SobreNosotrosSection;
