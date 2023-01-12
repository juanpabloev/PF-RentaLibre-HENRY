import React from "react";
import { useSession, signOut } from "next-auth/react";

const Account = () => {
  const { data: session, status } = useSession({ required: true });
  
  if (status === "authenticated") {
    return (
      <div>
        <p>Bienvenido, {session?.user?.name}</p>
        <button onClick={() => signOut()}>Cerrar Sesión</button>
      </div>
    );
  }
};

export default Account;