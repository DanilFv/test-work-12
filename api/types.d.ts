import {Types} from 'mongoose';

export interface UserFields {
    username: string;
    password: string;
    token: string;
    role: string;
}

export interface PlaceFields {
    user: Types.ObjectId;
    title: string;
    description: string;
    mainImage: string;
}

export interface ReviewFields {
    user: Types.ObjectId;
    place: Types.ObjectId;
    comment: string;
    ratingFood: number;
    ratingService: number;
    ratingInterior: number;
    datetime: Date;
}

export interface PlaceImageFields {
    user: Types.ObjectId;
    place: Types.ObjectId;
    image: string;
}