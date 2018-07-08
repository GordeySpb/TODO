const Router = require('koa-router');

const router = new Router();

// render index page
router.get('/api/testurl', async (ctx) => {
	console.log(ctx.body);

	ctx.body = {
		test: 10
	}
});

router.post('/api/posttest', async (ctx) => {
	console.log(ctx.request.body);

	ctx.body = {
		test: 'posttest'
	}
});

module.exports = router;