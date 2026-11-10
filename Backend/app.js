var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var district = require('./routes/district');
var districtview = require('./routes/districtview');
var location = require('./routes/location');
var getdistrictbyid = require('./routes/getdistrictbyid');
var locationview = require('./routes/locationview');
var districtdelete = require('./routes/districtdelete');
var updatedistrict = require('./routes/updatedistrict');
var getdistrictdetails = require('./routes/getdistrictdetails');
var updatelocation = require('./routes/updatelocation');
var getlocationdetails = require('./routes/getlocationdetails');
var locationdelete = require('./routes/locationdelete');

var categoryreg = require('./routes/categoryreg');
var upload = require('./routes/upload');
var getcategorydetails = require('./routes/getcategorydetails');
var categoryview = require('./routes/categoryview');
var updatecategory = require('./routes/updatecategory');
var categorydelete = require('./routes/categorydelete');

var login = require('./routes/login');

var shopownerreg = require('./routes/shopownerreg');
var shopownerverification = require('./routes/shopownerverification');
var acceptshopownerrequest = require('./routes/acceptshopownerrequest');
var rejectshopownerrequest = require('./routes/rejectshopownerrequest');
var acceptedshopownerview = require('./routes/acceptedshopownerview');

var shopownercategory = require('./routes/shopownercategory');
var priceupdate = require('./routes/priceupdate');
var priceupdateview = require('./routes/priceupdateview');
var getpriceupdatedetails = require('./routes/getpriceupdatedetails');
var updateprice = require('./routes/updateprice');
var deletepriceupdate = require('./routes/deletepriceupdate');

var farmerregRouter = require('./routes/farmerreg');

var viewmarketprice = require('./routes/viewmarketprice');

var productreg = require('./routes/productreg');
var viewproduct = require('./routes/viewproduct');
var getproductdetails = require('./routes/getproductdetails');
var updateproduct = require('./routes/updateproduct');
var deleteproduct = require('./routes/deleteproduct');

var shopownerproductview = require('./routes/shopownerproductview');

var purchaserequest = require('./routes/purchaserequest');
var viewsentrequest = require('./routes/viewsentrequest');

var paymentdetails = require('./routes/paymentdetails');
var farmerpaymentdetails = require('./routes/farmerpaymentdetails');

var buyerreg = require('./routes/buyerreg');
var buyerproductview = require('./routes/buyerproductview');

var sendpurchaserequest = require('./routes/sendpurchaserequest');
var viewbuyersentrequest = require('./routes/viewbuyersentrequest');

var buyerpaymentRouter = require('./routes/buyerpayment');
var savebuyerpayment = require('./routes/savebuyerpayment');

var feedbackRouter = require('./routes/feedback');

var adminDashboardRouter = require('./routes/dashboard');
var registeredusersreport = require('./routes/registeredusersreport');
var productmarketpricereport = require('./routes/productmarketpricereport');
var purchaserequestreport = require('./routes/purchaserequestreport');

var purchasereport = require('./routes/purchasereport');
var paymentreport = require('./routes/paymentreport');

var cors = require('cors');

var app = express();


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());

app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({
    extended: false
}));

app.use(cookieParser());

app.use(
    express.static(
        path.join(__dirname, 'public')
    )
);


// =====================================================
// BASIC ROUTES
// =====================================================

app.use('/', indexRouter);

app.use('/users', usersRouter);


// =====================================================
// DISTRICT
// =====================================================

app.use('/district', district);

app.use('/districtview', districtview);

app.use('/location', location);

app.use('/getdistrictbyid', getdistrictbyid);

app.use('/locationview', locationview);

app.use('/districtdelete', districtdelete);

app.use('/getdistrictdetails', getdistrictdetails);

app.use('/updatedistrict', updatedistrict);

app.use('/getlocationdetails', getlocationdetails);

app.use('/updatelocation', updatelocation);

app.use('/locationdelete', locationdelete);


// =====================================================
// CATEGORY
// =====================================================

app.use('/categoryreg', categoryreg);

app.use('/upload', upload);

app.use('/getcategorydetails', getcategorydetails);

app.use('/categoryview', categoryview);

app.use('/updatecategory', updatecategory);

app.use('/categorydelete', categorydelete);


// =====================================================
// LOGIN
// =====================================================

app.use('/checklogin', login);


// =====================================================
// SHOP OWNER
// =====================================================

app.use('/shopownerreg', shopownerreg);

app.use('/shopownerverification', shopownerverification);

app.use('/acceptshopownerrequest', acceptshopownerrequest);

app.use('/rejectshopownerrequest', rejectshopownerrequest);

app.use('/acceptedshopownerview', acceptedshopownerview);

app.use('/shopownercategory', shopownercategory);

app.use('/priceupdate', priceupdate);

app.use('/priceupdateview', priceupdateview);

app.use('/getpriceupdatedetails', getpriceupdatedetails);

app.use('/updateprice', updateprice);

app.use('/deletepriceupdate', deletepriceupdate);


// =====================================================
// FARMER
// =====================================================

app.use('/farmerreg', farmerregRouter);

app.use('/viewmarketprice', viewmarketprice);

app.use('/productreg', productreg);

app.use('/viewproduct', viewproduct);

app.use('/getproductdetails', getproductdetails);

app.use('/updateproduct', updateproduct);

app.use('/deleteproduct', deleteproduct);


// =====================================================
// SHOP OWNER PRODUCT VIEW
// =====================================================

app.use(
    '/shopownerproductview',
    shopownerproductview
);


// =====================================================
// PURCHASE REQUEST
// =====================================================

app.use(
    '/purchaserequest',
    purchaserequest
);

app.use(
    '/viewsentrequest',
    viewsentrequest
);


// =====================================================
// SHOP OWNER PAYMENT
// =====================================================

app.use(
    '/shopowner',
    paymentdetails
);


// =====================================================
// FARMER PAYMENT
// =====================================================

app.use(
    '/farmer',
    farmerpaymentdetails
);


// =====================================================
// BUYER
// =====================================================

app.use(
    '/buyerreg',
    buyerreg
);

app.use(
    '/buyerproductview',
    buyerproductview
);

app.use(
    '/sendpurchaserequest',
    sendpurchaserequest
);

app.use(
    '/viewbuyersentrequest',
    viewbuyersentrequest
);


// =====================================================
// BUYER PAYMENT
// =====================================================

app.use(
    '/buyer',
    buyerpaymentRouter
);

app.use(
    '/buyer',
    savebuyerpayment
);


// =====================================================
// FEEDBACK
// =====================================================

// BUYER FEEDBACK
app.use(
    '/buyer',
    feedbackRouter
);


// FARMER FEEDBACK
app.use(
    '/farmer',
    feedbackRouter
);


// SHOP OWNER FEEDBACK
app.use(
    '/shopowner',
    feedbackRouter
);


// =====================================================
// ADMIN DASHBOARD
// =====================================================

app.use(
    '/admin/dashboard',
    adminDashboardRouter
);


// =====================================================
// ADMIN REPORTS
// =====================================================

app.use(
    '/admin/registeredusersreport',
    registeredusersreport
);

app.use(
    '/admin/productmarketpricereport',
    productmarketpricereport
);

app.use(
    '/admin/purchaserequestreport',
    purchaserequestreport
);


// =====================================================
// FARMER REPORTS
// =====================================================

app.use(
    '/farmer',
    purchasereport
);

app.use(
    '/farmer',
    paymentreport
);


// =====================================================
// EXPORT
// =====================================================

module.exports = app;