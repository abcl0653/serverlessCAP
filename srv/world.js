module.exports = (say) => {
	say.on('hello', req => {
		return `Hello ${req.data.to}`
	})
}
