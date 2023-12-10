import { Offer } from '../../entities/offer';
import { OfferModel } from './offers.mongo.model.js';
// Import { HttpError } from '../../types/http.error.js';
import { OffersMongoRepo } from './offers.mongo.repo.js';

jest.mock('./offers.mongo.model.js');

describe('Given OffersMongoRepo class', () => {
  let repo: OffersMongoRepo;
  describe('When I call method without errors', () => {
    beforeEach(() => {
      const mockQueryMethodFindOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([] as Offer[]),
      });
      const mockQueryMethodFind = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([] as Offer[]),
      });
      const mockQueryMethodFindById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({} as Offer),
      });
      const mockQueryMethodFindByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({} as Offer),
      });

      const mockQueryMethodFindByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue('testDelete'),
      });
      OfferModel.findOne = mockQueryMethodFindOne;
      OfferModel.find = mockQueryMethodFind;
      OfferModel.findById = mockQueryMethodFindById;
      OfferModel.create = jest.fn().mockResolvedValue({} as Offer);
      OfferModel.findByIdAndUpdate = mockQueryMethodFindByIdAndUpdate;
      OfferModel.findByIdAndDelete = mockQueryMethodFindByIdAndDelete;
      repo = new OffersMongoRepo();
    });

    test('getAll', async () => {
      const resultValue = [] as Offer[];
      const result = await repo.getAll();
      expect(OfferModel.find).toHaveBeenCalled();
      expect(result).toEqual(resultValue);
    });
    test('getById', async () => {
      const resultValue = {} as Offer;
      const result = await repo.getById('1');
      expect(OfferModel.findById).toHaveBeenCalled();
      expect(result).toEqual(resultValue);
    });
    test('getByCategory', async () => {
      const resultValue = [] as Offer[];
      const result = await repo.getByCategory('mobiles');
      expect(OfferModel.find).toHaveBeenCalled();
      expect(result).toEqual(resultValue);
    });
    test('getByUser', async () => {
      const resultValue = [] as Offer[];
      const result = await repo.getByUser('1');
      expect(OfferModel.find).toHaveBeenCalled();
      expect(result).toEqual(resultValue);
    });
    test('create', async () => {
      const resultValue = {} as Offer;
      const result = await repo.create({} as Omit<Offer, 'id'>);
      expect(OfferModel.create).toHaveBeenCalled();
      expect(result).toEqual(resultValue);
    });
    test('update', async () => {
      const resultValue = {} as Offer;
      const result = await repo.update('1', {} as Partial<Offer>);
      expect(OfferModel.findByIdAndUpdate).toHaveBeenCalled();
      expect(result).toEqual(resultValue);
    });
    test('delete', async () => {
      const resultValue = undefined as unknown as void;
      const result = await repo.delete('1');
      expect(OfferModel.findByIdAndDelete).toHaveBeenCalled();
      expect(result).toEqual(resultValue);
    });
  });
  describe('When I call method without errors', () => {
    beforeEach(() => {
      const mockQueryMethodFindOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([] as Offer[]),
      });
      const mockQueryMethodFind = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([] as Offer[]),
      });
      const mockQueryMethodFindById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({} as Offer),
      });
      const mockQueryMethodFindByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({} as Offer),
      });

      const mockQueryMethodFindByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue('testDelete'),
      });
      OfferModel.findOne = mockQueryMethodFindOne;
      OfferModel.find = mockQueryMethodFind;
      OfferModel.findById = mockQueryMethodFindById;
      OfferModel.create = jest.fn().mockResolvedValue({} as Offer);
      OfferModel.findByIdAndUpdate = mockQueryMethodFindByIdAndUpdate;
      OfferModel.findByIdAndDelete = mockQueryMethodFindByIdAndDelete;
      repo = new OffersMongoRepo();
    });

    test('getAll', async () => {
      const resultValue = [] as Offer[];
      const result = await repo.getAll();
      expect(OfferModel.find).toHaveBeenCalled();
      expect(result).toEqual(resultValue);
    });
    test('getById', async () => {
      const resultValue = {} as Offer;
      const result = await repo.getById('1');
      expect(OfferModel.findById).toHaveBeenCalled();
      expect(result).toEqual(resultValue);
    });
    test('getByCategory', async () => {
      const resultValue = [] as Offer[];
      const result = await repo.getByCategory('mobiles');
      expect(OfferModel.find).toHaveBeenCalled();
      expect(result).toEqual(resultValue);
    });
    test('getByUser', async () => {
      const resultValue = [] as Offer[];
      const result = await repo.getByUser('1');
      expect(OfferModel.find).toHaveBeenCalled();
      expect(result).toEqual(resultValue);
    });
    test('create', async () => {
      const resultValue = {} as Offer;
      const result = await repo.create({} as Omit<Offer, 'id'>);
      expect(OfferModel.create).toHaveBeenCalled();
      expect(result).toEqual(resultValue);
    });
    test('update', async () => {
      const resultValue = {} as Offer;
      const result = await repo.update('1', {} as Partial<Offer>);
      expect(OfferModel.findByIdAndUpdate).toHaveBeenCalled();
      expect(result).toEqual(resultValue);
    });
    test('delete', async () => {
      const resultValue = undefined as unknown as void;
      const result = await repo.delete('1');
      expect(OfferModel.findByIdAndDelete).toHaveBeenCalled();
      expect(result).toEqual(resultValue);
    });
  });
});
