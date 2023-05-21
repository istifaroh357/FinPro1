import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbarr from '../Components/Navbarr';
import './Blog.css'

const Blog = () => {
    const [dataActivity, setDataActivity] = useState([]);
    const [dataActivityById, setDataActivityById] = useState([]);

    useEffect(() => {
        axios
            .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities",
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                    }
                })
            .then(function (response) {
                console.log(response)
                setDataActivity(response.data.data)
            })
    }, [])


    useEffect(() => {
        axios
            .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/7668392f-9fdb-4a1b-bfb5-6a06d2f9708c",
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                    }
                })
            .then(function (response) {
                console.log(response)
                setDataActivityById(response.data.data)
            })
    }, [])

    const formik = useFormik({
        initialValues: {
            categoryId: '',
            title: '',
            description: '',
            imageUrls: '',
            price: '',
            price_discount: "",
            rating: '',
            total_reviews: '',
            facilities: '',
            address: '',
            province: '',
            city: '',
            location_maps: ''
        },

        validationSchema: Yup.object({
            categoryId: Yup.string().required("Required"),
            title: Yup.string().required("Required"),
            description: Yup.string().required("Required"),
            imageUrls: Yup.string().required("Required"),
            price: Yup.number().required("Required"),
            price_discount: Yup.number().required("Required"),
            rating: Yup.number().required("Required"),
            total_reviews: Yup.number().required("Required"),
            facilities: Yup.string().required("Required"),
            address: Yup.string().required("Required"),
            province: Yup.string().required("Required"),
            city: Yup.string().required("Required"),
            location_maps: Yup.string().required("Required")
        }),

        onSubmit: values => {

            const categoryId = values.categoryId;
            const title = values.title;
            const description = values.description;
            const imageUrls = values.imageUrls;
            const price = values.price;
            const price_discount = values.price_discount;
            const rating = values.rating;
            const total_reviews = values.total_reviews;
            const facilities = values.facilities;
            const address = values.address;
            const province = values.province;
            const city = values.city;
            const location_maps = values.location_maps;

            alert(JSON.stringify(values, null, 13));
            console.log(values);

            axios.post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-activity",
                {
                    categoryId: categoryId,
                    title: title,
                    description: description,
                    imageUrls: imageUrls,
                    price: price,
                    price_discount: price_discount,
                    rating: rating,
                    total_reviews: total_reviews,
                    facilities: facilities,
                    address: address,
                    province: province,
                    city: city,
                    location_maps: location_maps
                },
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"
                    }
                })
                .then(function (response) {
                    // console.log(response)
                    handleGetAllData
                })
                .catch(err => console.log(err));
        }
    })

    const handleDelete = (id) => {
        axios
            .delete(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-activity/${id}`,
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"
                    }
                })
    }


    const handleEdit = (id) => {
        axios
            .post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${id}`,
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"
                    }
                })
    }


    return (
        <>
            <Navbarr />
            <div className='recommendation-blog'>
                <h1>Recommendation blog to read this week!</h1>
                <h3>{dataActivityById.title}</h3>
                <img src={dataActivityById.imageUrls} alt="" className='img-fluid img-recommendation-blog' />
                <p>Description: {dataActivityById.description}</p>
                <p>Rating: {dataActivityById.rating}    Total reviews: {dataActivityById.total_reviews}</p>
                <p>Address: {dataActivityById.address}, {dataActivityById.city}, {dataActivityById.province}</p>
                <p>Price: {dataActivityById.price}</p>
                <p>Discount: {dataActivityById.price_discount}</p>
            </div>

            <h1>Anothers interesting blogs for you!</h1>
            <div className='display-blog-container'>
                <div className='display-blog'>
                    {dataActivity.map(item => {
                        return (
                            <div className='card-display-blog' key={item.id}>
                                <div>{item.title}</div>
                                <img src={item.imageUrls} alt="" className='img-fluid img-display-blog' />
                                <div>Rating: {item.rating}</div>
                                <div>Total reviews: {item.total_reviews}</div>
                                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${item.id}`}>Show More</button> <br />
                                <button className='btn btn-warning' onClick={() => handleEdit(item.id)}>Edit</button>
                                <button onClick={() => handleDelete(item.id)} className='btn btn-danger'>Delete</button>

                                {/* Modal content show mmore */}

                                <div className="modal fade" id={item.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Sign In</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">

                                                <div className='card-display-blog' key={item.id}>
                                                    <div>{item.title}</div>
                                                    <div>{item.rating}</div>
                                                    <div>Total reviews: {item.total_reviews}</div>
                                                    <img src={item.imageUrls} alt="" className='img-fluid img-display-blog' />
                                                    <div>Description: <br />{item.description}</div>
                                                    <div>Adrress : {item.address}, {item.city}, {item.province}</div>
                                                    <div>Price :  {item.price}</div>
                                                    <div>Discount: {item.price_discount}</div>
                                                    <div></div>
                                                </div>

                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className='form-create-blog'>
                    <h3>Create your blog here!</h3>
                    <form onSubmit={formik.handleSubmit}>

                        <label htmlFor="categoryId">Category Id</label>
                        <input
                            id="categoryId"
                            name="categoryId"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.categoryId}
                        />
                        {formik.touched.categoryId && formik.errors.categoryId ? (
                            <div>{formik.errors.categoryId}</div> // kasih className untuk atur tampilan erorr
                        ) : null}

                        <br /><br />
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
                        <label htmlFor="imageUrls">Image Urls</label> <br />
                        <input
                            id="imageUrls"
                            name="imageUrls"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.imageUrls}
                        />

                        <br /><br />
                        <label htmlFor="price">Price</label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            onChange={formik.handleChange}
                            value={formik.values.price}
                        />

                        <br /><br />
                        <label htmlFor="rating">Rating</label>
                        <input
                            id="rating"
                            name="rating"
                            type="number"
                            onChange={formik.handleChange}
                            value={formik.values.rating}
                        />


                        <br /><br />
                        <label htmlFor="total_reviews">Total Reviews</label>
                        <input
                            id="total_reviews"
                            name="total_reviews"
                            type="number"
                            onChange={formik.handleChange}
                            value={formik.values.total_reviews}
                        />


                        <br /><br />
                        <label htmlFor="facilities">Facilities</label>
                        <input
                            id="facilities"
                            name="facilities"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.facilities}
                        />


                        <br /><br />
                        <label htmlFor="address">Address</label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.address}
                        />


                        <br /><br />
                        <label htmlFor="province"> Province</label>
                        <input
                            id="province"
                            name="province"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.province}
                        />


                        <br /><br />
                        <label htmlFor="city">City</label>
                        <input
                            id="city"
                            name="city"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.city}
                        />


                        <br /><br />
                        <label htmlFor="location_maps">Location Maps</label>
                        <input
                            id="location_maps"
                            name="location_maps"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.location_maps}
                        />

                        <br /><br />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Blog