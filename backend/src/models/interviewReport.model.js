const mongoose = require('mongoose');

const technicalQuestionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: [true, 'Question is required'],
            trim: true
        },

        intention: {
            type: String,
            required: [true, 'Intention is required'],
            trim: true
        },

        answer: {
            type: String,
            required: [true, 'Answer is required'],
            trim: true
        }
    },
    {
        _id: false
    }
);

const behavioralQuestionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: [true, 'Question is required'],
            trim: true
        },

        intention: {
            type: String,
            required: [true, 'Intention is required'],
            trim: true
        },

        answer: {
            type: String,
            required: [true, 'Answer is required'],
            trim: true
        }
    },
    {
        _id: false
    }
);

const skillGapSchema = new mongoose.Schema(
    {
        skill: {
            type: String,
            required: [true, 'Skill is required'],
            trim: true
        },

        severity: {
            type: String,
            enum: ['low', 'medium', 'high'],
            required: [true, 'Severity is required']
        }
    },
    {
        _id: false
    }
);

const preparationPlanSchema = new mongoose.Schema(
    {
        day: {
            type: Number,
            required: [true, 'Day is required'],
            min: 1
        },

        focus: {
            type: String,
            required: [true, 'Focus is required'],
            trim: true
        },

        tasks: [
            {
                type: String,
                required: true,
                trim: true
            }
        ]
    },
    {
        _id: false
    }
);

const interviewReportSchema = new mongoose.Schema(
    {
        jobDescription: {
            type: String,
            required: [true, 'Job description is required'],
            trim: true
        },

        resume: {
            type: String,
            required: [true, 'Resume is required']
        },

        selfDescription: {
            type: String,
            required: [true, 'Self description is required'],
            trim: true
        },

        matchScore: {
            type: Number,
            min: 0,
            max: 100,
            required: true
        },

        technicalQuestions: {
            type: [technicalQuestionSchema],
            default: []
        },

        behavioralQuestions: {
            type: [behavioralQuestionSchema],
            default: []
        },

        skillGaps: {
            type: [skillGapSchema],
            default: []
        },

        preparationPlan: {
            type: [preparationPlanSchema],
            default: []
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
            index: true
        },

        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true
        }
    },
    {
        timestamps: true
    }
);

interviewReportSchema.index({
    userId: 1,
    createdAt: -1
});

const InterviewReportModel =
    mongoose.model(
        'InterviewReport',
        interviewReportSchema
    );

module.exports = InterviewReportModel;