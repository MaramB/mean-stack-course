module.exports = (req,res,next) => {
  if(req.isAuthenticated()) next();
  else return res.status(401).json({message:'Unauthorized Request'});
}