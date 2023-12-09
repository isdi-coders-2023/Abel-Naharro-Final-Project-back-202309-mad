import createDebug from 'debug';
// Import { HttpError } from '../../types/http.error.js';
import { Offer } from '../../entities/offer';
import { OfferModel } from './offers.mongo.model.js';
import { HttpError } from '../../types/http.error.js';
// Import { Vote } from '../../entities/vote.js';
const debugServer = createDebug('LOG:REPO:USERS');

export class OffersMongoRepo {
  constructor() {
    debugServer('Instantiated repo...');
  }

  async getAll(): Promise<Offer[]> {
    const result = await OfferModel.find().exec();
    return result;
  }

  async getById(id: string): Promise<Offer> {
    const result = await OfferModel.findById(id).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Not possible');
    return result;
  }

  async getByCategory(categoryName: string): Promise<Offer[]> {
    const result = await OfferModel.find({ category: categoryName }).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Not possible');
    return result;
  }

  async getByUser(userId: string): Promise<Offer[]> {
    const result = await OfferModel.find({ author: userId }).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Not possible');
    return result;
  }

  async create(offer: Omit<Offer, 'id'>): Promise<Offer> {
    debugServer('Repo create:', offer);
    const result: Offer = await OfferModel.create(offer);
    return result;
  }

  async update(id: string, updatedItem: Partial<Offer>): Promise<Offer> {
    if (id === updatedItem.id)
      throw new HttpError(406, 'Not Acceptable', 'Id not match');
    const result = await OfferModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    }).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await OfferModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }
  }
}
