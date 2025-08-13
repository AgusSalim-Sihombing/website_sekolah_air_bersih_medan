import React, { useEffect, useState } from "react";
import { Carousel, Spinner } from "react-bootstrap";
import axios from "axios";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import "./CarouselBeranda.css";

const API_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const CarouselBerandaSma = () => {
    const [carouselItems, setCarouselItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCarouselItems();
    }, []);

    const fetchCarouselItems = async () => {
        try {
            const res = await axios.get(`${API_URL}/admin-sma/carousel-sma`);
            setCarouselItems(res.data);
        } catch (err) {
            console.error("Gagal mengambil data carousel:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (carouselItems.length === 0) {
        return <p className="text-center">Belum ada gambar carousel ditambahkan.</p>;
    }

    return (
        <>
            {/* Carousel Desktop */}
            <div className="carousel-desktop">
                <Carousel fade interval={3000} pause={false}>
                    {carouselItems.map((item, index) => (
                        <Carousel.Item key={index}>
                            <div className="carousel-wrapper">
                                <img
                                    src={`data:image/jpeg;base64,${item.gambar}`}
                                    alt={`Slide ${index + 1}`}
                                    className="carousel-image"
                                />
                            </div>
                            {item.judul && (
                                <Carousel.Caption>
                                    <h5>{item.judul}</h5>
                                    <p>{item.created_at ? format(new Date(item.created_at), "dd MMM yyyy", { locale: idLocale }) : "-"}</p>
                                </Carousel.Caption>
                            )}
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>

            {/* Carousel Mobile & Tablet */}
            <div className="carousel-mobile">
                <Carousel fade interval={3000} pause={false}>
                    {carouselItems.map((item, index) => (
                        <Carousel.Item key={index}>
                            <img
                                src={`data:image/jpeg;base64,${item.gambar}`}
                                alt={`Slide ${index + 1}`}
                                className="carousel-image-mobile"
                            />
                            {item.judul && (
                                <Carousel.Caption>
                                    <h6>{item.judul}</h6>
                                </Carousel.Caption>
                            )}
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </>
    );
};

export default CarouselBerandaSma;
