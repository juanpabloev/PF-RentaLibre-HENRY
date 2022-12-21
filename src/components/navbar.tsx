import { Session } from "inspector";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import styles from "../styles/navbar.module.css";
import { RouterOutputs, trpc } from "../utils/trpc";

import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Input,
  Link,
  Select,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import {
  RxCaretDown as ChevronDownIcon,
  RxCaretRight as ChevronRightIcon,
  RxCross2 as CloseIcon,
  RxHamburgerMenu as HamburgerIcon,
  RxMagnifyingGlass as SearchIcon,
} from "react-icons/rx";

export default function WithSubnavigation() {
  const categories = trpc.category.getCategories.useQuery().data;
  const { data: session, status } = useSession();
  // console.log({ session, status });
  const router = useRouter();
  const { isOpen, onToggle } = useDisclosure();
  const [inputSearch, setInputSearch] = useState("");
  const [selectCategory, setSelectCategory] = useState(
    router.query.category ?? ""
  );

  const handleChange = (event: React.FormEvent<HTMLInputElement>) =>
    setInputSearch(event.currentTarget.value);
  const handleSubmit = (inputText: String) => {
    // const { category } = router.query;
    setInputSearch(inputText);
    inputText += `&category=${selectCategory}`;
    router.push(`/productList?q=${inputText}`);
  };
  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      handleSubmit(inputSearch);
    }
  };

  const handleChangeSelect = (e: React.FormEvent<HTMLInputElement>) => {
    setSelectCategory(e.currentTarget.value);
    document.getElementById("inputSearch")?.focus();
    // const { category } = router.query;
    // if (category) inputText += `&category=${category}`;
    // router.push(`/productList?q=${inputText}`);
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
          <Flex
            flex={{ base: 1 }}
            justify={{ base: "center", md: "start" }}
            marginLeft={"82px"}
            maxWidth={"720px"}
          >
            <Select
              placeholder="Todas"
              size="lg"
              value={selectCategory}
              borderEndRadius={"none"}
              bgColor={"white"}
              focusBorderColor={"#66000000"}
              width={(selectCategory.length * 8 + 64) * 2 + "px"}
              minWidth="150px"
              maxWidth={"max-content"}
              onChange={handleChangeSelect}
            >
              {categories?.map((c) => (
                <option value={c.name}>{c.name} </option>
              ))}
            </Select>
            <Input
              id="inputSearch"
              value={inputSearch}
              onChange={handleChange}
              onKeyDown={keyDownHandler}
              placeholder="Busca productos marcas y mas..."
              size="lg"
              width={"100%"}
              height={""}
              bgColor={"white"}
              borderRadius={"none"}
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
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
          marginLeft={"82px"}
        >
          {" "}
          {!session && (
            <Button
              as={"a"}
              fontSize={"lg"}
              fontWeight={600}
              color={"white"}
              variant={"link"}
              href={"/api/auth/signin"}
            >
              Ingresar
            </Button>
          )}
          {session && (
            <>
              <Flex minWidth="max-content" alignItems="center" gap="2">
                <Text fontSize={"lg"} fontWeight={600} color={"white"}>
                  Hola, {session.user?.name}
                </Text>
              </Flex>

              <Button
                as={"a"}
                fontSize={"lg"}
                fontWeight={600}
                color={"white"}
                variant={"link"}
                href={"/api/auth/signout"}
              >
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  Salir
                </a>
              </Button>
            </>
          )}
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
            <DesktopNav
              setSelectCategory={setSelectCategory}
              setInputSearch={setInputSearch}
            />
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

const DesktopNav = (props: {
  setSelectCategory: Function;
  setInputSearch: Function;
}) => {
  const { setSelectCategory, setInputSearch } = props;
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  // const categories = trpc.category.getCategories.useQuery().data;

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                as={NextLink}
                onClick={() => {
                  setSelectCategory(
                    navItem.label != "Todas" ? navItem.label : ""
                  );
                  setInputSearch("");
                }}
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
              <>
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
                <Icon as={ChevronDownIcon} w={6} h={6} />
              </>
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
      {NAV_ITEMS.map((navItem, i) => (
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
  // {
  //   label: "Categorías",
  //   children: [
  //     {
  //       label: "Bienes de Consumo no Duraderos",
  //       href: "/productList?category=Bienes de Consumo no Duraderos",
  //     },
  //     {
  //       label: "Bienes de Equipo",
  //       href: "/productList?category=Bienes de Equipo",
  //     },
  //     {
  //       label: "Cuidado de la Salud",
  //       href: "/productList?category=Cuidado de la Salud",
  //     },
  //     {
  //       label: "Energía",
  //       href: "/productList?category=Energía",
  //     },
  //     {
  //       label: "Electrónica, Audio y Video",
  //       href: "/productList?category=Electrónica, Audio y Video",
  //     },
  //     {
  //       label: "Industrias Básicas",
  //       href: "/productList?category=Industrias Básicas",
  //     },
  //     {
  //       label: "Servicio al Consumidor",
  //       href: "/productList?category=Servicio al Consumidor",
  //     },
  //     {
  //       label: "Electrodomésticos y Aires Ac.",
  //       href: "/productList?category=Electrodomésticos y Aires Ac.",
  //     },
  //     {
  //       label: "Transportación",
  //       href: "/productList?category=Transportación",
  //     },
  //   ],
  // },
  {
    label: "Todas",
    href: "/productList",
  },
  {
    label: "Electrodomésticos y Aires Ac.",
    href: "/productList?category=Electrodomésticos y Aires Ac.",
  },
  {
    label: "Electrónica, Audio y Video",
    href: "/productList?category=Electrónica, Audio y Video",
  },
  {
    label: "Herramientas",
    href: "/productList?category=Herramientas",
  },
  {
    label: "Salud y Equipamiento Médico",
    href: "/productList?category=Salud y Equipamiento Médico",
  },
];
