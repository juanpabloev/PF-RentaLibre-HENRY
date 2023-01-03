interface Values {
    name: string,
    email: string,
    subject: string,
    message: string
};

export default async function sendEmail(values: Values) {
    console.log(values)
    await fetch(`api/contactMail`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    })

}