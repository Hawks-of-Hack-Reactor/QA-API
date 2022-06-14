const db = require('./db.js');

exports.getQuestions = (id) => {
  return db.query(`
  SELECT json_build_object('product_id', ${id}, 'results', array_to_json(array_agg(json_build_object('question_id', id, 'question_body', body, 'question_date', date_written, 'asker_name', asker_name, 'question_helpfulness', helpful, 'reported', reported, 'answers', (
    SELECT json_object_agg(id, tmp)
    FROM (
    SELECT id as id, json_build_object('id', id, 'body', body, 'date', to_char(to_timestamp(date_written::double precision/1000), 'YYYY-MM-DDThh24:mi:ss.msZ'), 'answerer_name', answerer_name,
    'helpfulness', helpful, 'photos', (
    SELECT array_to_json(array_agg(json_build_object('id', id, 'url', url)))
    FROM "Photos"
    WHERE answer_id = a.id)) AS tmp
    FROM "Answers" as a
    WHERE question_id = q.id) s)))))
    FROM "Questions" as q
    WHERE product_id = ${id}`);
};

exports.getAnswers = (id) => {
  return db.query(`
  SELECT array_to_json(array_agg(json_build_object('answer_id', id, 'body', body, 'date', to_char(to_timestamp(date_written::double precision/1000), 'YYYY-MM-DDThh24:mi:ss.msZ'), 'answerer_name', answerer_name,
  'helpfulness', helpful, 'photos', (
  SELECT array_to_json(array_agg(json_build_object('id', id, 'url', url)))
  FROM "Photos"
  WHERE answer_id = a.id))))
  FROM "Answers" as a
  WHERE question_id = ${id}`);
};

exports.addQuestion = (body, name, email, product_id) => {
  let date = new Date().getTime();
  return db.query(`
  INSERT INTO "Questions" (id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
  VALUES (DEFAULT, ${product_id}, '${body}', ${date}, '${name}', '${email}', false, 0)
  `);
}

exports.addAnswer = (question_id, body, name, email) => {
  let date = new Date().getTime();
  return db.query(`
  INSERT INTO "Answers" (id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
  VALUES (DEFAULT, ${question_id}, '${body}', ${date}, '${name}', '${email}', false, 0)
  `);
}

exports.addPhotos = (data) => {
  let photos = JSON.parse(data);
  if (photos.length > 0) {
    photos.map((photo) => {
      return db.query(`
      INSERT INTO "Photos" (id, answer_id, url)
      VALUES (DEFAULT, (SELECT max(id) FROM "Answers"), '${photo}')
      `);
    });
  }
}

exports.markQuestionHelpful = (question_id) => {
  return db.query(`
  UPDATE "Questions"
  SET helpful = helpful+1
  WHERE id = ${question_id}
  `);
}

exports.reportQuestion = (question_id) => {
  return db.query(`
  UPDATE "Questions"
  SET reported = true
  WHERE id = ${question_id}
  `);
}

exports.markAnswerHelpful = (answer_id) => {
  return db.query(`
  UPDATE "Answers"
  SET helpful = helpful+1
  WHERE id = ${answer_id}
  `);
}

exports.reportAnswer = (answer_id) => {
  return db.query(`
  UPDATE "Answers"
  SET reported = true
  WHERE id = ${answer_id}
  `);
}
