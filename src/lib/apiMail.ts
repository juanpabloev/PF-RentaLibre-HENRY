// Esta funcion postea al handler en api/contactMail

export const sendContactForm = async (data: any) =>
  fetch("/api/contactMail", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });
