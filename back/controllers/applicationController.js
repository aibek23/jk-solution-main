const { Application, Product, Company } = require('../models/models');
const ApiError = require('../error/ApiError');


class ApplicationController {
  async create(req, res, next) {
    try {
      const { name, phone, processed,paymentMethod, approved, ProductId } = req.body;
      const data = await Application.create({
        name, phone, processed,paymentMethod, approved, ProductId
      });
      return res.json(data);
    } catch(e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const data = await Application.findAll({
      order: [
        [ 'processed', 'ASC' ],
        [ 'createdAt', 'DESC' ]
      ],
      include: [
        {
          model: Product,
          as: 'Product',
          attributes: [ 'title', 'ean', 'description', 'characteristics', 'price', 'isPopular', 'CompanyId' ],
          include: [
            {
              model: Company,
              as: 'Company',
              attributes: [ 'name', 'image' ]
            }
          ]
        }
      ],
    });
    return res.json(data);
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await Application.destroy({ where: { id } });
      if (deleted) {
        return res.json({ message: 'Deleted successfully' });
      }
      throw new Error('Application not found');
    } catch(e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateProcessed(req, res, next) {
    try {
      const { id } = req.params;
      const { processed } = req.body;

      const updatedApplication = await Application.update(
        { processed },
        { where: { id } }
      );

      if (updatedApplication[ 0 ] === 1) {
        return res.json({ message: 'Processed updated successfully' });
      } else {
        throw new Error('Application not found');
      }
    } catch(e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new ApplicationController();
