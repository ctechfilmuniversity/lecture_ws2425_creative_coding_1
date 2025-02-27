import { Image as ImageType } from '@/lib/types';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface ImageGalleryProps {
  images: ImageType[];
  projectTitle: string;
}

const easeOutBounce = (x: number): number => {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
};

const ImageGallery: FC<ImageGalleryProps> = ({ images, projectTitle }) => {
  const [xtranslate, setXtranslate] = useState(10);
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    if (!animating) return;

    const startTime = performance.now();
    const duration = 1000;
    const startValue = 10;
    const endValue = 0;

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeOutBounce(progress);
      const currentValue = startValue + (endValue - startValue) * easedProgress;

      setXtranslate(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  }, [animating]);

  return (
    <Swiper
      modules={[Pagination]}
      className="h-[50lvh] md:h-[60lvh]"
      style={{
        transform: `translateX(${xtranslate}%) `,
      }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={image.src}>
          <Image
            src={image.src || '/placeholder.svg'}
            alt={`${projectTitle} Image ${index + 1}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={80}
            className="px-4 top-1/2 absolute -translate-y-1/2 object-contain max-h-[50lvh] md:max-h-[60lvh] h-full "
            width={image.size.width}
            height={image.size.height}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageGallery;
