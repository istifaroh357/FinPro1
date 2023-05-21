import { useEffect, useState } from "react"
import axios from "axios"
import "./Banner.css"

const Banner = () => {
    const [banner, setBanner] = useState("");


    useEffect(() => {
        axios
        .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banner/c9cb1176-c825-485a-8fb7-de512e0b8503",
        {
            headers: {
                apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            }
        })
        .then(function(response) {
            console.log(response)
            setBanner(response.data.data.imageUrl)
        })
    }, [])
    return (
        <div >
        <img src={banner} alt="" className="img-banner img-fluid" />
        </div>
    )
}


export default Banner;

