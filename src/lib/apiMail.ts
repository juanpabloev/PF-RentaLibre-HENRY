// Esta funcion postea al handler en api/contactMail

//hay que importarla al componente en el que querramos enviar un mail

export const sendContactForm = async (data: any) =>
  fetch("/api/contactMail", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });
