import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useAppState } from "@/context/AppState";
import Autoplay from "embla-carousel-autoplay";

const CompanyCarousel = () => {
  const companies = [
    {
      name: "amazon",
      path: "/amazon.svg",
      id: 1,
    },
    {
      name: "atlassian",
      path: "/atlassian.svg",
      id: 2,
    },
    {
      name: "google",
      path: "/google.webp",
      id: 3,
    },
    {
      name: "ibm",
      path: "/ibm.svg",
      id: 4,
    },
    {
      name: "meta",
      path: "/meta.svg",
      id: 5,
    },
    {
      name: "microsoft",
      path: "/microsoft.webp",
      id: 6,
    },
    {
      name: "netflix",
      path: "/netflix.png",
      id: 7,
    },
    {
      name: "uber",
      path: "/uber.svg",
      id: 8,
    },
  ];

  const {isDarkMode} = useAppState();

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 1500,
        }),
      ]}
      className={`w-full ${isDarkMode ? 'bg-black' : ''} py-10`}
    >
      <CarouselContent className="flex gap-5 sm:gap-20 items-center">
        {companies.map(({ name, id, path }) => (
          <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
            <img
              src={path}
              alt={name}
              width={200}
              height={56}
              className="h-9 sm:h-14 w-auto object-contain"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CompanyCarousel;
