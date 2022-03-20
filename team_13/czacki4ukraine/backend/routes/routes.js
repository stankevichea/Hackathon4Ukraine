const express = require('express');
const router = express.Router();


const Inq = require('../actions/Inq');
// pobieranie n kafelek
router.get('/inqs/:city/:categories', Inq.getAllInq)
// pobieranie inq
router.get('/inq/:id', Inq.getOneInq)
//pobieranie inqa z deklaracjami dla organizacji
router.get('/inq_declarations/:id', Inq.getInqWithDeclarations)

router.delete('/inq_remove/', Inq.InqRemove)


const Declaration = require('../actions/Declaration');
// dodawanie (declaration) przez ludka
router.post('/declaration_add/', Declaration.saveDeclaration)
// usuwanie (declaration) przez ludka
router.get('/declarations/:mail', Declaration.getDeclarations)
// potwierdzenie usuniecia rejestracji
router.get('/declaration_remove/:id', Declaration.removeDeclarationID)



const Organization = require('../actions/Organization');
router.post('/organization_add/', Organization.saveOrganization)
// dodawanie (inq) przez organizacje
router.post('/inq_add/', Organization.saveInq)
// wszystkie inqi i deklaracje tych inqów dla organizacji
router.get('/inqs_for_organization/:id', Organization.InksForOrganization)





const cities_and_categories = require('../actions/cities_categories');
router.get('/cities/', cities_and_categories.GetAllCities);
router.get('/categories/', cities_and_categories.GetAllCategories);

module.exports = router;