import Navbarr from "../Components/Navbarr"
import axios from 'axios'
import { useEffect, useState } from "react"
import './Promo.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Promo = () => {

    const [diskon, setDiskon] = useState([])
    const [recommendationDiskon, setRecommendationDiskon] = useState([])

    // Handle Delete untuk update Promo
    const handleDelete = (id) => {
        axios
            .delete(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${id}`,
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"
                    }
                })
            .then(function (response) {
                axios
                    .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
                        {
                            headers: {
                                apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                            }
                        })
                    .then(function (response) {
                        console.log(response)
                        setDiskon(response.data.data)
                    })
            })
    }



    const handleEdit = (id) => {
        axios.post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${id}`,
            {
                title: "EDIT ",
                description: 'EDIT ',
                imageUrl: imageUrl,
                terms_condition: 'EDIT ',
                promo_code: 'EDIT ',
                promo_discount_price: 'EDIT ',
                minimum_claim_price: 'EDIT '
            },
            {
                headers: {
                    apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"
                }
            })
            .then(function (response) {
                console.log(response)
                axios
                    .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
                        {
                            headers: {
                                apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                            }
                        })
                    .then(function (response) {
                        console.log(response)
                        setDiskon(response.data.data)
                    })

            })

    }

    // Form untuk create Promo
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            imageUrl: '',
            terms_condition: '',
            promo_code: '',
            promo_discount_price: "",
            minimum_claim_price: ''
        },

        validationSchema: Yup.object({
            title: Yup.string().required('Required'),

            description: Yup.string().required('Required'),

            imageUrl: Yup.string().required('Required'),

            terms_condition: Yup.string().required('Required'),

            promo_code: Yup.string().required('Required'),

            promo_discount_price: Yup.number().required('Required'),

            minimum_claim_price: Yup.number().required('Required')
        }),

        onSubmit: values => {
            const title = values.title;
            const description = values.description;
            const imageUrl = values.imageUrl;
            const terms_condition = values.terms_condition;
            const promo_code = values.promo_code;
            const promo_discount_price = values.promo_discount_price;
            const minimum_claim_price = values.minimum_claim_price;

            // alert(JSON.stringify(values, null, 7));
            // console.log(values);
            axios.post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-promo",
                {
                    title: title,
                    description: description,
                    imageUrl: imageUrl,
                    terms_condition: terms_condition,
                    promo_code: promo_code,
                    promo_discount_price: promo_discount_price,
                    minimum_claim_price: minimum_claim_price
                },
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"
                    }
                })

                .then(function (response) {
                    axios
                        .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
                            {
                                headers: {
                                    apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                                }
                            })
                        .then(function (response) {
                            console.log(response)
                            setDiskon(response.data.data)
                        })
                })
                .catch(err => console.log(err));
        }
    })

    useEffect(() => {
        axios
            .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                    }
                })
            .then(function (response) {
                console.log(response)
                setDiskon(response.data.data)
            })
    }, [])

    useEffect(() => {
        axios
            .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/cd026ac8-74dc-4a2d-a38c-592bbc03ff5a",
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                    }
                })
            .then(function (response) {
                console.log(response)
                setRecommendationDiskon(response.data.data)
            })
    }, [])


    return (
        <>
            <Navbarr />
            <h1>Recomendation promos this week for Travel Addicter</h1>

            <div className="samping">
                <div className="box-card">
                    {diskon.map(item => {
                        return (
                            <div key={item.id} className="card-diskon">
                                <p>{item.title}</p>
                                {/* <p>{item.description}</p> */}
                                <img src={item.imageUrl} alt="" className="img-card-diskon img-fluid" />
                                <div>Description: {item.description}</div>
                                <div>Code: {item.promo_code}</div>
                                <button className="btn btn-warning" onClick={() => handleEdit(item.id)}>Edit Promo</button> <br />
                                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete Promo</button>
                            </div>
                        )
                    })}
                </div>

                    <div>
                        <h3>Create Promo</h3>

                        <form onSubmit={formik.handleSubmit}>

                            <label htmlFor="title">Title</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.title}
                            />
                            {formik.touched.title && formik.errors.title ? (
                                <div>{formik.errors.title}</div>
                            ) : null}

                            <br /><br />
                            <label htmlFor="description">Description</label>
                            <input
                                id="description"
                                name="description"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                            />
                            {formik.touched.description && formik.errors.description ? (
                                <div>{formik.errors.description}</div>
                            ) : null}


                            <br /><br />
                            <label htmlFor="imageUrl">Image url / link</label>
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

                            <br /><br />
                            <label htmlFor="terms_condition">Terms Condition</label> <br />
                            <input
                                id="terms_condition"
                                name="terms_condition"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.terms_condition}
                            />

                            <br /><br />
                            <label htmlFor="promo_code">Promo Code </label>
                            <input
                                id="promo_code"
                                name="promo_code"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.promo_code}
                            />

                            <br /><br />
                            <label htmlFor="promo_discount_price">Promo Discount Price</label>
                            <input
                                id="promo_discount_price"
                                name="promo_discount_price"
                                type="number"
                                onChange={formik.handleChange}
                                value={formik.values.promo_discount_price}
                            />

                            <br /><br />
                            <label htmlFor="minimum_claim_price">Minimum claim price</label>
                            <input
                                id="minimum_claim_price"
                                name="minimum_claim_price"
                                type="number"
                                onChange={formik.handleChange}
                                value={formik.values.minimum_claim_price}
                            />

                            <br /><br />
                            <button type="submit">Submit</button>
                        </form>
                    </div>
            </div>
        </>
    )
}

export default Promo


