import Navbarr from "../Components/Navbarr"
import { useEffect, useState } from "react"
import axios from "axios"
import './PhotosSharing.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';

const PhotosSharing = () => {

    const [bestPhoto, setBestPhoto] = useState([]);
    const [displayPhotos, setDisplayPhotos] = useState([]);
    const [user, setUser] = useState([]);

    const formik = useFormik({
        initialValues: {
            name: '',
            imageUrl: ''
        },

        validationSchema: Yup.object({
            name: Yup.string().required('Required'),

            imageUrl: Yup.string().required('Required')
        }),

        onSubmit: values => {
            const name = values.name
            const imageUrl = values.imageUrl;
            axios.post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-category", {
                name: name,
                imageUrl: imageUrl
            },
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"
                    }
                }
            )
                .then(function (response) {
                    axios.get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
                        {
                            headers: {
                                apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                            }
                        })
                        .then(function (response) {
                            console.log(response)
                            setDisplayPhotos(response.data.data)
                        })
                })
                .catch(err => console.log(err))
        }
    })


    useEffect(() => {
        axios
            .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/category/db3981c0-c97d-4034-a1cd-371f9d9995a1",
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                    }
                })
            .then(function (response) {
                console.log(response)
                setBestPhoto(response.data.data)
            })
    }, [])

    useEffect(() => {
        axios
            .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                    }
                })
            .then(function (response) {
                console.log(response)
                setDisplayPhotos(response.data.data)
            })
    }, [])

    const handleDelete = (id) => {
        axios
            .delete(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-category/${id}`,
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"
                    }
                })
            .then(function (response) {
                axios
                    .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
                        {
                            headers: {
                                apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                            }
                        })
                    .then(function (response) {
                        setDisplayPhotos(response.data.data)
                    })
            })
    }

    useEffect(() => {
        axios
            .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user",
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"
                    }
                })
            .then(function (response) {
                setUser(response.data.data)
            })
    }, [])

    return (
        <>
            <Navbarr />
            <div className="container-fluid">
                <marquee behavior="" direction="">You can get and share amazing photos here!!!</marquee>
                <h1>3 Best Photos this Week</h1>

                <div className="box-photos-sharing">
                    <div className="card-best-photos">
                        <p>Category: {bestPhoto.name}</p>
                        <p>Post at: {bestPhoto.createdAt}</p>
                        <img src={bestPhoto.imageUrl} alt="Best Photos 1" className="img-best-photos img-fluid" />
                    </div>
                    <div className="card-best-photos">
                        <p>Category: {bestPhoto.name}</p>
                        <p>Post at: {bestPhoto.createdAt}</p>
                        <img src={bestPhoto.imageUrl} alt="Best Photos 1" className="img-best-photos img-fluid" />
                    </div>
                    <div className="card-best-photos">
                        <p>Category: {bestPhoto.name}</p>
                        <p>Post at: {bestPhoto.createdAt}</p>
                        <img src={bestPhoto.imageUrl} alt="Best Photos 1" className="img-best-photos img-fluid" />
                    </div>
                </div>
                <br /> <br />

                <br /> <br />
                <div>
                    <h1>Travel Addict Gallery</h1>
                    <div className="body-display">
                        <div className="photos-display">
                            {displayPhotos.map(item => {
                                return (
                                    <div className="card-photos-display" key={item.id}>
                                        <img src={item.imageUrl} alt="" className="img-display-photos rounded" />
                                        <p>Judul Category : {item.name}</p>
                                        <p>Post At: {item.createdAt}</p>
                                        <button className="btn button-edit">Edit</button>
                                        <button onClick={() => handleDelete(item.id)} className="btn button-delete">Delete</button>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="box-upload-photo">
                            <h4>Travel Addicter, Share your best photo here! </h4>
                            <form onSubmit={formik.handleSubmit}>
                                <br />
                                <label htmlFor="name">Category: </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                />

                                {formik.touched.name && formik.errors.name ? (
                                    <div>{formik.errors.name}</div>
                                ) : null}

                                <br /> <br />
                                <label htmlFor="imageUrl">Image Url</label>
                                <input
                                    id="imageUrl"
                                    name="imageUrl"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.imageUrl}
                                />

                                {formik.touched.imageUrl && formik.errors.imageUrl ? (
                                    <div>{formik.errors.imageUrl}</div>
                                ) : null}

                                <button type="submit">Submit</button>
                            </form>

                            <div className="user">
                                <h3>Photos Contributor</h3>
                                {user.slice(1,16).map(item => {
                                    return (
                                        <div className="card-user">
                                            <img src={item.profilePictureUrl} alt="" className="img-fluid img-user"/>
                                            <p>{item.name}</p>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>

                    </div>
                </div>





            </div>
        </>
    )
}

export default PhotosSharing