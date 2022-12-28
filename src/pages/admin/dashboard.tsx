import React from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";


const Dashboard = () => {
   const { data: session, status } = useSession({ required: true })
    
   //console.log(session); //me va a dar  objeto con la info de la sesion

  if (status === "authenticated" && session?.userDB.role === 'ADMIN') {
   return (
     <div>
       <p>Soy Admin - Dashboard</p>
       <p>{session.user?.name}, SOS ADMINISTRADOR</p>
       
     </div>
   );
 } else {
   return (
     <div>
       <p>{session?.user?.name}, NO ESTAS AUTORIZADO A VER ESTA PAGINA</p>
     </div>
   );
 }
};


export default Dashboard;