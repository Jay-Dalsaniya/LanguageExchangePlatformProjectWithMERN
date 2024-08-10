import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/courseSlice';

const category = [
    "English",
    "Spanish",
    "French",
    "German",
    "Mandarin",
    "Hindi",
    "Japanese"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchCourseHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem 
                                key={index} 
                                className="basis-full md:basis-1/2 lg:basis-1/3 px-2">
                                <Button 
                                    onClick={() => searchCourseHandler(cat)} 
                                    variant="outline" 
                                    className="w-full rounded-full text-center">
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel;
