"use server"

import { redirect } from "next/navigation";
import { auth } from "../auth";

export async function createHouse(formData: FormData) {

    const session = await auth()
    
    const town = formData.get("town") as string;
    const price = formData.get("price") as string;
    const imageSrc = formData.get("imageSrc") as string;
    const dateFrom = formData.get("dateFrom");
    const dateTo = formData.get("dateTo");
    
    const data = {
        town: town,
        price: price,
        imageSrc: imageSrc,
        dateFrom: dateFrom,
        dateTo: dateTo
    }

    const JSONData = JSON.stringify(data);

    const webapi = "http://localhost:5033";
    const endpoint = "/api/House";

    const fulllink = `${webapi}${endpoint}`

    const bear = session?.user?.id
    //console.log(bear)
    
    const response = await fetch(fulllink,
        {
            method: 'POST',
            headers: {
                
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + bear,
                
            },   
            body: JSONData

        }
    );
    
    const result = response.status

    if (result != 200) {
        console.log("error in the creating house item:\n")
        console.log(`Status code :${result}`)
    }
    else {
        console.log("register house complete")
        redirect("/")
    }


}


