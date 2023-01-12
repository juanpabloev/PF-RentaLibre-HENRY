import {
  Box,
  Stack,
  IconButton,
  useBreakpointValue,
  Container,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";

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

export default function CardProductHome({ dataCarusel }) {
  const [slider, setSlider] = React.useState(null);
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });
  return (
    <Box
      position={"relative"}
      height={"450px"}
      width={"full"}
      overflow={"hidden"}
    >
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
        </IconButton><IconButton
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
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {dataCarusel?.map((data, index) => (
          <Box
            key={index}
            height={"340px"}
            width={"full"}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundImage={`url(${data.picture})`}
          >
            <NextLink href={data.url ? data.url : "/"}>
              <Container size="container.lg" height="600px" position="relative">
                <Stack
                  spacing={6}
                  w={"full"}
                  maxW={"lg"}
                  position="absolute"
                  top="50%"
                  transform="translate(0, -50%)"
                >
                </Stack>
              </Container>
            </NextLink>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
