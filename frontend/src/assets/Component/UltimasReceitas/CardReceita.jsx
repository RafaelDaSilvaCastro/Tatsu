import './UltimasReceitas.css'; // Assumindo que o arquivo CSS existe

export default function CardReceita({ title, url, ingredients = [] }) {
  // Desestruturação para acesso mais limpo às props
  return (
    <>
      <h3 className='textCard'>{title}</h3>
      <div className="container">
        <img src={url || 'https://via.placeholder.com/150'} alt={title} />
        {/* Texto alternativo para acessibilidade e SEO */}
        <div className="ingredientes textCard">
          <h4>Ingredientes</h4>
          <ul>
            {ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
