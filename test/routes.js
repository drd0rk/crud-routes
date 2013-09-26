(function () {
  'use strict';

  var should = require('should');
  var sinon = require('sinon');
  var routesModule = require('../bin/routes');

  describe('CRUD Routes', function () {
    var model, routes, req, res;
    var modelMock, reqMock, resMock;

    beforeEach(function () {
      model = {
        find: function () {},
        show: function () {},
        create: function () {},
        update: function () {},
        remove: function () {}
      };
      req = {
        params: {}
      };
      res = {
        send: function () {}
      };
      routes = routesModule(model);
      modelMock = sinon.mock(model);
      resMock = sinon.mock(res);
    });

    describe('.list()', function () {
      it('should call the model find() method once', function () {
        var findOnce = modelMock.expects('find').once();
        routes.list(req, res);
        findOnce.verify();
      });

      describe('on success', function () {
        it('should call res.send() with the items array', function () {
          var modelStub = sinon.stub(model, 'list');
          var sendOnce = resMock.expects('send').withArgs([]);
          routes.list(req, res);
          modelStub.callArgWith(0, null, []);
          sendOnce.verify();
        });
      });

      describe('on error', function () {
        it('should call res.send() with status 500', function () {
          var modelStub = sinon.stub(model, 'list');
          var send500 = resMock.expects('send').withArgs(500);
          routes.list(req, res);
          modelStub.callArgWith(0, new Error());
          send500.verify();
        });
      });
    });

    describe('.show()', function () {
      it('should call model.show() with the "id" parameter', function () {
        var modelCall = modelMock.expects('show').withArgs('1234567890');
        req.params.id = '1234567890';
        routes.show(req, res);
        modelCall.verify();
      });

      describe('on success', function () {
        it('should call res.send with the returned object', function () {
          var modelStub = sinon.stub(model, 'show');
          var sendObj = resMock.expects('send').withArgs({});
          req.params.id = '1234567890';
          routes.show(req, res);
          modelStub.callArgWith(1, null, {});
          sendObj.verify();
        });
      });

      describe('on error', function () {
        it('should call res.send() with status 500', function () {
          var modelStub = sinon.stub(model, 'show');
          var send500 = resMock.expects('send').withArgs(500);
          req.params.id = '1234567890';
          routes.show(req, res);
          modelStub.callArgWith(1, new Error());
          send500.verify();
        });
      });
    });

    describe('.create()', function () {
      it('should call model.create() with req.body', function () {
        var modelCall = modelMock.expects('create').withArgs({});
        req.body = {};
        routes.create(req, res);
        modelCall.verify();
      });

      describe('on success', function () {
        it('should call res.send() with status 201 and the created resource', function () {
          var modelStub = sinon.stub(model, 'create');
          var send201 = resMock.expects('send').withArgs(201, {});
          req.body = {};
          routes.create(req, res);
          modelStub.callArgWith(1, null, {});
          send201.verify();
        });
      });

      describe('on error', function () {
        it('should call res.send() with status 500', function () {
          var modelStub = sinon.stub(model, 'create');
          var send500 = resMock.expects('send').withArgs(500);
          req.body = {};
          routes.create(req, res);
          modelStub.callArgWith(1, new Error());
          send500.verify();
        });
      });
    });

    describe('.update()', function () {
      it('should call model.update with req.params.id and req.body', function () {
        var modelCall = modelMock.expects('update').withArgs('12345', {});
        req.body = {};
        req.params.id = '12345';
        routes.update(req, res);
        modelCall.verify();
      });

      describe('on success', function () {
        it('should call res.send() with status 200 and the returned resource', function () {
          var modelStub = sinon.stub(model, 'update');
          var send200 = resMock.expects('send').withArgs({});
          req.body = {};
          routes.update(req, res);
          modelStub.callArgWith(2, null, {});
          send200.verify();
        });
      });

      describe('on error', function () {
        it('should call res.send() with status 500', function () {
          var modelStub = sinon.stub(model, 'update');
          var send500 = resMock.expects('send').withArgs(500);
          req.body = {};
          routes.update(req, res);
          modelStub.callArgWith(2, new Error());
          send500.verify();
        });
      });
    });

    describe('.remove()', function () {
      it('should call model.remove with req.params.id', function () {
        var modelCall = modelMock.expects('remove').withArgs('12345');
        req.params.id = '12345';
        routes.remove(req, res);
        modelCall.verify();
      });

      describe('on success', function () {
        it('should call res.send() with status 200', function () {
          var modelStub = sinon.stub(model, 'remove');
          var send200 = resMock.expects('send').withArgs(200);
          routes.remove(req, res);
          modelStub.callArgWith(1, null);
          send200.verify();
        });
      });

      describe('on error', function () {
        it('should call res.send() with status 500', function () {
          var modelStub = sinon.stub(model, 'remove');
          var send500 = resMock.expects('send').withArgs(500);
          routes.remove(req, res);
          modelStub.callArgWith(1, new Error());
          send500.verify();
        });
      });
    });
  });

}());
