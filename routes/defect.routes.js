const {Router} = require('express')
const router = Router()
const Defect = require("../models/Defect")


// DON'T RUN IT ANYMORE
router.get("/add-all", async (req, res) => {
    try {
        const defects = Defect.create([
            {
                name: "Гаммацизм",
                description: "Нарушенное произношение твёрдого и мягкого [г]"
            },
            {
                name: "Йотацизм",
                description: "Дефект произношения йот [j]"
            },
            {
                name: "Каппацизм",
                description: "Нарушенное произношение твёрдого и мягкого [к]"
            },
            {
                name: "Ламбдацизм",
                description: "Дефект произношения твёрдого и мягкого [л]"
            },
            {
                name: "Ротацизм",
                description: "Характеризуется неправильным произношением твёрдого и мягкого [р]"
            },
            {
                name: "Хитизм",
                description: "Неправильное произношение твёрдого и мягкого [х]"
            }
        ])
        res.json("Done")
    } catch (err) {
        console.error(err)
    }
})

router.get("/get-all", async (req, res) => {
    try {
        const defectOptions = await Defect.find()
        res.json({defectOptions})
    } catch (err) {
        console.error(err)
    }
})

module.exports = router