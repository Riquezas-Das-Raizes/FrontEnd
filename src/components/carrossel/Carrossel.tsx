import "./Carrossel.css"
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import {Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

 function Carrossel (){

    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >

                <SwiperSlide>
                    <Link to="/acessorios">
                <img
                        className="swiper-slide-img" 
                        src="https://ik.imagekit.io/natashadev/Riqueza%20das%20Ra%C3%ADzes/1(1).jpg?updatedAt=1717596761613" 
                        alt="Carrossel - Slide 01 Conectando Tradição e  Modernidade em Cada Compra
                        " 
                    />
                    </Link>
                </SwiperSlide>

                <SwiperSlide>
                    <Link to="/artesaos">
                    <img
                        className="swiper-slide-img" 
                        src="https://ik.imagekit.io/natashadev/Riqueza%20das%20Ra%C3%ADzes/3(1).jpg?updatedAt=1717596761295" 
                        alt="Carrossel - Slide 02 Todos os produtos apresentados nesse trabalho são de artesãos reais e você pode conferir o trabalho deles na nossa página artesãos!" 
                    />
                    </Link>
                </SwiperSlide>

                <SwiperSlide>
                    <Link to='/artesanatos'>
                <img 
                    className="swiper-slide-img"
                    src="https://ik.imagekit.io/natashadev/Riqueza%20das%20Ra%C3%ADzes/Green%20Minimalist%20Nature%20Quotes%20Desktop%20Wallpaper.jpg?updatedAt=1717596886641" 
                    alt="Carrossel - Slide 03 Um e-commerce que oferece artesanato indigena focado em trazer uma renda justa para essas comunidades, aqui você encontra produtos autênticos!
                    " 
                />
                </Link>
                </SwiperSlide>

            </Swiper>
        </>
    )


 }

 export default Carrossel;