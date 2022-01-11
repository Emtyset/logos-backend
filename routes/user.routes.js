const {Router} = require('express')
const router = Router()
const User = require("../models/User")


router.post('/find', async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({"username": username})
        if (user) {
            const isMatch = await user.comparePassword(password)
            if (isMatch) {
                res.json({isOk: true})
            } else {
                res.json({isOk: false})
            }
        } else {
            res.json({isOk: false})
        }
        
    } catch (err) {
        console.log(err)
    }
})

router.post('/add', async (req, res) => {
    try {
        const {username, password} = req.body
        const user = new User({
            username: username,
            password: password,
            role: "user",
        })
        await user.save()
        res.json()
    } catch (err) {
        console.error(err)
    }
})



router.get('/sessions/:username/:N', async (req, res) => {
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
            sessions: prepareJSON(lastNsessions.filter(item => new Date(item) >= d).sort((a, b) => a - b)),
            totalSessions: user.totalTrainings,
            joined: prepareJSON([user.joined])[0]
        })
    } catch (err) {
        console.error(err)
    }
})

router.post('/finishSession', async (req, res) => {
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

module.exports = router