import React, { useState } from "react";
import { useRouter } from "next/router";

import {
  Box,
  Flex,
  Text,
  Input,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {
  RxHamburgerMenu as HamburgerIcon,
  RxCross2 as CloseIcon,
  RxCaretDown as ChevronDownIcon,
  RxCaretUp as ChevronRightIcon,
  RxMagnifyingGlass as SearchIcon,
} from "react-icons/rx";

export default function WithSubnavigation() {
  const router = useRouter();
  const { isOpen, onToggle } = useDisclosure();
  const [inputSearch, setInputSearch] = useState("");
  const handleChange = (event: React.FormEvent<HTMLInputElement>) =>
    setInputSearch(event.currentTarget.value);
  const handleSubmit = (inputText: String) => {
    const { category } = router.query;
    if (category) inputText += `&category=${category}`;
    router.push(`/productList?q=${inputText}`);
  };
  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      handleSubmit(inputSearch);
    }
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("#404c5a", "gray.800")}
        color={useColorModeValue("gray.600", "#404c5a")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            marginLeft={"42px"}
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            fontSize={"32px"}
            fontWeight={"bold"}
            color={useColorModeValue("#F7882F", "white")}
            cursor={"pointer"}
            onClick={() => {
              router.push("/");
            }}
          >
            RentaLibre
          </Text>
          <Input
            value={inputSearch}
            onChange={handleChange}
            onKeyDown={keyDownHandler}
            placeholder="Busca productos marcas y mas..."
            size="lg"
            maxW={"500px"}
            marginLeft={"82px"}
            height={""}
            bgColor={"white"}
            borderEndRadius={"none"}
            focusBorderColor={"#66000000"}
          />
          <IconButton
            onClick={() => {
              handleSubmit(inputSearch);
            }}
            icon={<SearchIcon />}
            size="lg"
            fontSize={"32px"}
            bgColor={"#F7C331"}
            aria-label={""}
            height={""}
            borderStartRadius={"none"}
          />{" "}
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            as={"a"}
            fontSize={"lg"}
            fontWeight={600}
            color={"white"}
            variant={"link"}
            href={"/login"}
          >
            Ingresar
          </Button>
          <Button
            as={"a"}
            fontSize={"lg"}
            fontWeight={600}
            color={"white"}
            variant={"link"}
            href={"/register"}
          >
            Registrarse
          </Button>
        </Stack>
      </Flex>
      <Flex
        bg={useColorModeValue("#F7C331", "gray.800")}
        color={useColorModeValue("gray.600", "#F7C331")}
        minH={"40px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={600}
            color={"#404c5a"}
            variant={"link"}
            href={"/login"}
          >
            Publicar
          </Button>
          <Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={600}
            color={"#404c5a"}
            variant={"link"}
            href={"/register"}
          >
            Favoritos
          </Button>
        </Stack>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                as={NextLink}
                href={navItem.href ?? "#"}
                p={2}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      as={NextLink}
      href={href ?? "#"}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link as={NextLink} key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Categorías",
    children: [
      {
        label: "Bienes de Consumo no Duraderos",
        href: "/productList?category=Bienes de Consumo no Duraderos",
      },
      {
        label: "Bienes de Equipo",
        href: "/productList?category=Bienes de Equipo",
      },
      {
        label: "Cuidado de la Salud",
        href: "/productList?category=Cuidado de la Salud",
      },
      {
        label: "Energía",
        href: "/productList?category=Energía",
      },
      {
        label: "Finanzas",
        href: "/productList?category=Finanzas",
      },
      {
        label: "Industrias Básicas",
        href: "/productList?category=Industrias Básicas",
      },
      {
        label: "Servicio al Consumidor",
        href: "/productList?category=Servicio al Consumidor",
      },
      {
        label: "Tecnología",
        href: "/productList?category=Tecnología",
      },
      {
        label: "Transportación",
        href: "/productList?category=Transportación",
      },
    ],
  },
  {
    label: "Tecnología",
    href: "/productList?category=Tecnología",
  },
  {
    label: "Finanzas",
    href: "/productList?category=Finanzas",
  },
  {
    label: "Cuidado de la Salud",
    href: "/productList?category=Cuidado de la Salud",
  },
  {
    label: "Bienes de Equipo",
    href: "/productList?category=Bienes de Equipo",
  },
  {
    label: "Misceláneas",
    href: "/productList?category=Misceláneas",
  },
];
