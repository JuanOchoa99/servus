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
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };
  return (
    <div className="technology-slider">
      <Slider {...settings} className="technology-cards-slider">
        {items.map((item, index) => (
          <div key={index} className="px-2">
            <div className="px-5 py-6 bg-dark_grey bg-opacity-80 rounded-xl h-full min-h-[160px] flex flex-col">
              <div className="flex items-start gap-4 mb-6">
                {item.icon ? (
                  <div
                    className={`${item.background} rounded-full flex items-center justify-center w-16 h-16 flex-shrink-0`}
                  >
                    <Image
                      src={`${getImagePrefix()}${item.icon}`}
                      alt={`${item.title} logo`}
                      width={40}
                      height={40}
                      className="w-10 h-10 object-contain p-1"
                    />
                  </div>
                ) : (
                  <div
                    className={`${item.background} rounded-full flex items-center justify-center w-16 h-16 flex-shrink-0`}
                  >
                    <span className="text-white text-16 font-semibold">
                      {item.short}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-16 font-bold leading-tight mb-1">
                    {item.title}
                  </p>
                  <p className="text-white text-14 opacity-70 leading-tight">
                    {item.short}
                  </p>
                </div>
              </div>
              <div className="mt-auto">
                <p className="text-16 font-bold text-white leading-tight">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;
