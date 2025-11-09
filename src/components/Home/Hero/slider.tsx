import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TechnologyCard } from "@/app/api/data";
import Image from "next/image";
import { getImagePrefix } from "@/utils/utils";

type CardSliderProps = {
  items: TechnologyCard[];
  autoplaySpeed?: number;
  slidesToShow?: number;
};

const CardSlider = ({
  items,
  autoplaySpeed = 1500,
  slidesToShow = 4,
}: CardSliderProps) => {
  const settings = {
    autoplay: true,
    dots: false,
    arrows: false,
    infinite: true,
    autoplaySpeed,
    speed: 300,
    slidesToShow,
    slidesToScroll: 1,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: Math.min(slidesToShow, 2),
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow,
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} className="pr-6">
            <div className="px-5 py-6 bg-dark_grey bg-opacity-80 rounded-xl">
              <div className="flex items-center gap-5">
                <div
                  className={`${item.background} rounded-full flex items-center justify-center w-16 h-16`}
                >
                  <Image
                    src={`${getImagePrefix()}${item.icon}`}
                    alt="icon"
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <p className="text-white text-xs font-normal ">
                  <span className="text-16 font-bold mr-2">{item.title}</span>
                  {item.short}
                </p>
              </div>
              <div className="flex items-center mt-7">
                <div>
                  <p className="text-16 font-bold text-white mb-0 leading-none">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;
