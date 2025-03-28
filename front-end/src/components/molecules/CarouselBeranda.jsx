// import Carousel from 'react-bootstrap/Carousel';
// import Foto from "../../assets/image.png"
// import Foto2 from "../../assets/image2.png"

// const CarouselBeranda = () => {
//     return (
//         <Carousel style={{ top: "30px" }}>
//             <Carousel.Item>
//                 <img
//                     className="d-block w-100"
//                     src={Foto}
//                     alt="First slide"

//                 />
//             </Carousel.Item>
//             <Carousel.Item>
//                 <img
//                     className="d-block w-100"
//                     src={Foto2}
//                     alt="Second slide"
//                 />

//             </Carousel.Item>
//             <Carousel.Item>
//                 <img
//                     className="d-block w-100"
//                     src={Foto}
//                     alt="Third slide"
//                 />

//             </Carousel.Item>
//         </Carousel>
//     )
// }

// export default CarouselBeranda;

import Carousel from 'react-bootstrap/Carousel';
import Foto from "../../assets/image.png";
import Foto2 from "../../assets/image2.png";
import "./CarouselBeranda.css"; // Pastikan file CSS sudah di-import

const CarouselBeranda = () => {
    return (
        <Carousel className="carousel-3d" style={{ top: "30px" }}>
            <Carousel.Item>
                <img
                    // className="d-block w-100"
                    src={Foto}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    // className="d-block w-100"
                    src={Foto2}
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    // className="d-block w-100"
                    src={Foto}
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    );
};

export default CarouselBeranda;
