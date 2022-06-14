const models = require('./models');

exports.getQuestions = (req, res) => {
  models
    .getQuestions(req.params.product_id)
    .then((data) => {
      res.status(200).json(data[0][0].json_build_object);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}

exports.getAnswers = (req, res) => {
  models
    .getAnswers(req.params.question_id)
    .then((data) => {
      let result = {
        'question': req.params.question_id,
        'page': req.query.page,
        'count': req.query.count,
        'results': data[0][0].array_to_json
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}

exports.addQuestion = (req, res) => {
  models
    .addQuestion(req.query.body, req.query.name, req.query.email, req.query.product_id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}

exports.addAnswer = (req, res) => {
  models
    .addAnswer(req.params.question_id, req.query.body, req.query.name, req.query.email)
    .then(() => {
      models.addPhotos(req.query.photos);
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}

exports.markQuestionHelpful = (req, res) => {
  console.log(req.params.question_id)
  models
    .markQuestionHelpful(req.params.question_id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}

exports.reportQuestion = (req, res) => {
  models
    .reportQuestion(req.params.question_id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}

exports.markAnswerHelpful = (req, res) => {
  models
    .markAnswerHelpful(req.params.answer_id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}

exports.reportAnswer = (req, res) => {
  models
    .reportAnswer(req.params.answer_id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}