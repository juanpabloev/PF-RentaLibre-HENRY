import Navbar from "./navbar";
import Footer from "./footer";

type Props = {
  children: JSX.Element;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
