interface Values {
    name: any,
    email: any,
    subject: string,
    message: string,
};

export default async function sendEmail(values: Values) {
    console.log(values)
    await fetch(`/api/contactMail`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    })

}

//*/****************************************************** */
//EJ DE ON SUBMIT::
//***************************************************** */


/* const onSubmit = () => {
   
  //envio notificaciond e email:

try {
    const values = {
        name: session?.userDB.name,
        email: session?.userDB.email,
        subject: 'Su publicación ha sido exitosa',
        message: 'Estimado ' + session?.userDB.name + 'Su artículo ' + publicationResponse?.title + ' ha sido publicado correctamente. Usted puede administrar sus publicaciones desde https://rentalibre.vercel.app/account/my-publications. Saudos, El equipo de rentalibre.'
    };
    sendEmail(values);
    
  } catch (error: any) {

  }
            


  }; */


