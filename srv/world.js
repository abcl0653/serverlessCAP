module.exports = (say) => {
	say.on('hello', async req => {
		// const {Books } = cds.entities; 
		// const b
		// console.log(cds.env);
		// // const db = await cds.connect.to('db');
    	// const db = await cds.connect({kind: "sqlite", credentials:{database: 'sqlite1.db'}});
		// const {Books } = await cds.entities; 
		// const result = await db.run(SELECT.from(Books));
		
		// return result;
		return `Hello ${req.data.to}`
	})
}
