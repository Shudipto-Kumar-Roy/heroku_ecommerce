const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Errorhandeler = require("../utils/errorhandeler");

class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: { $regex: this.queryStr.keyword, $options: "i" },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryStrCopy = { ...this.queryStr };

    // Removing some fields for category
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryStrCopy[key]);

    // Filter for price and rating
    let queryStrCopyStr = JSON.stringify(queryStrCopy);

    queryStrCopyStr = queryStrCopyStr.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (key) => `$${key}`
    );

    this.query = this.query.find(JSON.parse(queryStrCopyStr));
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
