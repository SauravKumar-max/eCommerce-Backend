const jwt = require('jsonwebtoken');

const secret = "s0gycZ/BVieolE574SbiFL6kO73VTMp3xgiML5ewkxkmYmwI16AsJaqLILJ/Nv7gQKIBeG8M/GzwXJnoquEHmKvGYs4Ksn0ixYprPONlBE+avE7h34BKS7S2LJ++fHLv9J0JNb2qP1TZdOYKx7qyOuqmueR63aF4y364rR2HTXCLoSTyxNHk9f12yNFjixdzdhF8d+sPzhDBfNuPS5wuhVGeBEqsK7xwbo6zmeCHvLcPJPH2UpzC7LlJN4dJK3kCZj7mHzzs5LhDz0tMT4XNi/1kjPNkefo5txC2EHPt14M+6UNLI1Gt31nlRPqSG7Gg7agjXwDMZS3LW3AYHe1lcA==";

function authVerify(req, res, next){
	const token = req.headers.authorization;
	try{
		const decoded = jwt.verify(token, secret);
		req.user = { userId: decoded.userId }; 
		return next();
	}catch (error){
		console.log(error);
		res.status(401).json({error: "authorization not complete please add token!"});
	}	
}

module.exports = authVerify;
