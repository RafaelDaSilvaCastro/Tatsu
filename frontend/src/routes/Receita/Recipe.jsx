import { useEffect } from "react";
import Header from "../../assets/Component/Header/Header";

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    marginTop: '10%',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch', 
    flexWrap: 'wrap',
    gap: '20px',
  },
  imageSection: {
    width: '30%',
  },
  image: {
    width: '100%',
    maxWidth: '300px',
    borderRadius: '8px',
  },
  section: {
    width: '35%',
    textAlign: 'center',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  sectionTitle: {
    color: 'black',
    marginBottom: '20px',
  },
  ul: {
    listStyleType: 'none',
    padding: 0,
    textAlign: 'left',
  },
  li: {
    marginBottom: '10px',
  },
  timeInfo: {
    marginTop: '20px',
    fontWeight: 'bold',
  },
  ol: {
    paddingLeft: '20px',
    textAlign: 'left',
  },
  olLi: {
    marginBottom: '15px',
  },
  ingredientCategory: {
    fontWeight: 'bold',
    marginTop: '15px',
    marginBottom: '10px',
    textTransform: 'uppercase',
    textAlign: 'left',
  },
};

const jsonReceita = JSON.parse(`{
   "id":"664a6baf8c63584729e1cbba",
   "titulo":"Arroz com Frango e Milho",
   "dificuldade":0,
   "porcaoPessoas":4,
   "ingredientes":{
      "Frango":{
         "Peito de frango em cubos":"500g",
         "Cebola picada":"1 unidade",
         "Alho picado":"2 dentes",
         "Azeite de oliva":"2 colheres de sopa",
         "Sal":"a gosto",
         "Pimenta-do-reino":"a gosto"
      },
      "Arroz":{
         "Arroz branco":"2 xícaras",
         "Água":"4 xícaras",
         "Farinha de milho":"1/2 xícara",
         "Milho verde":"1 lata",
         "Azeite de oliva":"1 colher de sopa",
         "Sal":"a gosto"
      },
      "Ovos":{
         "Ovos":"2 unidades",
         "Azeite de oliva":"1 colher de sopa",
         "Sal":"a gosto"
      }
   },
   "preparo":{
      "default":{
         "Passo 1":"Em uma panela, aqueça o azeite de oliva e doure a cebola e o alho.",
         "Passo 2":"Acrescente o frango em cubos e tempere com sal e pimenta-do-reino.",
         "Passo 3":"Cozinhe o frango até que esteja dourado.",
         "Passo 4":"Em outra panela, misture o arroz, a água, a farinha de milho e o milho verde.",
         "Passo 5":"Tempere com sal e cozinhe em fogo baixo até que o arroz esteja cozido.",
         "Passo 6":"Enquanto o arroz cozinha, frite os ovos em uma frigideira com azeite de oliva.",
         "Passo 7":"Sirva o arroz com frango, milho e ovos fritos."
      }
   },
   "observacao":null
}`);

export default function Recipe() {
  useEffect(() => {
    const id = localStorage.getItem('@revenueId');
    console.log('****************************');
    console.log(id);
  }, []);

  const renderIngredients = () => {
    return Object.entries(jsonReceita.ingredientes).map(([category, items]) => (
      <div key={category}>
        <div style={styles.ingredientCategory}>{category}</div>
        <ul style={styles.ul}>
          {Object.entries(items).map(([name, amount], index) => (
            <li key={index} style={styles.li}>{`- ${name}: ${amount}`}</li>
          ))}
        </ul>
      </div>
    ));
  };

  const renderPreparation = () => {
    const steps = Object.entries(jsonReceita.preparo.default).map(([step, description]) => (
      <li key={step} style={styles.olLi}>{description}</li>
    ));

    return steps;
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.header}>
        <h1>{jsonReceita.titulo}</h1>
      </div>
      <div style={styles.content}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>INGREDIENTES</h2>
          {renderIngredients()}
        </div>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>PREPARO</h2>
          <ol style={styles.ol}>
            {renderPreparation()}
          </ol>
        </div>
      </div>
    </div>
  );
}
