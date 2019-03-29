var express = require('express');
var router = express.Router();

var query = require('../database/drugQuerys');

router.post('/drug_list_from_name', function(req, res) {
    query.selectDrugFromName(req, res);
});

router.post('/drug_list_from_image', function(req, res) {
    query.selectDrugFromImage(req, res);
});

router.post('/drug_list_from_text', function(req,res) {
    query.selectDrugFromText(req, res);
});

router.post('/drug_detail', function(req, res) {
    console.log("ok");
    query.selectDrugFromId(req, res);
});

module.exports = router;