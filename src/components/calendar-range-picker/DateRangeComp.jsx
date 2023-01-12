import { useSession, signIn } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import sendEmail from "../../utils/contact-functions/contact-Email";
import { HStack, Button, useToast } from "@chakra-ui/react";

export default function DateRangeComp({
  productId,
  productName,
  productUserEmail,
  productUserName,
  productPrice,
}) {

  const toast = useToast();
  const session = useSession();

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const handleSendDates = async (e) => {
    e.preventDefault();

    const url = process.env.NEXT_PUBLIC_HOME_URL

    try {
      const differenceDays = range[0].endDate.getTime() - range[0].startDate.getTime();
      const totalDays = Math.ceil(differenceDays / (1000 * 3600 * 24));
      const totalPrice = productPrice*totalDays;
      const startDate = format(range[0].startDate, "dd/MM/yyyy");
      const endDate = format(range[0].endDate, "dd/MM//yyyy");

      const urlRentReq = `${url}/account/rent-request/${productId}/?totalDays=${totalDays}&totalPrice=${totalPrice}&startDate=${startDate}&endDate=${endDate}&U=${session?.data?.userDB?.id}`

      /* 
      //DAtos a eviar por url: 
        - totalDays
        - totalPrice
        - startDate
        - endDate
        - userID (U)
       */


      const values = {
        name: productUserName,
        email: productUserEmail,
        subject: `Consulta sobre su artículo ${productName}`,
        message: `
        <h3>¿Está su artículo ${productName} disponible entre las siguientes fechas?</h3><br>
        <h4>Desde el: ${startDate}</h4>
        <h4>Hasta el: ${endDate}</h4>
        <h4>Condiciones alquiler:</h4>
        <p>Precio alquiler diario: ${productPrice}</p>
        <p>- Cantidad de dias de alquiler:${totalDays}</p>
        <p>- Total a cobrar: $${totalPrice}</p>
        <p>Si usted está de acuerdo con las condiciones del sitio, las fechas y el precio, por favor haga click en el siguiente link para confirmar:</p>
        <p> ${urlRentReq}</p><br>
        <p> Saudos, El equipo de rentalibre.</p>
      `,
      };
      if (true) {
            sendEmail(values);
        } else {
            console.log('No Data response from publication');
        };

      toast({
        title: "¡Su Consulta ha sido Enviada!",
        status: "success",
        duration: 2000,
        position: "top",
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="calendarWrap" display="inline-block" position="relative">
      <HStack spacing={20} alignContent={"center"}>
        <input
          value={`${format(range[0].startDate, "dd/MM/yyyy")} -> ${format(
            range[0].endDate,
            "dd/MM//yyyy"
          )}`}
          readOnly
          className="inputBox"
          onClick={() => setOpen((open) => !open)}
        />

        {session?.data?.user?.name && (
          <Button colorScheme="teal" onClick={handleSendDates}>
          Enviar Consulta
        </Button>
        )}

        {!session?.data?.user?.name && (
          <Button colorScheme="teal" onClick={signIn}>
          INGRESAR
        </Button>
        )}

        
      </HStack>

      <div ref={refOne}>
        {open && (
          <DateRange
            onChange={(item) => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={2}
            direction="vertical"
            className="calendarElement"
          />
        )}
      </div>
    </div>
  );
}
