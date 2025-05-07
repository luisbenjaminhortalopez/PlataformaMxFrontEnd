import { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const DetailPage = () => {

  // Verificación de carga
  useEffect(() => {
    console.log('DetailPage mounted'); // Verifica en consola si el componente se monta
  }, []);

  // Datos del artículo principal
  const articleData = {
    title: "Oscar 2025: Conoce a todos los ganadores de la 97 entrega de los premios de la academia",
    author: "José Rangel",
    date: "19/Marzo/2025",
    category: "Premios",
    images: [
      "https://diarioelregionaldelzulia.com/wp-content/uploads/2025/03/Premios-Oscar-2025.jpg",
      "https://diarioelregionaldelzulia.com/wp-content/uploads/2025/03/Premios-Oscar-2025.jpg"
    ],
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta rhoncus sapien, nec semper massa efficitur ac. Pellentesque eu eleifend leo, nec luctus ligula. Ut sit amet interdum magna. Vivamus sed lacus vitae purus rutrum pharetra. Fusce congue pulvinar diam vitae porttitor. Nullam urna dui, faucibus ac aliquet vel, maximus et tellus. Curabitur laoreet nisl tortor, egestas bibendum ex ultricies at. Donec dictum risus ut diam malesuada, et pellentesque neque molestie. Sed nulla mi, bibendum sed dapibus non, efficitur nec enim. Sed vestibulum sem at gravida vehicula. Nullam ac orci gravida, fermentum est eu, rhoncus erat. Aliquam semper gravida lorem, eget congue enim aliquet nec. Nam ipsum velit, faucibus sed dapibus blandit, posuere non turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ornare massa non dui ultrices, a placerat ipsum bibendum.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta rhoncus sapien, nec semper massa efficitur ac. Pellentesque eu eleifend leo, nec luctus ligula. Ut sit amet interdum magna. Vivamus sed lacus vitae purus rutrum pharetra. Fusce congue pulvinar diam vitae porttitor. Nullam urna dui, faucibus ac aliquet vel, maximus et tellus. Curabitur laoreet nisl tortor, egestas bibendum ex ultricies at. Donec dictum risus ut diam malesuada, et pellentesque neque molestie. Sed nulla mi, bibendum sed dapibus non, efficitur nec enim. Sed vestibulum sem at gravida vehicula. Nullam ac orci gravida, fermentum est eu, rhoncus erat. Aliquam semper gravida lorem, eget congue enim aliquet nec. Nam ipsum velit, faucibus sed dapibus blandit, posuere non turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ornare massa non dui ultrices, a placerat ipsum bibendum."
    ]
  };

    // Agrega esta validación para imágenes rotas
    const handleImageError = (e) => {
      e.target.src = 'https://via.placeholder.com/600x400?text=Imagen+no+disponible';
    };

  // Datos de artículos relacionados
  const relatedArticles = [
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/71a8d46c-f3b5-4ee2-9653-35164e23e459.jpg",
      title: "Sequoia! 'Ted Lane' regresa para una cuarta temporada"
    }, 
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/71a8d46c-f3b5-4ee2-9653-35164e23e459.jpg",
      title: "Sequoia! 'Ted Lane' regresa para una cuarta temporada"
    },
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/71a8d46c-f3b5-4ee2-9653-35164e23e459.jpg",
      title: "Sequoia! 'Ted Lane' regresa para una cuarta temporada"
    },
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/71a8d46c-f3b5-4ee2-9653-35164e23e459.jpg",
      title: "Sequoia! 'Ted Lane' regresa para una cuarta temporada"
    }, 
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/71a8d46c-f3b5-4ee2-9653-35164e23e459.jpg",
      title: "Sequoia! 'Ted Lane' regresa para una cuarta temporada"
    }, 
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/71a8d46c-f3b5-4ee2-9653-35164e23e459.jpg",
      title: "Sequoia! 'Ted Lane' regresa para una cuarta temporada"
    },
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/71a8d46c-f3b5-4ee2-9653-35164e23e459.jpg",
      title: "Sequoia! 'Ted Lane' regresa para una cuarta temporada"
    },
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/71a8d46c-f3b5-4ee2-9653-35164e23e459.jpg",
      title: "Sequoia! 'Ted Lane' regresa para una cuarta temporada"
    },
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/71a8d46c-f3b5-4ee2-9653-35164e23e459.jpg",
      title: "Sequoia! 'Ted Lane' regresa para una cuarta temporada"
    },
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/71a8d46c-f3b5-4ee2-9653-35164e23e459.jpg",
      title: "Sequoia! 'Ted Lane' regresa para una cuarta temporada"
    },
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/71a8d46c-f3b5-4ee2-9653-35164e23e459.jpg",
      title: "Sequoia! 'Ted Lane' regresa para una cuarta temporada"
    },
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/71a8d46c-f3b5-4ee2-9653-35164e23e459.jpg",
      title: "Sequoia! 'Ted Lane' regresa para una cuarta temporada"
    },
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/71a8d46c-f3b5-4ee2-9653-35164e23e459.jpg",
      title: "Sequoia! 'Ted Lane' regresa para una cuarta temporada"
    },
  ];

  return (
    <>
      <header className="bg-black py-7 text-center mb-8">
        <h1 className="font-alfa text-white text-5xl select-none">PlataformaMX</h1>
      </header>

      {/* Main content container */}
      <main className="w-full px-20 space-y-10">
        {/* Banner Section */}
        <section className="bg-gradient-to-r from-purple-700 via-purple-600 to-blue-500 rounded-3xl py-52 px-6 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden mb-20">
            <div className="flex-1 min-w-[180px]">
            </div>
            <div className="flex gap-6 justify-center sm:justify-end flex-1 min-w-[180px] relative">
            </div>
            </section>

        {/* Article title section */}
        <section className="mb-6 bg-gray-100 rounded-3xl p-11">
          <h2 className="font-semibold text-lg md:text-6xl leading-tight">
            {articleData.title}
          </h2>
        </section>

        {/* Main article content */}
        <section className="mb-6 flex flex-col md:flex-row gap-30">
          {/* Main article */}
          <article className="md:w-2/3">
            <div className="flex justify-between items-start mb-14">
              <p className="text-2xl font-light">
                Por {articleData.author} | {articleData.date}
              </p>
              <p className="text-4xl font-bold">
                {articleData.category}
              </p>
            </div>
            
            <img 
              alt="Group of Oscar winners holding awards" 
              className="w-full rounded-3xl mb-10" 
              src={articleData.images[0]} 
            />
            
            <p className="text-3xl leading-relaxed mb-10 text-justify">
              {articleData.content[0]}
            </p>
            
            <img 
              alt="Another group photo of Oscar winners" 
              className="w-full rounded-3xl mb-10" 
              src={articleData.images[1]} 
            />
            
            <p className="text-3xl leading-relaxed mb-10 text-justify">
              {articleData.content[1]}
            </p>
          </article>

          {/* Related articles sidebar */}
          <aside className="md:w-1/3 my-24">
            <div className="bg-gray-200 rounded-xl p-3 mb-10 text-left w-auto inline-block text-3xl font-semibold text-gray-700">
              Leer Más:
            </div>
            
            {relatedArticles.map((article, index) => (
              <div key={index} className="flex gap-4 mb-5 items-center">
                <img 
                  alt={article.title} 
                  className="w-40 h-40 rounded-md object-cover" 
                  src={article.image} 
                />
                <p className="text-xs leading-tight">
                  {article.title}
                </p>
              </div>
            ))}
          </aside>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black py-40 px-4 sm:px-10 mt-6">
        <div className="max-w-7xl mx-auto flex justify-between items-start">
          <h2 className="font-alfa text-white text-4xl sm:text-8xl select-none">
            PlataformaMX
          </h2>
          
          <div className="flex flex-col items-center mt-[-15px]"> 
            <p className="text-white text-lg sm:text-3xl mb-9"> 
              Síguenos en nuestras redes sociales:
            </p>
            <div className="flex space-x-9 text-3xl sm:text-7xl">
              <a href="#" className="text-white hover:text-gray-300"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-white hover:text-gray-300"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-white hover:text-gray-300"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-white hover:text-gray-300"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};