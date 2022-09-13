import { Router } from 'express'
import userService from '../mongodb/models/Users.js'

const router = Router()

router.get('/', async (req, res) => {
    res.render('login.pug', {
        message: 'Login de Usuario'
    })
})


router.post('/', async (req, res) => {
    try {
        const { name } = req.body
        if (!name) return res.status(400).send({ status: 'error', error: 'Complete el campo' })
        const exists = await userService.findOne({ name: name })
        if (exists) return res.status(400).send({ status: 'error', error: 'usuario ya existe' })
        const newUser = { name }
        let result = await userService.create(newUser)
        let sessUser = req.session;
        sessUser.user = name;
        console.log(sessUser.user);
        req.session.save((err) => {
            if (err) {
                console.log("session save error", err);
                res.sendStatus(500);
            } else {
                console.log('session:', req.session)
                console.log('user:', req.session.user)
                console.log('result:', result)
                res.status(200).send()
            }
        });

    } catch (error) {
        console.log(error)
    }
})
export default router