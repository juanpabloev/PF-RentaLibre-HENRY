import { Box, Text, Input, Img, Button, Flex } from "@chakra-ui/react";
import { trpc } from "../utils/trpc";
import React, { useState} from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";
import { Select } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import DashboardRentedProducts from "../components/profileComponents/dashboardRentedProducts";
import PhoneNumberInput from "../components/profileComponents/input-phoneNumber";
import { provincias } from "../utils/provincias-ciudades/provincias";
import { localidades } from "../utils/provincias-ciudades/localidades";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import Confirmation from "../components/profileComponents/confirmation-of-delete";


export default function Profile() {
  const { data: session } = useSession();
  const [editUser, setEditUser] = useState({
    name: "",
    userPicture: "",
    lastName: "",
    codigoPostal: "",
    countryName: "",
    stateName: "",
    cityName: "",
    phoneNumber: "",
  });

  const [editShow, setEditShow] = useState({
    inputName: false,
    inputPostal: false,
    inputPhone: false,
    changePhoto: false,
    changeLocation: false,
    seeTransactions: false,
    confirmationOfDeleteUser:false,
  });

  const [error, setError] = useState({
    inputPhone: false,
  });

  const breakpoints = {
    sm: "530px",
    md: "700px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  };

  const hiddenFileInput: any = React.useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const user = trpc.user.getUser.useQuery({
    userId: session?.userDB.id,
  }).data;

  const userUpdate = trpc.user.userUpdate.useMutation();

  function handleSelectFile(file: any) {
    setEditShow({ ...editShow, changePhoto: true });
    const name = file && file[0].name;
    const storageRef = ref(storage, `userPicture/${name}`);
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
          setEditUser({ ...editUser, userPicture: url });
          setEditShow({ ...editShow, changePhoto: false });
        });
      }
    );
  }

  function handleSelect(e: any) {
    if (e.target.name === "country") {
      setEditUser((prevState: any) => {
        return {
          ...prevState,
          countryName: e.target.value
        };
      });
    }
    if (e.target.name === "state") {
      setEditUser((prevState: any) => {
        return { ...prevState, stateName: e.target.value };
      });
    }
    if (e.target.name === "city") {
      setEditUser((prevState: any) => {
        return { ...prevState, cityName: e.target.value };
      });
    }
  }
  function handleSaveClick() {
    const {
      name,
      userPicture,
      lastName,
      codigoPostal,
      countryName,
      stateName,
      cityName,
      phoneNumber,
    } = editUser;
    userUpdate.mutate({
      userId: session?.userDB.id,
      name: name ? name : user?.name,
      userPicture: userPicture ? userPicture : user?.image ? user.image : "",
      lastName: lastName ? lastName : user?.lastName ? user.lastName : "",
      codigoPostal: codigoPostal
        ? codigoPostal
        : user?.codigoPostal
        ? user.codigoPostal
        : "",
      countryName: countryName
        ? countryName
        : user?.location?.country
        ? user.location.country
        : "",
      stateName: stateName
        ? stateName
        : user?.location?.state
        ? user.location.state
        : "",
      cityName: cityName
        ? cityName
        : user?.location?.city
        ? user.location.city
        : "",
      phoneNumber: phoneNumber
        ? phoneNumber
        : user?.phoneNumber
        ? user.phoneNumber
        : "",
    });
    setEditShow({
      inputName: false,
      inputPostal: false,
      inputPhone: false,
      changePhoto: false,
      changeLocation: false,
      seeTransactions: false,
      confirmationOfDeleteUser:false,
    });

  }

  function handleDismissClick() {
    setEditUser({
      name: "",
      userPicture: "",
      lastName: "",
      codigoPostal: "",
      countryName: "",
      stateName: "",
      cityName: "",
      phoneNumber: "",
    });
    setError({...error, inputPhone: false })

  }
  if (session) {
  return (
    <Box>
      {editShow.confirmationOfDeleteUser && (
        <Confirmation setState={setEditShow} state={editShow} userId={session.userDB.id}/>
      )}
      <Menu>
  <MenuButton as={Button} colorScheme='blue'>
    Profile
  </MenuButton>
  <MenuList>
    <MenuGroup title='Profile'>
      <MenuItem as={Button} onClick={()=>setEditShow({...editShow,confirmationOfDeleteUser:true})}>Eliminar cuenta</MenuItem>
    </MenuGroup>
    <MenuDivider />
  </MenuList>
</Menu>
      <Text textAlign="center" color="grey" fontSize="25px">
        {user?.userName}{" "}
      </Text>
      {editUser.userPicture && !editShow.changePhoto ? (
        <>
          <Img
            src={editUser.userPicture}
            m="0px auto 0px auto"
            w="200px"
            h="200px"
            alt="img"
            borderRadius="10px"
          />
        </>
      ) : editShow.changePhoto ? (
        <Flex w="100%" justifyContent="center">
          <Spinner color="blue" size="xl" />{" "}
        </Flex>
      ) : (
        user && (
          <Img
            borderRadius="10px"
            m="0px auto 0px auto"
            w="200px"
            h="200px"
            alt="img"
            src={user.image}
          />
        )
      )}
      <Flex w="100%" justifyContent="center">
        <Button
          bg="white"
          onClick={handleClick}
          display="block"
          h="25px"
          mt="10px"
          bgColor={editShow.confirmationOfDeleteUser ? 'blackAlpha.900' : 'whitesmoke'}
          _hover={{ bg: "#404c5a", color: "white" }}
        >
          cambiar foto
        </Button>
      </Flex>

      <Flex
        mt="5%"
        w="100%"
        flexDirection={{ base: "column", lg: "row" }}
        mb="2%"
      >
        <Box w={{ base: "100%", lg: "50%" }}>
          <Flex mt="30px">
            <Text ml="2%" fontSize="20px" fontWeight="semibold">
              NOMBRE Y APELLIDO:
            </Text>
            <Text
              ml="5px"
              color="blue"
              fontSize="20px"
              fontWeight="semibold"
              mr="1%"
            >
              {" "}
              {editUser.name ? editUser.name : user?.name}{" "}
              {editUser.lastName ? editUser.lastName : user?.lastName}
            </Text>
            <button
              onClick={() =>
                setEditShow({
                  ...editShow,
                  inputName: editShow.inputName ? false : true,
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
          {editShow.inputName ? (
            <Flex
              mt="10px"
              mb="10px"
              w="100%"
              flexDirection={{ base: "column", sm: "row" }}
            >
              <Input
                mb={{ base: "10px", sm: "0" }}
                placeholder="Nombre"
                w="200px"
                ml="2%"
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
              />
              <Input
                placeholder="Apellido"
                w="200px"
                ml="2%"
                value={editUser.lastName}
                onChange={(e) =>
                  setEditUser({ ...editUser, lastName: e.target.value })
                }
              />
            </Flex>
          ) : null}

          <Flex>
            <Text ml="2%" fontSize="20px" fontWeight="semibold">
              EMAIL:
            </Text>
            <Text ml="5px" color="grey" fontSize="20px" fontWeight="semibold">
              {" "}
              {user?.email}
            </Text>
          </Flex>
          <Flex>
            <Text ml="2%" fontSize="20px" fontWeight="semibold">
              CÓDIGO POSTAL:
            </Text>
            <Text
              ml="5px"
              color="blue"
              fontSize="20px"
              fontWeight="semibold"
              mr="1%"
            >
              {" "}
              {editUser.codigoPostal
                ? editUser.codigoPostal
                : user?.codigoPostal}
            </Text>
            <button
              onClick={() =>
                setEditShow({
                  ...editShow,
                  inputPostal: editShow.inputPostal ? false : true,
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
          {editShow.inputPostal ? (
            <Flex
              mt="10px"
              mb="10px"
              w="100%"
              flexDirection={{ base: "column", sm: "row" }}
            >
              <Input
                placeholder="Codigo Postal"
                w="200px"
                ml="2%"
                value={editUser.codigoPostal}
                onChange={(e) =>
                  setEditUser({ ...editUser, codigoPostal: e.target.value })
                }
              />
            </Flex>
          ) : null}

          <Flex>
            <Text
              ml="2%"
              color={error.inputPhone ? "red" : "black"}
              fontSize="20px"
              fontWeight="semibold"
            >
              NÚMERO DE TELÉFONO:
            </Text>
            <Text
              ml="5px"
              color="blue"
              fontSize="20px"
              fontWeight="semibold"
              mr="1%"
            >
              {" "}
              {editUser.phoneNumber ? editUser.phoneNumber : user?.phoneNumber}
            </Text>
            <button
              onClick={() =>
                setEditShow({
                  ...editShow,
                  inputPhone: editShow.inputPhone ? false : true,
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
          {editShow.inputPhone ? (
            <PhoneNumberInput
              setState={setEditUser}
              state={editUser}
              setStateError={setError}
              stateError={error}
            />
          ) : null}

          <Flex>
            <Text ml="2%" fontSize="20px" fontWeight="semibold">
              LOCACIÓN:
            </Text>
            <Text
              ml="5px"
              color="blue"
              fontSize="20px"
              fontWeight="semibold"
              mr="1%"
            >
              {" "}
              {editUser.countryName
                ? editUser.countryName
                : user?.location?.country}{" "}
              -{" "}
              {editUser.stateName ? editUser.stateName : user?.location?.state}{" "}
              - {editUser.cityName ? editUser.cityName : user?.location?.city}
            </Text>
            <button
              onClick={() =>
                setEditShow({
                  ...editShow,
                  changeLocation: editShow.changeLocation ? false : true,
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

          {editShow.changeLocation ? (
            <Flex>
              <Select
                mt="1%"
                name="country"
                placeholder="País"
                w="200px"
                ml="2%"
                onChange={(e) => handleSelect(e)}
              >
                    <option value='Argentina'>Argentina</option>
              </Select>
            </Flex>
          ) : null}

          {editUser.countryName && editShow.changeLocation ? (
            <Select
              mt="1%"
              name="state"
              placeholder="Provincia"
              w="200px"
              ml="2%"
              onChange={(e) => handleSelect(e)}
            >
              {provincias().map((s:any) => (
                  <option key={s.id} value={s.nombre}>{s.nombre}</option>
                ))}
            </Select>
          ) : null}

          {editUser.stateName && editShow.changeLocation ? (
            <Select
              mt="1%"
              name="city"
              placeholder="Localidad"
              w="200px"
              ml="2%"
              onChange={(e) => handleSelect(e)}
            >
              {localidades()
              .filter((ci:any) => ci.provincia.nombre === editUser.stateName)
              .map((ci:any) => (
                  <option key={ci.id} value={ci.municipio.nombre}>{ci.municipio.nombre}</option>
                ))}
            </Select>
          ) : null}

          { 
          editUser.userPicture ||
          editUser.stateName ||
          editUser.phoneNumber ||
          editUser.name ||
          editUser.lastName ||
          editUser.codigoPostal ||
          editUser.cityName ||
          editUser.countryName ? (
            <Flex mb="2%">
              {!error.inputPhone &&  (
                <Button
                  _hover={{ bg: "#404c5a", color: "white" }}
                  onClick={handleSaveClick}
                  ml="3%"
                  mt="3%"
                >
                  Guardar cambios
                </Button>
              )}
              <Button
                _hover={{ bg: "#404c5a", color: "white" }}
                onClick={handleDismissClick}
                ml="3%"
                mt="3%"
              >
                Descartar cambios
              </Button>
            </Flex>
          ) : null}

          <Input
            type="file"
            ref={hiddenFileInput}
            display="none"
            onChange={(e) => {
              handleSelectFile(e.target.files);
            }}
          />
        </Box>
        <Flex flexDirection="column" w={{ base: "100%", lg: "50%" }}>
          <Flex w="100%" justifyContent="center" mt="30px">
            <Button
              onClick={() =>
                setEditShow({
                  ...editShow,
                  seeTransactions: editShow.seeTransactions ? false : true,
                })
              }
              bgColor={editShow.confirmationOfDeleteUser ? 'blackAlpha.900' : 'whitesmoke'}
              _hover={{ bg: "#404c5a", color: "white" }}
            >
              Transacciones
            </Button>
          </Flex>
          {editShow.seeTransactions ? <DashboardRentedProducts user={user}/> : null}
        </Flex>
      </Flex>
    </Box>
  );
 }
 else {
  return (
    <div>
      <button onClick={() => signIn()}>Iniciar Sesión</button>
    </div>
  );
}
}