import { useSession } from "next-auth/react";

export default function success () {
    return(
        <div>
            <h1>Su compra ha sido realizada con exito</h1>
        </div>
    )
}