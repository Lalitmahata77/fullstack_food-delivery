import {isValidObjectId} from "mongoose"

function checkId(req,res,next){
if (!isValidObjectId(req.params.id)) {
res.status(401)
throw new Error(`Invalid object ${req.params.id}`)
}
next()
}

export default checkId