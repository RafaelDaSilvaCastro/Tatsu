import './Home.css'

import CardReceita from '../../assets/Component/UltimasReceitas/CardReceita'

export default function Home() {
  return (
    <>
      <div className="conteiner">
        <section>
          <div className="title">
            <img src='https://img.freepik.com/fotos-gratis/variedade-plana-com-deliciosa-comida-brasileira_23-2148739179.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1712793600&semt=sph'/>
            <h1>Gere receitas com apenas um clique</h1>
          </div>
          <div className="btn">
            <button>Gerar receita</button>
          </div>
          </section>  
        <div className="historico">
          <h2>Ultimas receitas</h2>
          <CardReceita title="aaa" ingredients={["um", "dois", "tres"]} url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUL_RKyGzqiIMNpRSLzWKsr1wq0Dwc0-3H4A&s"/>
        </div>
      </div>
    </>
  );
}