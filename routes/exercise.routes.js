const {Router} = require('express')
const router = Router()
const Exercise = require("../models/Exercise")

router.get('/get-session', async (req, res) => {
    try {
        let [intro] = await Exercise.aggregate([
            {$match: {order: 0}},
            {$sample: {size: 1}}
        ])
        let main = await Exercise.aggregate([
                {$match: {order: 1}},
                {$sample: {size: 3}}
        ])
        let [end] = await Exercise.aggregate([
                {$match: {order: 2}},
                {$sample: {size: 1}}
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

router.get('/:id', async (req, res) => {
    try{
        const {id} = req.params
        const exercise = await Exercise.findById(id)
        res.json(exercise)
    } catch (err) {
        console.error(err)
    }
})


module.exports = router