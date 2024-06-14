import { Link } from "react-router-dom";
import { auth } from '../../firebaseConnection';
import { onAuthStateChanged} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import './Home.css'

import CardReceita from '../../assets/Component/UltimasReceitas/CardReceita'
import { useEffect, useState } from "react"; // Importe o useState

import Header from "../../assets/Component/Header/Header";

export default function Home() {
  const navigate = useNavigate();

  // Lista de emojis de comida
  const emojis = ["🍔", "🍕", "🍟", "🌭", "🍗", "🥩", "🍣", "🍝", "🍜", "🥪", "🌮", "🥗", "🍲", "🍛", "🍱", "🍤", "🥟", "🥨", "🥞", "🥓"];

  // Estado para controlar o emoji atual
  const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0);

  // Função para atualizar o emoji a cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmojiIndex(prevIndex => (prevIndex + 1) % emojis.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="conteiner">
        <Header/>
        <section>
        <div className="gerar-receita ">
            <div className="emoji-gif">{emojis[currentEmojiIndex]}</div>
            <h1>Uma cozinha inteligente <br></br> para uma vida mais fácil!</h1>
            <p>Cozinhar nunca foi tão fácil. Com nosso gerador de receitas inovador,  <br></br> prepare-se para se surpreender a cada prato!</p>
            <Link to='/ConfigReceita'>
              <button>Gerar receita</button>
            </Link>
        </div>
        </section>
        <div>
            <div className="ult-txt">
              <h2>Últimas receitas</h2>  
            </div>
              <div className="card-historico">    
                  <div className="historico">
                    <CardReceita className="img" title="Lasanha de Frango" ingredients={["500 g de massa de lasanha", "500 g de frango", "2 caixas de creme de leite"]} url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUL_RKyGzqiIMNpRSLzWKsr1wq0Dwc0-3H4A&s"/>
                  </div>
                  <div className="historico">
                    <CardReceita className="img" title="Lasanha de Frango" ingredients={["500 g de massa de lasanha", "500 g de frango", "2 caixas de creme de leite"]} url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUL_RKyGzqiIMNpRSLzWKsr1wq0Dwc0-3H4A&s"/>
                  </div>
                  <div className="historico">
                    <CardReceita className="img" title="Lasanha de Frango" ingredients={["500 g de massa de lasanha", "500 g de frango", "2 caixas de creme de leite"]} url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUL_RKyGzqiIMNpRSLzWKsr1wq0Dwc0-3H4A&s"/>
                  </div>
              </div>
          </div>
      </div>

    </>
  );
}
