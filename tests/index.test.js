const controller = require('../src/controllers/indexController');

const req = {};
req.body = jest.fn().mockReturnValue(req);
req.params = jest.fn().mockReturnValue(req);

const res = {};
res.send = jest.fn().mockReturnValue(res);
res.status = jest.fn().mockReturnValue(res);
res.json = jest.fn().mockReturnValue('aaa');

describe('Controller: Index', () => {
  test('should 200 and return correct value', () => {
    controller.getMessage(req, res);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send).toHaveBeenCalledWith({ title: 'membrane-backend-cc' });
  });
});
