import { useEffect } from "react"

export default function Recipe(){


  useEffect(() => {
    const id = localStorage.getItem('@revenueId')
    console.log('****************************')
    console.log(id)
  }, []);

  return(
    <>
      <h2>Titulo</h2>

      <h2>Ingredientes</h2>

      <h2>Modo de preparo</h2>
    </>

  )
}