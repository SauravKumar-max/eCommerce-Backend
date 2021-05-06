const mongoose = require('mongoose');

async function initializeDBConnection(){

	try{
		const uri = "mongodb+srv://dbSaurav:Jamesbond@007@cluster0.iha7u.mongodb.net/inventory?retryWrites=true&w=majority";

		await mongoose.connect(uri, { 
			useUnifiedTopology: true ,
			useNewUrlParser: true,
  	});

		console.log("Connection Completed");
		
	}catch{
		console.error("Failed to connect", err);
	}
	
}

module.exports = { initializeDBConnection }