(function () {
  'use strict';

  module.exports = function (model, config) {
    var routes = {};
    config = config || {};
    var isAuthed = config.isAuthorized;

    routes.list = function (req, res, next) {
      if (isAuthed && isAuthed(req, res) === false) {
        res.send(401);
        return;
      }
      model.list(function (err, items) {
        if (err) {
          res.send(500);
          return;
        }
        res.send(items);
      });
    };

    routes.show = function (req, res, next) {
      if (isAuthed && isAuthed(req, res) === false) {
        res.send(401);
        return;
      }
      model.show(req.params.id, function (err, resource) {
        if (err) {
          res.send(500);
          return;
        }
        res.send(resource);
      });
    };

    routes.create = function (req, res, next) {
      if (isAuthed && isAuthed(req, res) === false) {
        res.send(401);
        return;
      }
      model.create(req.body, function (err, resource) {
        if (err) {
          res.send(500);
          return;
        }
        res.send(201, resource);
      });
    };

    routes.update = function (req, res, next) {
      if (isAuthed && isAuthed(req, res) === false) {
        res.send(401);
        return;
      }
      model.update(req.params.id, req.body, function (err, resource) {
        if (err) {
          res.send(500);
          return;
        }
        res.send(resource);
      });
    };

    routes.remove = function (req, res, next) {
      if (isAuthed && isAuthed(req, res) === false) {
        res.send(401);
        return;
      }
      model.remove(req.params.id, function (err) {
        if (err) {
          res.send(500);
          return;
        }
        res.send(200);
      });
    };

    return routes;
  };

}());
