import { Offer } from '../../entities/offer';
import { HttpError } from '../../types/http.error';
import { OfferModel } from './offers.mongo.model.js';
import { OffersMongoRepo } from './offers.mongo.repo.js';

jest.mock('./offers.mongo.model.js');

describe('Given OffersMongoRepo class', () => {
  let repo: OffersMongoRepo;
  beforeEach(() => {
    const mockQueryMethodFindOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([] as Offer[]),
    });
    const mockQueryMethodFind = jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue([] as Offer[]),
        }),
      }),
    });
    const mockQueryMethodFindById = jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({} as Offer),
      }),
    });
    const mockQueryMethodFindByIdAndUpdate = jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({} as Offer),
      }),
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
  describe('When I call method without errors', () => {
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
      OfferModel.find = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([] as Offer[]),
      });
      const result = await repo.getByCategory('mobiles');
      expect(OfferModel.find).toHaveBeenCalled();
      expect(result).toEqual(resultValue);
    });
    test('getByUser', async () => {
      OfferModel.find = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([] as Offer[]),
      });
      const resultValue = [] as Offer[];
      const result = await repo.getByUser('1');
      expect(OfferModel.find).toHaveBeenCalled();
      expect(result).toEqual(resultValue);
    });
    test('create', async () => {
      const resultValue = {} as Offer;
      const mockUserID = { author: { id: '1' } } as unknown as Offer;

      const result = await repo.create(mockUserID as Omit<Offer, 'id'>);
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

  describe('When I call method with errors', () => {
    test('getById', async () => {
      const mockError = new HttpError(404, 'Not Found', 'Not possible');

      OfferModel.findById = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(null),
        }),
      });

      const mockIdOffer = 'unknown-id';
      await expect(repo.getById(mockIdOffer)).rejects.toThrow(mockError);
    });

    test('getByCategory', async () => {
      const mockError = new HttpError(404, 'Not Found', 'Not possible');

      OfferModel.find = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      const mockIdOffer = 'unknown-category';
      await expect(repo.getByCategory(mockIdOffer)).rejects.toThrow(mockError);
    });

    test('getByUser', async () => {
      const mockError = new HttpError(404, 'Not Found', 'Not possible');

      OfferModel.find = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      const mockIdOffer = 'unknown-user';
      await expect(repo.getByUser(mockIdOffer)).rejects.toThrow(mockError);
    });

    test('create without userID', async () => {
      const mockUserID = { author: {} } as unknown as Offer;

      try {
        await repo.create(mockUserID as Omit<Offer, 'id'>);
        throw new HttpError(400, 'Bad Request', 'Author ID is missing');
      } catch (error) {
        const httpError = error as HttpError;
        expect(httpError).toBeInstanceOf(HttpError);
        expect(httpError.status).toBe(400);
        expect(httpError.statusMessage).toBe('Bad Request');
        expect(httpError.message).toBe('Author ID is missing');
      }
    });
    test('update not equal id', async () => {
      const mockIdOffer = '2';
      const mockUpdatedItem = { id: '2' };

      try {
        await repo.update(mockIdOffer, mockUpdatedItem as Partial<Offer>);
        throw new HttpError(406, 'Not Acceptable', 'Id not match');
      } catch (error) {
        const httpError = error as HttpError;
        expect(httpError).toBeInstanceOf(HttpError);
        expect(httpError.status).toBe(406);
        expect(httpError.statusMessage).toBe('Not Acceptable');
        expect(httpError.message).toBe('Id not match');
      }
    });

    test('update equal id', async () => {
      const mockIdOfferId = '2';
      const mockUpdatedItem = '2' as Partial<Offer>;
      const mockError = new HttpError(404, 'Not Found', 'Update not possible');

      OfferModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(null),
        }),
      });

      await expect(repo.update(mockIdOfferId, mockUpdatedItem)).rejects.toThrow(
        mockError
      );
    });

    test('delete', async () => {
      const mockError = new HttpError(404, 'Not Found', 'Delete not possible');

      const exec = jest.fn().mockResolvedValueOnce(false);
      OfferModel.findByIdAndDelete = jest.fn().mockReturnValue({
        exec,
      });

      const mockIdOffer = 'unknown-id';
      await expect(repo.delete(mockIdOffer)).rejects.toThrow(mockError);
    });
  });
});
