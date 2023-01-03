import React from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from 'next/router'

import ErrorPage from 'next/error'



const Dashboard = () => {
  const { data: session, status } = useSession({ required: true })
  const router = useRouter()

  //console.log(session); //me va a dar  objeto con la info de la sesion

  if (status === "authenticated" && session?.userDB.role === 'ADMIN') {
    return (
      <div>
        <p>Soy Admin - Dashboard</p>
        <p>{session.user?.name}, SOS ADMINISTRADOR</p>

      </div>
    );
  } else {
    return <ErrorPage statusCode={404} />
  }
};

export default Dashboard;