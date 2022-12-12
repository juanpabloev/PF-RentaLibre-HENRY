import Navbar from "./navbar";
import Footer from "./footer";
import { Container } from "@chakra-ui/react";

type Props = {
  children: JSX.Element;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <Container maxW={"100%"} minH={"95.8vh"} margin={0} padding={0}>
        {children}
      </Container>
      <Footer />
    </>
  );
}
