import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  IconButton,
  useBreakpointValue,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";
import React from "react";

interface Item {
  id: number;
  productName: string;
  productPrice: number;
  userName: string;
  photos: string;
  description: string;
  fecha: string;
  category: string;
  available: boolean;
}

interface Props {
  data: Item[];
  dataCarusel: Carusel[];
}

interface Carusel {
  id: number;
  image: string;
}

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Page({ data, dataCarusel }: Props) {
  const [slider, setSlider] = React.useState<Slider | null>(null);
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });
  return (
    <>
      <Box
        position={"relative"}
        height={"450px"}
        width={"full"}
        overflow={"hidden"}
      >
        {/* CSS files for react-slick */}
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        {/* Left Icon */}
        <IconButton
          aria-label="left-arrow"
          variant="ghost"
          position="absolute"
          left={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickPrev()}
        >
          <BiLeftArrowAlt size="40px" />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          variant="ghost"
          position="absolute"
          right={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickNext()}
        >
          <BiRightArrowAlt size="40px" />
        </IconButton>
        {/* Slider */}
        <Slider {...settings} ref={(slider: any) => setSlider(slider)}>
          {dataCarusel.map((data, index) => (
            <Box
              key={index}
              height={"400px"}
              width={"full"}
              position="relative"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundImage={`url(${data.image})`}
            >
              {/* This is the block you need to change, to customize the caption */}
              <Container size="container.lg" height="600px" position="relative">
                <Stack
                  spacing={6}
                  w={"full"}
                  maxW={"lg"}
                  position="absolute"
                  top="50%"
                  transform="translate(0, -50%)"
                >
                  {/* <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                  {card.title}
                </Heading>
                <Text fontSize={{ base: 'md', lg: 'lg' }} color="GrayText">
                  {card.text} 
                </Text>*/}
                </Stack>
              </Container>
            </Box>
          ))}
        </Slider>
      </Box>
      <SimpleGrid columns={3} spacingX="0px" spacingY="0px">
        {data.map((item) => (
          <Center py={12}>
            <Box
              role={"group"}
              p={6}
              maxW={"230px"}
              w={"230px"}
              bg={useColorModeValue("white", "gray.800")}
              boxShadow={"2xl"}
              rounded={"lg"}
              pos={"relative"}
              zIndex={1}
            >
              <Box
                rounded={"lg"}
                mt={-12}
                pos={"relative"}
                height={"160px"}
                _after={{
                  transition: "all .3s ease",
                  content: '""',
                  w: "full",
                  h: "full",
                  pos: "absolute",
                  top: 5,
                  left: 0,
                  backgroundImage: `url(${item.photos})`,
                  filter: "blur(15px)",
                  zIndex: -1,
                }}
                _groupHover={{
                  _after: {
                    filter: "blur(20px)",
                  },
                }}
              >
                <Image
                  rounded={"lg"}
                  height={180}
                  width={180}
                  objectFit={"cover"}
                  src={item.photos}
                />
              </Box>
              <Stack pt={10} align={"center"}>
                <Text
                  color={"gray.500"}
                  fontSize={"sm"}
                  textTransform={"uppercase"}
                >
                  {item.category}
                </Text>
                <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
                  {item.productName}
                </Heading>
                <Stack direction="row" align={"center"}>
                  <Text fontWeight={400} fontSize={"xl"}>
                    ${item.productPrice} / {item.fecha}
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Center>
        ))}
      </SimpleGrid>
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3001/productsCollection");
  const data = await res.json();
  const resCarusel = await fetch("http://localhost:3001/carrousel");
  const dataCarusel = await resCarusel.json();
  return {
    props: {
      data,
      dataCarusel,
    },
  };
};
