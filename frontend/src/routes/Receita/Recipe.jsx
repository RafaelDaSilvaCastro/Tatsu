import { useEffect } from "react"
import { useLocation } from 'react-router-dom';

export default function Recipe(){
  const location = useLocation();
  const { receita } = location.state || { receita: {} };


  useEffect(() => {
   console.log('**********************')
   console.log(receita)
  }, []);

  return(
    <>
      <h2>Titulo</h2>

      <h2>Ingredientes</h2>

      <h2>Modo de preparo</h2>
    </>

  )
}