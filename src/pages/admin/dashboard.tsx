import React from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from 'next/router'


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
  router.push('/404')
  /* return (
    <div>
      <p>SOS UN 404!!! test</p>
      
    </div>
  ); */
 }
};


export default Dashboard;