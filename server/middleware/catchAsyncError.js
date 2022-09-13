const asyncMiddleware = func => 
    (req, res, next) => {
        Promise.resolve(func(req,res,next))
            .catch(next);
};

export default asyncMiddleware;