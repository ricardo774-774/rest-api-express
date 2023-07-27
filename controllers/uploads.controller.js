const path = require('path');
const fs = require('fs');
const { response, request } = require('express');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { uploadFile } = require('../helpers/upload-file.helper');
const { User, Product } = require('../models');

const loadFile = async (req = request, res = response) => {

    try {
        // const name = await uploadFile(req.files, ['txt', 'md', 'pdf'], 'text');
        const name = await uploadFile(req.files, undefined, 'img');
        return res.json({
            name,
        });

    } catch (msg) {
        return res.status(400).json({
            msg
        });
    }
}

const updateImg = async (req = request, res = response) => {
    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No users found with ${id} as id`
                });
            }
        break;

        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No products found with ${id} as id`
                });
            }
        break;

        default:
            return res.status(500).json({
                msg: 'Route in Progress'
            })
    }

    // Clear preview images
    if (model.img) {
        // Delete pre img
        const pathImg = path.join(__dirname, '../uploads', collection, model.img);
        if (fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg);
        }
    }

    try {
        const name = await uploadFile(req.files, undefined, collection );
        model.img = name;
        await model.save();
        res.json(model);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Error Updating Img',
            error: err,
        });
    }
}

const updateImgCloudinary = async (req = request, res = response) => {
    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No users found with ${id} as id`
                });
            }
        break;

        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No products found with ${id} as id`
                });
            }
        break;

        default:
            return res.status(500).json({
                msg: 'Route in Progress'
            })
    }

    // Clear preview images
    if (model.img) {
        // Delete pre img
       const nameArr = model.img.split('/');
       const name = nameArr[nameArr.length - 1];
       const [ public_id ] = name.split('.');
       await cloudinary.uploader.destroy(public_id);
    }

    try {
        const { tempFilePath } =  req.files.file;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
        model.img = secure_url;
        await model.save();
        res.json(model);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error saving image, try later'
        });
    }
    
}

const getImg = async (req = request, res = response) => {
    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No users found with ${id} as id`
                });
            }
        break;

        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No products found with ${id} as id`
                });
            }
        break;

        default:
            return res.status(500).json({
                msg: 'Route in Progress'
            })
    }

    // Clear preview images
    if (model.img) {
        // Get img
        const pathImg = path.join(__dirname, '../uploads', collection, model.img);
        if (fs.existsSync(pathImg)) {
            return res.sendFile(pathImg)
        }
    }

    // Default Img
    const defaultImg = path.join(__dirname, '../assets/no-image.jpg');
    return res.sendFile(defaultImg);

}

module.exports = {
    updateImgCloudinary,
    loadFile,
    updateImg,
    getImg,
}