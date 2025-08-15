import LogoImg from "@/assets/logo.png";
import Footer from "@/components/layout/footer";
import Navigation from "@/components/layout/nav";
import Image from "next/image";

interface DisplayPropsInterface {
  children: React.ReactNode;
  authControl?: boolean;
  authControlFunction?: (state: boolean) => void
}

const DisplayLayout = (props: DisplayPropsInterface) => {
  return (
    <>
      <Navigation authControl={props.authControl} authControlFunction={props.authControlFunction} />
      {props.children}
      <Footer />
    </>
  );
};

export default DisplayLayout;
