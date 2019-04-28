var express = require('express');
var router = express.Router();

var query = require('../database/drugQuerys');

router.get('/drug_list_from_name', function(req, res) {
    query.selectDrugFromName(req, res);
});

router.get('/drug_list_from_image', function(req, res) {
    query.selectDrugFromImage(req, res);
});

router.get('/drug_list_from_text', function(req,res) {
    query.selectDrugFromText(req, res);
});

router.get('/drug_detail', function(req, res) {
    query.selectDrugFromId(req, res);
});

router.get('/drug', function(req, res) {
    query.selectAll(req, res);
});

module.exports = router;