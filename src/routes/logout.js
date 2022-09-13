import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
    let sessUser = req.session;
    sessUser.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.render('logout.pug', {
            message: `Hasta luego ${sessUser.user}`
        })
    });

});
export default router
