import React from "react";
import { useSession, signOut, getSession } from "next-auth/react";

//otra forma de ver estado de autenticacion con google

// ESTE COMPONENTE PUEDE MOSTRAR PAGINA DE DETALLE DE CUENTA - O DASHBOAARD USER

const Account = () => {
  const { data: session, status } = useSession({ required: true });
  //console.log(session); //me va a dar  objeto con la info de la sesion

  if (status === "authenticated") {
    return (
      <div>
        <p>Bienvenido, {session.user.name}</p>
        <button onClick={() => signOut()}>Cerrar Sesión</button>
      </div>
    );
  } /* else {
    return (
      <div>
        <p>Login</p>
        <button onClick={() => signIn()}>Iniciar Sesión</button>
      </div>
    );
  } */
};

export default Account;

/* export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  return {
    props: { session },
  };
};
 */