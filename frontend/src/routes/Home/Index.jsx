import { Link } from "react-router-dom";
import { auth } from '../../firebaseConnection';
import { db } from "../../firebaseConnection";
import { onAuthStateChanged} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { getDocs, collection } from "firebase/firestore";
import './Home.css'

import CardReceita from '../../assets/Component/UltimasReceitas/CardReceita'
import { useEffect, useState } from "react"; // Importe o useState

import Header from "../../assets/Component/Header/Header";

export default function Home() {
  const navigate = useNavigate();

  const emojis = ["🍔", "🍕", "🍟", "🌭", "🍗", "🥩", "🍣", "🍝", "🍜", "🥪", "🌮", "🥗", "🍲", "🍛", "🍱", "🍤", "🥟", "🥨", "🥞", "🥓"];
  const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0);
  const [receitas, setReceitas] = useState([])

  function concatValues(obj) {
    const result = [];
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            result.push(...concatValues(obj[key]));
        } else {
            result.push(`${key}: ${obj[key]}`);
        }
    }
    return result;
  }

  async function historicoReceitas() {
    const ref = collection(db, "historico");
    await getDocs(ref)
      .then((snapshot) => {
        console.log('Buscou historico');

        let lista = [];
        let idLista = 0
        snapshot.forEach((doc) => {
          const docObj = doc.data();
          const objJson = JSON.parse(docObj.json)          
          const titulo = objJson.titulo;
          console.log(titulo)
          const objIngredientes = objJson.ingredientes
          idLista++
          let ingredientes = concatValues(objIngredientes)
          ingredientes = ingredientes.slice(0,3)
          ingredientes.push('...')

          lista.push({
            titulo: titulo,
            ingredientes: ingredientes,
            id: idLista
          });

        });
        
        setReceitas(lista)
      })
      .catch((err) => {
        console.error('Erro gerado na busca do historico: ' + err);
      });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmojiIndex(prevIndex => (prevIndex + 1) % emojis.length);
    }, 3000);

    historicoReceitas();

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
                  {
                    receitas.map((r) =>{
                      return(
                        <div className="historico">
                          <CardReceita className="img" title={r.titulo} ingredients={r.ingredientes} url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUL_RKyGzqiIMNpRSLzWKsr1wq0Dwc0-3H4A&s"/>
                        </div> 
                      )
                    })

                  }
              </div>
          </div>
      </div>
    </>
  );
}
