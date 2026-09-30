const mongoose = require('mongoose');

const algorithmSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    codeSnippet: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      default: 'python',
    },
    category: {
      type: String,
      enum: [
        'Computational Thinking',
        'Mathematical Modelling',
        'Statistical Modeling',
        'Generative AI',
        'Other',
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Algorithm', algorithmSchema);
