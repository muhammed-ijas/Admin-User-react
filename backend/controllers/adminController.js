import expressAsyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import { User } from '../models/userModel.js'
import generateToken from "../utils/generateToken.js";

const authAdmin = expressAsyncHandler(async (req, res) => {
    console.log('on login ');

    const { email, password } = req.body
    const admin = await Admin.findOne({ email });

    if (!admin) {
        throw new Error('admin do not exist')
    }

    if (admin && (await admin.matchpassword(password))) {
        generateToken(res, admin._id, true)
        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
        });
    } else {
        res.status(400)
        throw new Error('incorrect password try again !')
    }

})


//////// register a admin ///////

const registerAdmin = expressAsyncHandler(async (req, res) => {
    console.log('name register');
    const { name, email, password } = req.body;
    const adminExist = await Admin.findOne({ email });
    if (adminExist) {
        res.status(400);
        throw new Error('admin already exists')
    } else {
        const admin = await Admin.create({
            name,
            email,
            password,
        })
        if (admin) {
            generateToken(res, admin._id, true)
            res.status(201).json({
                _id: admin._id,
                name: admin.name,
                email: admin.email,
            })
        } else {
            res.status(400)
            throw new Error('invalid admin data');
        }
    }
})


const logoutAdmin = expressAsyncHandler(async (req, res) => {
    console.log('on logout');
    res.cookie('admin', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'Logout admin' })
})



const getAllUsers = expressAsyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});


const deleteUser = expressAsyncHandler(async (req, res) => {
    const userId = req.body._id;
    const deleteUser = await User.findByIdAndDelete(userId)
    if (deleteUser) {
        res.status(201).json({ _id: deleteUser._id })
    } else {
        res.status(400);
        throw new Error("User not found");
    }
})


const addUser = expressAsyncHandler(async (req, res) => {
    console.log('on admin user ');
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
})



const editUser = expressAsyncHandler(async (req, res) => {
    console.log(req.body._id);
    const user = await User.findById(req.body._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.image = req.file?.filename || user.image;
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            image: updatedUser.image,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})

const getUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (user) {
        const UserDetails = {
            name: user.name,
            email: user.email,
            image: user.image,
        };
        res.status(200).json(UserDetails);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

export {
    authAdmin,
    registerAdmin,
    logoutAdmin,
    getAllUsers,
    deleteUser,
    addUser,
    editUser,
    getUser
}