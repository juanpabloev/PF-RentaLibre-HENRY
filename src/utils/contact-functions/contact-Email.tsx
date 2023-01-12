interface Values {
    name: any,
    email: any,
    subject: string,
    message: string,
};

export default async function sendEmail(values: Values) {
    await fetch(`/api/contactMail`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    })

}
