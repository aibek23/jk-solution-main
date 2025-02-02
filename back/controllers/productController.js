const { Product, Company } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');


class ProductController {
    async create(req, res, next) {
        try {
            const { title, ean, description, characteristics, price, isPopular, CompanyId } = req.body;
            const { image } = req.files;
            let fileName = uuid.v4() + '.jpg';
            image.mv(path.resolve(__dirname, '..', 'static', fileName));
            const data = await Product.create({
                title,
                ean,
                description,
                characteristics,
                price,
                isPopular,
                CompanyId,
                image: fileName
            });
            return res.json(data);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const data = await Product.findAll({
            include: [
                {
                    model: Company,
                    as: 'Company',
                    attributes: [ 'name', 'image' ]
                }
            ]
        });
        return res.json(data);
    }

    async deleteOne(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await Product.destroy({ where: { id } });
            if (deleted) {
                return res.json({ message: 'Deleted successfully' });
            }
            throw new Error('Product not found');
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new ProductController();
