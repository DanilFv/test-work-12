export interface IUserFields {
    _id: string;
    username: string;
    role: 'user' | 'admin';
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        };
    },
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}

export interface RegisterMutation {
    username: string;
    password: string;
}

export interface RegisterResponse {
    user: IUserFields;
    message: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface IPlace {
    _id: string;
    title: string;
    description: string;
    mainImage: string | null;
    overallRating: number;
    reviewCount: number;
    user: string;
    imageCount: number;
}

export interface IPlaceImage {
    _id: string;
    image: string;
    user: string;
}

export interface IReview {
    _id: string;
    user: {
        _id: string;
        username: string;
    };
    place: string;
    comment: string;
    ratingFood: number;
    ratingService: number;
    ratingInterior: number;
    datetime: string;
}

export interface IPlaceFull extends IPlace {
    reviews: IReview[];
    gallery: IPlaceImage[];
    averageFood: number;
    averageService: number;
    averageInterior: number;
}

export interface ReviewMutation {
    comment: string;
    ratingFood: number;
    ratingService: number;
    ratingInterior: number;
}

export interface PlaceMutation {
    title: string;
    description: string;
    mainImage: File | null;
    agreement: boolean;
}