const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get back all questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.json({message: err});
    }
});

// Post a question
router.post('/', async (req, res) => {
    const question = new Question({
        topic: req.body.topic,
        question: req.body.question,
        answerOptions: req.body.answerOptions
        });
    try {
        const savedQuestion = await question.save();
        res.json(savedQuestion);
    } catch (err) {
        res.json({message: err});
    }
});

// Get a specific question
router.get('/:topic', async (req, res) => {
    try {
        const questions = await Question.find({topic: req.params.topic});
        res.json(questions);
    } catch (err) {
        res.json({message: err});
    }
});

// Delete a specific question
router.delete('/:id', async (req, res) => {
    try {
        const removedQuestion = await Question.findByIdAndRemove(req.params.id);
        res.json(removedQuestion);
    } catch (err) {
        res.json({message: err});
    }
});

// Update a question
router.patch('/:id', async (req, res) => {
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(
            req.params.id,
            {topic: req.body.topic,
            question: req.body.question,
            answerOptions: req.body.answerOptions}
            );
        res.json(updatedQuestion);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;