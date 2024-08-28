import {connect,set} from 'mongoose';
import { UserModel } from '../models/user.model.js';
import { FoodModel } from '../models/food.model.js';
import { sample_foods, sample_user } from '../data.js';
import bcrypt from 'bcryptjs';

const PASSWORD_HASH_SALT_ROUNDS = 10;
set('strictQuery',true);

export const dbconnect =async ()=>{
    try{
        connect(process.env.MONGO_URL,);
        await seedUsers();
        await seedFoods();
        console.log('connect successfully---');
    }catch(error){
        console.log(error);
    }
};

async function seedUsers(){
    const userCount = await UserModel.countDocuments();
    if(userCount>0){
        console.log('Users seed  is already done!');
        return;
    }
    for(let user of sample_user){
        user.password =await bcrypt.hash(user.password,PASSWORD_HASH_SALT_ROUNDS);
        await UserModel.create(user);
    }
    console.log('User seed is done!')
}

async function seedFoods(){
    const foods = await FoodModel.countDocuments();
    if(foods>0){
        console.log('Food seed is already done');
        return;

    }
    for(const food of sample_foods){
        food.imageUrl = `/foods/${food.imageUrl}`;
        await FoodModel.create(food);
    }
    console.log('food seed is done')
}

