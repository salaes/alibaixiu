module.exports = async (req, res) => {
	// console.log(req.session.userInfo,11111);
	if (req.session && req.session.userInfo) {
		res.send('var isLogin = true')
	}else {
		res.send('var isLogin = false')
	}
};
