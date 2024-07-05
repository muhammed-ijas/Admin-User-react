import expressAsyncHandler from "express-async-handler";
import { User } from '../models/userModel.js'
import generateToken from "../utils/generateToken.js";

const authUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('user do not exist');

    }
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            image : user.image
        });

    } else {
        res.status(400)
        throw new Error('incorrect password try again !');
    }
});



const registerUser = expressAsyncHandler(async (req, res) => {


    const { name, email, password } = req.body;
    const image = req.file.filename
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
        res.status(400);
        throw new Error('user already exists')
    }
    const user = await User.create({
        name,
        email,
        image,
        password,
    });

    if (User) {
        generateToken(res, user._id)

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image
        });

    } else {
        res.status(400)
        throw new Error('invalid user data');
    }

});



const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'Logout User' })
}


const getUserProfile = expressAsyncHandler(async (req, res) => {
    const { _id, name, email, image } = await User.findById(req.user._id);
    res.json({
        _id,
        name,
        email,
        image
    });
    res.status(404);
    throw new Error('user not found');
})



const updateUserProfile = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.image = req.file?.filename || user.image;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            image: updatedUser.image
        });

    } else {
        res.status(404);
        throw new Error('user not found')
    }
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}