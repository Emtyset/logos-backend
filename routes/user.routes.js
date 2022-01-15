const {Router} = require('express')
const router = Router()
const User = require("../models/User")


router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({"username": username})
        if (user){
            const isMatch = await user.comparePassword(password)
            if (isMatch) {
                res.json({user : user})
            } else {
                res.json()
            }
        } else {
            res.json()
        }
    } catch (err) {
        console.log(err)
    }
})

router.post('/register', async (req, res) => {
    try {
        const {username, password, defects} = req.body
        const user = new User({
            username: username,
            password: password,
            role: "user",
            defects: defects
        })
        await user.save()
        res.json({
            isOk: true
        })
    } catch (err) {
        res.json({
            isOk: false
        })
        console.error(err)
    }
})


router.post('/add-done', async (req, res) => {
    try {
        const {username, exerciseIds} = req.body
        const user = await User.findOne({"username": username})
        await exerciseIds.map(exerciseId => {
            user.pushDoneExercise(exerciseId)
        })
        user.save()
        res.json()
    } catch (err){
        console.error(err)
    }
})

router.post('/finish-session', async (req, res) => {
    try {
        const { username } = req.body
        const user = await User.findOne({"username": username})
        user.pushToday()
        console.log(user.sessions)
        await user.save()
        res.json()
    } catch (err){
        console.error(err)
    }
})

router.get('/:username/session-dates/:N', async (req, res) => {
    function prepareJSON(data) {
        // wtf is this? https://stackoverflow.com/questions/70449092/reason-object-object-date-cannot-be-serialized-as-json-please-only-ret
        return data.map(x => Math.floor(x / 1000))
    }

    try {
        let {username, N} = req.params
        N = Number(N)
        const user = await User.findOne({"username": username})
        let lastNsessions = user.sessions.slice(-N)
        let t = new Date();
        let d = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate() - N));
        res.json({
            sessions: lastNsessions.filter(item => new Date(item) >= d).sort((a, b) => a - b),
        })
    } catch (err) {
        console.error(err)
    }
})

router.get("/:username/get-exercises", async (req, res) => {
    try {
        const {username} = req.params
        const user = await User.findOne({"username": username})
        const exercises = user.doneExercises.map(x => x.toString())
        console.log(exercises)
        res.json({
            "exerciseIds" : exercises
        })
    } catch (err) {
        console.error(err)
    }
})

router.get("/:username", async (req, res) => {
    try {
        const {username} = req.params
        const user = await User.findOne({"username": username}, {"password": 0, "__v": 0, "role": 0})
        user 
        res.json({
            // "user" : user.toJSON({virtuals: true, "password": 0, "sessions": false, "doneExercises": 0})
            "user": {
                "username" : user.username,
                "joined": user.joined,
                "totalTrainings": user.totalTrainings,
                "lastTraining": user.lastTraining,
                "totalExercises": user.doneExercises.length
            }
        })
    } catch (err) {
        console.error(err)
    }
})


module.exports = router