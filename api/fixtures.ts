import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Place from './models/Place';
import Review from './models/Review';
import PlaceImage from './models/PlaceImage';
import {randomUUID} from 'crypto';

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('places');
        await db.dropCollection('reviews');
        await db.dropCollection('placeimages');
    } catch (e) {
        console.log('Collections not found, skipping drop...');
    }

    const [admin, user1, user2] = await User.create([
        {
            username: 'admin',
            password: '123',
            role: 'admin',
            token: randomUUID(),
        },
        {
            username: 'user',
            password: '123',
            role: 'user',
            token: randomUUID(),
        },
        {
            username: 'jane_smith',
            password: '123',
            role: 'user',
            token: randomUUID(),
        }
    ]);

    const [place1, place2] = await Place.create([
        {
            user: admin!._id,
            title: 'Chicken Star',
            description: 'The best Korean fried chicken in town!',
            mainImage: 'images/chicken.jpg',
        },
        {
            user: user1!._id,
            title: 'Bar X',
            description: 'A cozy place for craft beer lovers.',
            mainImage: 'images/bar.jpg',
        }
    ]);

    await PlaceImage.create([
        { user: admin!._id, place: place1!._id, image: 'images/chicken_interior.jpg' },
        { user: user1!._id, place: place2!._id, image: 'images/bar_night.jpg' }
    ]);

    await Review.create([
        {
            user: user1!._id,
            place: place1!._id,
            comment: 'Amazing food, but wait was long.',
            ratingFood: 5,
            ratingService: 3,
            ratingInterior: 4,
            datetime: new Date()
        },
        {
            user: user2!._id,
            place: place1!._id,
            comment: 'Love the atmosphere!',
            ratingFood: 4,
            ratingService: 5,
            ratingInterior: 5,
            datetime: new Date()
        }
    ]);

    console.log('Fixtures loaded successfully!');
    await mongoose.disconnect();
};

run().catch(console.error);