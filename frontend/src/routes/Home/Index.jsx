import { Link } from "react-router-dom";
import { auth } from '../../firebaseConnection';
import { onAuthStateChanged} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import './Home.css'

import CardReceita from '../../assets/Component/UltimasReceitas/CardReceita'
import { useEffect } from "react";


import Header from "../../assets/Component/Header/Header";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="conteiner">
        <Header/>
        <section>
          <div className="title">
            <img className="image-title" src='https://img.freepik.com/fotos-gratis/variedade-plana-com-deliciosa-comida-brasileira_23-2148739179.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1712793600&semt=sph'/>
            <h1>Gere receitas com apenas um clique!</h1>
          </div>
            <div className="gerar-receita">
              <Link to='/ConfigReceita'>
                <button>Gerar receita</button>
              </Link>
              <p>Forneça seus ingredientes <br></br> e gere uma receita!</p>
            </div>
        </section>
          <div className="borda-historico">
              <div className="ult-txt">
                <h2>Ultimas receitas</h2>  
              </div>
              <section  className="card-historico">    
                  <div className="historico">
                    <CardReceita className="img" title="Lasanha de Frango" ingredients={["500 g de massa de lasanha", "500 g de frango", "2 caixas de creme de leite"]} url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUL_RKyGzqiIMNpRSLzWKsr1wq0Dwc0-3H4A&s"/>
                  </div>
                  <div className="historico">
                    <CardReceita className="img" title="Lasanha de Frango" ingredients={["500 g de massa de lasanha", "500 g de frango", "2 caixas de creme de leite"]} url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUL_RKyGzqiIMNpRSLzWKsr1wq0Dwc0-3H4A&s"/>
                  </div>
                  <div className="historico">
                    <CardReceita className="img" title="Lasanha de Frango" ingredients={["500 g de massa de lasanha", "500 g de frango", "2 caixas de creme de leite"]} url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUL_RKyGzqiIMNpRSLzWKsr1wq0Dwc0-3H4A&s"/>
                  </div>
              </section>
          </div>
      </div>
    </>
  );
}
