const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const controller = require('./controller.js');
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/qa/:product_id', controller.getQuestions);
app.get('/qa/:question_id/answers', controller.getAnswers);
app.post('/qa/questions', controller.addQuestion);
app.post('/qa/questions/:question_id/answers', controller.addAnswer);
app.put('/qa/questions/:question_id/helpful', controller.markQuestionHelpful);
app.put('/qa/questions/:question_id/report', controller.reportQuestion);
app.put('/qa/answers/:answer_id/helpful', controller.markAnswerHelpful);
app.put('/qa/answers/:answer_id/report', controller.reportAnswer);


app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
