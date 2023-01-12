import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { trpc } from "../../../utils/trpc";
import { storage } from "../../../../firebaseConfig";
import { useRouter } from "next/router";
import { Spinner } from "@chakra-ui/react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import {
  Button,
  Heading,
  Input,
  Text,
  Textarea,
  useToast,
  Select,
  Box,
  Flex,
  Img,
} from "@chakra-ui/react";

export default function EditPublication() {
  let positionPicture = 0;
  const router = useRouter();
  const { id } = router.query;
  const product = trpc.product.getProductByID.useQuery({ id }).data;
  const [editPublication, setEditPublication] = useState({
    saveButton: false,
    title: "",
    picturePosition: 0,
    category: "",
    model: "",
    brand: "",
    price: "",
    securityDeposit: "",
    description: "",
    picture: "",
  });
  const [publicationPictures, setPublicationPictures] = useState({
    0: [false, ""],
    1: [false, ""],
    2: [false, ""],
    3: [false, ""],
  });
  const hiddenFileInput = React.useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  function handleSelectFile(file) {
    setPublicationPictures({
      ...publicationPictures,
      [editPublication.picturePosition]: [true, ""],
    });
    const name = file && file[0].name;
    const storageRef = ref(storage, `publicationPicture/${name}`);
    const uploadTask = uploadBytesResumable(storageRef, file[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setEditPublication({
            ...editPublication,
            saveButton: true,
            picture: url,
          });
          setPublicationPictures({
            ...publicationPictures,
            [editPublication.picturePosition]: [false, url],
          });
        });
      }
    );
  }
  const toast = useToast();
  const { data: session, status } = useSession({ required: true })
  const categoriesDB = trpc.category.getCategories.useQuery().data;

  const [editShow, setEditShow] = useState({
    selectCategory: false,
    inputTitle: false,
    inputMarca: false,
    changePhoto: false,
    inputDescription: false,
    inputModel: false,
    inputPrice: false,
    inputDeposit: false,
  });

  const handleChange = (e) =>
    setEditPublication((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      saveButton: true,
    }));
  const updateProduct = trpc.product.updateProduct.useMutation();

  function handleSaveClick() {
    const category = categoriesDB.find(
      (c) => c.name === editPublication.category
    );
    let picturesUrl = [];
    for (const picture in publicationPictures) {
      if (publicationPictures[picture][1]) {
        picturesUrl.push(publicationPictures[picture][1]);
      }
    }
    const { title, model, brand, price, securityDeposit, description } =
      editPublication;
    updateProduct
      .mutateAsync({
        pictures: picturesUrl[0]
          ? picturesUrl
          : product?.pictures
          ? product.pictures
          : [""],
        productId: id,
        title: title ? title : product?.title ? product.title : "",
        categoryId: category?.id
          ? category.id
          : product?.categoryId
          ? product.categoryId
          : "",
        model: model ? model : product?.model ? product.model : "",
        brand: brand ? brand : product?.brand ? product.brand : "",
        description: description
          ? description
          : product?.description
          ? product.description
          : "",
        price: price ? parseInt(price) : product?.price ? product.price : 0,
        securityDeposit: securityDeposit
          ? parseInt(securityDeposit)
          : product?.securityDeposit
          ? product.securityDeposit
          : 0,
      })
      .then(() =>
        setEditPublication((prev) => {
          return { ...prev, saveButton: false };
        })
      );
    setEditShow({
      selectCategory: false,
      inputTitle: false,
      inputMarca: false,
      changePhoto: false,
      inputDescription: false,
      inputModel: false,
      inputPrice: false,
      inputDeposit: false,
    });
    toast({
      title: "¡Artículo Editado!",
      status: "success",
      duration: 2000,
      position: "top",
    });
  }

  function handleDismissClick() {
    setEditPublication({
      saveButton: false,
      title: "",
      picturePosition: 0,
      category: "",
      model: "",
      brand: "",
      price: "",
      securityDeposit: "",
      description: "",
      picture: "",
    });

    setPublicationPictures({
      0: [false, ""],
      1: [false, ""],
      2: [false, ""],
      3: [false, ""],
    });
  }

  if (status === "authenticated" && !session?.userDB?.banned) {
    return (
      <Flex w="100%" mt={12}>
        <Box w="50%">
          <Input
            type="file"
            ref={hiddenFileInput}
            display="none"
            onChange={(e) => {
              handleSelectFile(e.target.files);
            }}
          />
          <Heading marginBottom={30} textAlign="center">
            Editar Artículo
          </Heading>
          <Flex>
            <Text fontSize="20px" fontWeight="semibold" ml="1%">
              Categoría:
            </Text>
            <Text
              ml="1%"
              mr="1%"
              color="blue.400"
              fontSize="20px"
              fontWeight="semibold"
            >
              {editPublication.category
                ? editPublication.category
                : product?.category.name}
            </Text>
            <button
              onClick={() =>
                setEditShow({
                  ...editShow,
                  selectCategory: editShow.selectCategory ? false : true,
                })
              }
            >
              <Img
                h="20px"
                w="20px"
                src="https://firebasestorage.googleapis.com/v0/b/rentalibre-fbbda.appspot.com/o/userPicture%2Flapiz.png?alt=media&token=7b37e919-dc4c-4fc3-a424-aba961083482"
              />
            </button>
          </Flex>
          {editShow.selectCategory && (
            <Select
              value={editPublication.category}
              name="category"
              w="50%"
              ml="1%"
              placeholder="Elegir..."
              onChange={handleChange}
            >
              {categoriesDB?.sort().map((c) => (
                <option value={c.name} key={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          )}

          <Flex>
            <Text fontSize="20px" fontWeight="semibold" ml="1%">
              Titulo:
            </Text>
            <Text
              ml="1%"
              color="blue.400"
              fontSize="20px"
              fontWeight="semibold"
            >
              {editPublication.title ? editPublication.title : product?.title}
            </Text>
            <Box justifyContent="center" ml="1%" mr="1%" mt="1%">
              <button
                onClick={() =>
                  setEditShow({
                    ...editShow,
                    inputTitle: editShow.inputTitle ? false : true,
                  })
                }
              >
                <Img
                  h="20px"
                  w="20px"
                  src="https://firebasestorage.googleapis.com/v0/b/rentalibre-fbbda.appspot.com/o/userPicture%2Flapiz.png?alt=media&token=7b37e919-dc4c-4fc3-a424-aba961083482"
                />
              </button>
            </Box>
          </Flex>
          {editShow.inputTitle && (
            <Input
              value={editPublication.title}
              onChange={handleChange}
              type="text"
              name="title"
              placeholder="Titulo..."
              w="50%"
              ml="1%"
            />
          )}
          <Flex>
            <Text fontSize="20px" fontWeight="semibold" ml="1%">
              Marca:
            </Text>
            <Text
              ml="1%"
              mr="1%"
              color="blue.400"
              fontSize="20px"
              fontWeight="semibold"
            >
              {editPublication.brand ? editPublication.brand : product?.brand}
            </Text>
            <button
              onClick={() =>
                setEditShow({
                  ...editShow,
                  inputMarca: editShow.inputMarca ? false : true,
                })
              }
            >
              <Img
                h="20px"
                w="20px"
                src="https://firebasestorage.googleapis.com/v0/b/rentalibre-fbbda.appspot.com/o/userPicture%2Flapiz.png?alt=media&token=7b37e919-dc4c-4fc3-a424-aba961083482"
              />
            </button>
          </Flex>
          {editShow.inputMarca && (
            <Input
              value={editPublication.brand}
              onChange={handleChange}
              type="text"
              name="brand"
              placeholder="Marca..."
              w="50%"
              ml="1%"
            />
          )}
          <Flex>
          <Flex>
            <Text fontSize="20px" fontWeight="semibold" ml="1%">
              Descripción:
            </Text>
            <Text
              ml="1%"
              mr="1%"
              color="blue.400"
              fontSize="20px"
              fontWeight="semibold"
              w='80%'
            >
              {editPublication.description
                ? editPublication.description
                : product?.description}
            </Text>
            </Flex>
            <Box justifyContent="center" ml="1%" mr="1%" mt="1%" w='20%'>
              <button
                onClick={() =>
                  setEditShow({
                    ...editShow,
                    inputDescription: editShow.inputDescription ? false : true,
                  })
                }
              >
                <Img
                  h="20px"
                  w="20px"
                  src="https://firebasestorage.googleapis.com/v0/b/rentalibre-fbbda.appspot.com/o/userPicture%2Flapiz.png?alt=media&token=7b37e919-dc4c-4fc3-a424-aba961083482"
                />
              </button>
            </Box>
            </Flex>
          
          {editShow.inputDescription && (
            <Textarea
              value={editPublication.description}
              name="description"
              onChange={handleChange}
              mt="3%"
              ml="3%"
              rows={6}
              mb="2%"
              w="90%"
            />
          )}
        </Box>
        <Flex flexDirection="column" w="50%">
          <Flex justifyContent="center" w="100%">
            <Box
              border="solid blue 2px"
              borderRadius="20px"
              h="fit-content"
              w="fit-content"
              mb="1%"
            >
              <Tabs pr="3%" pl="3%">
                <TabList>
                  {product?.pictures
                    .map((p) => {
                      positionPicture = positionPicture + 1;
                      return [positionPicture - 1, p];
                    })
                    .map((p) => {
                      return (
                        <Tab
                          key={p[0]}
                          onClick={() =>
                            setEditPublication((prevState) => {
                              return { ...prevState, picturePosition: p[0] };
                            })
                          }
                        >
                          {publicationPictures[p[0]][0] ? (
                            <Flex w="100%" justifyContent="center">
                              <Spinner color="blue" size="xl" />{" "}
                            </Flex>
                          ) : (
                            <Img
                              borderRadius="30px"
                              src={
                                publicationPictures[p[0]][1]
                                  ? publicationPictures[p[0]][1]
                                  : p[1]
                              }
                              w="150px"
                              h="150px"
                            />
                          )}
                        </Tab>
                      );
                    })}
                  {/* {product?.pictures.length < 4 ? <Tab  w="100px" h="100px"
    onClick={()=>{
      positionPicture = positionPicture + 1
      setEditPublication((prevState)=>{return {...prevState,picturePosition:positionPicture -1}})
     }
    }
    >
      <Text>Agregar</Text>
    </Tab> : null
    } */}
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Button
                      fontSize="15px"
                      fontWeight="semibold"
                      size="sm"
                      bgColor="blue.400"
                      _hover={{ bgColor: "blue.500" }}
                      onClick={handleClick}
                    >
                      Cambiar
                    </Button>
                  </TabPanel>
                  <TabPanel>
                    <Button
                      fontSize="15px"
                      fontWeight="semibold"
                      onClick={handleClick}
                      size="sm"
                      bgColor="blue.400"
                      _hover={{ bgColor: "blue.500" }}
                    >
                      Cambiar
                    </Button>
                  </TabPanel>
                  <TabPanel>
                    <Button
                      size="sm"
                      bgColor="blue.400"
                      _hover={{ bgColor: "blue.500" }}
                      fontSize="15px"
                      fontWeight="semibold"
                      onClick={handleClick}
                    >
                      Cambiar
                    </Button>
                  </TabPanel>
                  <TabPanel>
                    <Button
                      size="sm"
                      bgColor="blue.400"
                      _hover={{ bgColor: "blue.500" }}
                      fontSize="15px"
                      fontWeight="semibold"
                      onClick={handleClick}
                    >
                      Cambiar
                    </Button>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Flex>
          <Box w="100%">
            <Flex>
              <Text fontSize="20px" fontWeight="semibold" ml="1%">
                Modelo:
              </Text>
              <Text
                ml="1%"
                color="blue.400"
                fontSize="20px"
                fontWeight="semibold"
              >
                {editPublication.model ? editPublication.model : product?.model}
              </Text>
              <Box justifyContent="center" mr="1%" ml="1%" mt="1%">
                <button
                  onClick={() =>
                    setEditShow({
                      ...editShow,
                      inputModel: editShow.inputModel ? false : true,
                    })
                  }
                >
                  <Img
                    h="20px"
                    w="20px"
                    src="https://firebasestorage.googleapis.com/v0/b/rentalibre-fbbda.appspot.com/o/userPicture%2Flapiz.png?alt=media&token=7b37e919-dc4c-4fc3-a424-aba961083482"
                  />
                </button>
              </Box>
            </Flex>
            {editShow.inputModel && (
              <Input
                onChange={handleChange}
                value={editPublication.model}
                name="model"
                type="text"
                placeholder="Modelo..."
                w="50%"
                ml="1%"
              />
            )}
            <Flex>
              <Text fontSize="20px" fontWeight="semibold" ml="1%">
                Price:
              </Text>
              <Text
                ml="1%"
                color="blue.400"
                fontSize="20px"
                fontWeight="semibold"
              >
                {editPublication.price ? editPublication.price : product?.price}
              </Text>
              <Box justifyContent="center" ml="1%" mr="1%" mt="1%">
                <button
                  onClick={() =>
                    setEditShow({
                      ...editShow,
                      inputPrice: editShow.inputPrice ? false : true,
                    })
                  }
                >
                  <Img
                    h="20px"
                    w="20px"
                    src="https://firebasestorage.googleapis.com/v0/b/rentalibre-fbbda.appspot.com/o/userPicture%2Flapiz.png?alt=media&token=7b37e919-dc4c-4fc3-a424-aba961083482"
                  />
                </button>
              </Box>
            </Flex>
            {editShow.inputPrice && (
              <Input
                value={editPublication.price}
                onChange={handleChange}
                name="price"
                type="number"
                placeholder="Price..."
                w="50%"
                ml="1%"
              />
            )}
            <Flex>
              <Text fontSize="20px" fontWeight="semibold" ml="1%">
                Seña:
              </Text>
              <Text
                ml="1%"
                color="blue.400"
                fontSize="20px"
                fontWeight="semibold"
              >
                {editPublication.securityDeposit
                  ? editPublication.securityDeposit
                  : product?.securityDeposit}
              </Text>
              <Box justifyContent="center" mr="1%" ml="1%" mt="1%">
                <button
                  onClick={() =>
                    setEditShow({
                      ...editShow,
                      inputDeposit: editShow.inputDeposit ? false : true,
                    })
                  }
                >
                  <Img
                    h="20px"
                    w="20px"
                    src="https://firebasestorage.googleapis.com/v0/b/rentalibre-fbbda.appspot.com/o/userPicture%2Flapiz.png?alt=media&token=7b37e919-dc4c-4fc3-a424-aba961083482"
                  />
                </button>
              </Box>
            </Flex>
            {editShow.inputDeposit && (
              <Input
                value={editPublication.securityDeposit}
                onChange={handleChange}
                name="securityDeposit"
                type="number"
                placeholder="Seña..."
                w="50%"
                ml="1%"
              />
            )}
            {editPublication.saveButton ? (
              editPublication.picture ||
              editPublication.title ||
              editPublication.brand ||
              editPublication.category ||
              editPublication.description ||
              editPublication.price ||
              editPublication.securityDeposit ||
              editPublication.model ? (
                <Flex mb="2%">
                  <Button
                    _hover={{ bg: "#404c5a", color: "white" }}
                    onClick={handleSaveClick}
                    ml="3%"
                    mt="3%"
                  >
                    Guardar cambios
                  </Button>
                  <Button
                    _hover={{ bg: "#404c5a", color: "white" }}
                    onClick={handleDismissClick}
                    ml="3%"
                    mt="3%"
                  >
                    Descartar cambios
                  </Button>
                </Flex>
              ) : null
            ) : null}
          </Box>
        </Flex>
      </Flex>
    );
  } else {
    router.push("/access-denied");
  }
}
