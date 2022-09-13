class ApiFeatures {
    constructor(query, queryStr){
        this.query = query
        this.queryStr = queryStr
    }


    // SEARCH FEATURE
    search(){
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            }
        } : {};

        this.query = this.query.find({...keyword});
        return this;
    }


    // FILTERS FEATURE(such as CATEGORY, PRICE, RATING, PAGINATION)
    filter(){
        const queryCopy = {...this.queryStr}; // to prevent shallow copy we used a rest operator here so that it won't change the original value of queryStr
        
        // removing fields or category
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);
        
        //FILTER for Price and Rating
        let tempQueryStr = JSON.stringify(queryCopy); //converting the quercopy object to string to modify the gt,lt,gte,lte
        tempQueryStr = tempQueryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`) //mongodb cannot read gt,lt,gte,lte so we add "$" before this i.e. $gt,$lt,$gte,$lte so that mongodb recognize it
        tempQueryStr =JSON.parse(tempQueryStr) //converting the tempQueryStr back to object

        this.query = this.query.find(tempQueryStr);        
        return this;
    }


    // PAGINATION
    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * ( currentPage - 1 );

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

export default ApiFeatures;