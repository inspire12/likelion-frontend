const { getDummyData } = require('../utils/dummyData');

exports.getDummyCards = (req, res) => {
    const data = getDummyData();
    res.json(data);
};
