import { useSession, signIn, signOut, getSession } from "next-auth/react";
import CardProductMyProduct from "../../components/CardProduct-MyProduct";
import styles from "../../styles/productList.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { RouterOutputs, trpc } from "../../utils/trpc";
import { FaLeaf } from "react-icons/fa";

import {
  Center,
} from "@chakra-ui/react";
import { RxCaretDown as ChevronDownIcon } from "react-icons/rx";

export default function MyPublications() {
  const { data: session, status } = useSession({ required: true })
  const products = trpc.user.getUser.useQuery({}).data?.products

  const router = useRouter()

  if (status === "authenticated" && !session?.userDB?.banned) {

    return (
      <div>
        <Center>
          <div className={styles.cardsDivProdHome}>
            {products?.map((p: any) => (
              <CardProductMyProduct
                deleted={p.deleted}
                disabled={p.disabled}
                productName={p.title}
                photo={p.pictures[0]}
                productPrice={p.price}
                rating={p.rating}
                id={p.id}
                key={p.id}
              />
            ))}
          </div>
        </Center>
      </div>
    );
  } else {
    return router.push('/access-denied')
  }
}
