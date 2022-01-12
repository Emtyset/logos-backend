const { Router } = require('express')
const router = Router()
const Exercise = require("../models/Exercise")
const User = require("../models/User")
const Defect = require("../models/Defect")


router.get('/get-all', async (req, res) => {
    try {
        let exercises = await Exercise.find()
        res.json(exercises)
    } catch (err) {
        console.error(err)
    }
})

router.get('/insert-one', async (req, res) => {
    try {
        const exercise = await new Exercise({
            order: 0,
            text: [["", ""]], time: 60
        })
        await exercise.save()
        res.json(exercise)
    } catch (err) {
        console.error(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const exercise = await Exercise.findById(id)
        res.json(exercise)
    } catch (err) {
        console.error(err)
    }
})

router.get('/:username/get-session', async (req, res) => {
    try {
        const { username } = req.params
        const user = await User.findOne({ "username": username })
        const defects = user.defects
        const exercises = await Exercise.aggregate([
            {
                $match: {
                    defect: {
                        $in: defects
                    }
                }
            }
        ])
        console.log(exercises)
        let [intro] = await Exercise.aggregate([
            {
                $match:
                {
                    $and: [{ order: 0 }, { defect: { $in: defects } }]
                }
            },
            { $sample: { size: 1 } }
        ])
        let main = await Exercise.aggregate([
            { $match:
                {
                    $and: [{ order: 1 }, { defect: { $in: defects } }]
                } },
            { $sample: { size: 3 } }
        ])
        let [end] = await Exercise.aggregate([
            { $match:
                {
                    $and: [{ order: 2 }, { defect: { $in: defects } }]
                } },
            { $sample: { size: 1 } }
        ])
        res.json({
            intro: intro,
            main: main,
            end: end
        })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router