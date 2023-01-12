import React from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from 'next/router'
import Admin from "../../components/adminComponents/admin";
import ErrorPage from 'next/error'
import { router } from "../../server/trpc/trpc";

const Dashboard = () => {
  const { data: session, status } = useSession({ required: true })
  const router = useRouter()

  if (status === "authenticated" && session?.userDB.role === 'ADMIN' && session?.userDB?.banned) {
    return (
      <div>
        <p>Soy Admin - Dashboard</p>
        <p>{session.user?.name}, SOS ADMINISTRADOR</p>
        <Admin/>
      </div>
    );
  } else {
    return <ErrorPage statusCode={404} />
  }
};

export default Dashboard;