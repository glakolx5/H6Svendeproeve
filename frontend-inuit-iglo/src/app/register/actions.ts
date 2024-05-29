"use server"

import { redirect } from "next/navigation";

export async function createUser(formData: FormData) {

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const password_confirm = formData.get("password_confirm") as string;

    var data = {
        email: email,
        password: password,
        password_confirm: password_confirm
    }

    if (data["password"] !== data["password_confirm"]) {
        return Error
    }
    else {
        const JSONData = JSON.stringify({ email, password });

        const fulllink = 'http://localhost:5033/register'
        const response = await fetch(fulllink,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSONData

            }
        );
        const result = response.status
        if (result != 200) {
            return Error
        }
        else {
            redirect("/register/registered")
        }

    }

}
