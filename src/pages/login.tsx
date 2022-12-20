import React from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";


const login = () => {
  const { data: session } = useSession();
  //console.log(session); //me va a dar  objeto con la info de la sesion

  if (session) {
    return (
      <div>
        <p>{session.user.email}, estas logueado</p>
        <button onClick={() => signOut()}>Cerrar Sesión</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>Login</p>
        <button onClick={() => signIn()}>Iniciar Sesión</button>
      </div>
    );
  }
};

export default login;
