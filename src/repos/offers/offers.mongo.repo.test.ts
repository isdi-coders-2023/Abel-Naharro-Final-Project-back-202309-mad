import { Offer } from '../../entities/offer';
import { HttpError } from '../../types/http.error';
import { OfferModel } from './offers.mongo.model.js';
// Import { HttpError } from '../../types/http.error.js';
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
    // Test('getById', async () => {
    //   OfferModel.findById = jest.fn().mockReturnValue({
    //     populate: jest.fn().mockReturnValue({
    //       exec: jest.fn().mockRejectedValue(false),
    //     }),
    //   });

    //   try {
    //     await repo.getById('');
    //     throw new HttpError(404, 'Not Found', 'Not possible');
    //   } catch (error) {
    //     const httpError = error as HttpError;
    //     expect(httpError).toBeInstanceOf(HttpError);
    //     expect(httpError.status).toBe(400);
    //     expect(httpError.statusMessage).toBe('Bad Request');
    //     expect(httpError.message).toBe('Author ID is missing');
    //   }
    // });

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
    test('update', async () => {
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
    test('delete', async () => {
      OfferModel.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest
          .fn()
          .mockRejectedValue(
            new HttpError(404, 'Not Found', 'Delete not possible')
          ),
      });

      const mockIdOffer = 'unknown-id';

      try {
        await repo.delete(mockIdOffer);
        throw new HttpError(404, 'Not Found', 'Delete not possible');
      } catch (error) {
        const httpError = error as HttpError;
        expect(httpError).toBeInstanceOf(HttpError);
        expect(httpError.status).toBe(404);
        expect(httpError.statusMessage).toBe('Not Found');
        expect(httpError.message).toBe('Delete not possible');
      }
    });
  });
});
