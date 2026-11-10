import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

// Admin
import { AdminhomeComponent } from './Admin/adminhome/adminhome.component';
import { AdminmasterComponent } from './Admin/adminmaster/adminmaster.component';
import { DistrictComponent } from './Admin/district/district.component';
import { LocationComponent } from './Admin/location/location.component';
import { DistrictviewComponent } from './Admin/districtview/districtview.component';
import { DistrictdetailsviewComponent } from './Admin/districtdetailsview/districtdetailsview.component';
import { LocationviewComponent } from './Admin/locationview/locationview.component';
import { EditdistrictComponent } from './Admin/editdistrict/editdistrict.component';
import { EditlocationComponent } from './Admin/editlocation/editlocation.component';
import { CategoryComponent } from './Admin/category/category.component';
import { CategoryviewComponent } from './Admin/categoryview/categoryview.component';
import { EditcategoryComponent } from './Admin/editcategory/editcategory.component';
import { ShopownerverificationComponent } from './Admin/shopownerverification/shopownerverification.component';
import { AcceptedshopownerviewComponent } from './Admin/acceptedshopownerview/acceptedshopownerview.component';

// Guest
import { GuesthomeComponent } from './Guest/guesthome/guesthome.component';
import { GuestmasterComponent } from './Guest/guestmaster/guestmaster.component';
import { LoginComponent } from './Guest/login/login.component';
import { ShopownerregComponent } from './Guest/shopownerreg/shopownerreg.component';
import { FarmerregComponent } from './Guest/farmerreg/farmerreg.component';
import { BuyerregComponent } from './Guest/buyerreg/buyerreg.component';

// Shop Owner
import { ShopownermasterComponent } from './shopowner/shopownermaster/shopownermaster.component';
import { ShopownerhomeComponent } from './shopowner/shopownerhome/shopownerhome.component';
import { ShopownercategoryComponent } from './shopowner/shopownercategory/shopownercategory.component';
import { PriceupdateComponent } from './shopowner/priceupdate/priceupdate.component';
import { PricehistoryComponent } from './shopowner/pricehistory/pricehistory.component';
import { EditpriceupdateComponent } from './shopowner/editpriceupdate/editpriceupdate.component';
import { ViewfarmerproductsComponent } from './shopowner/viewfarmerproducts/viewfarmerproducts.component';
import { SendrequestComponent } from './shopowner/sendrequest/sendrequest.component';
import { ViewsentrequestComponent } from './shopowner/viewsentrequest/viewsentrequest.component';
import { PaymentComponent } from './shopowner/payment/payment.component';
import { PaymentreceiptComponent } from './shopowner/paymentreceipt/paymentreceipt.component';

// Farmer
import { FarmermasterComponent } from './Farmer/farmermaster/farmermaster.component';
import { FarmerhomeComponent } from './Farmer/farmerhome/farmerhome.component';
import { ViewmarketpriceComponent } from './Farmer/viewmarketprice/viewmarketprice.component';
import { AddproductComponent } from './Farmer/addproduct/addproduct.component';
import { ViewproductComponent } from './Farmer/viewproduct/viewproduct.component';
import { EditproductComponent } from './Farmer/editproduct/editproduct.component';
import { ViewpurchaserequestComponent } from './Farmer/viewpurchaserequest/viewpurchaserequest.component';
import { FarmerpaymentdetailsComponent } from './Farmer/farmerpaymentdetails/farmerpaymentdetails.component';

// Buyer
import { BuyerhomeComponent } from './buyer/buyerhome/buyerhome.component';
import { BuyermasterComponent } from './buyer/buyermaster/buyermaster.component';
import { BuyerproductviewComponent } from './buyer/buyerproductview/buyerproductview.component';
import { BuyerproductdetailsComponent } from './buyer/buyerproductdetails/buyerproductdetails.component';
import { SendpurchaserequestComponent } from './buyer/sendpurchaserequest/sendpurchaserequest.component';
import { BuyerviewpurchaserequestComponent } from './buyer/buyerviewpurchaserequest/buyerviewpurchaserequest.component';
import { BuyerpaymentComponent } from './buyer/buyerpayment/buyerpayment.component';
import { PaymentSuccessComponent } from './buyer/paymentsuccess/paymentsuccess.component';
import { BuyerfeedbackComponent } from './buyer/buyerfeedback/buyerfeedback.component';
import { FarmerfeedbackComponent } from './Farmer/farmerfeedback/farmerfeedback.component';
import { ShopownerfeedbackComponent } from './shopowner/shopownerfeedback/shopownerfeedback.component';
import { RegisteredusersreportComponent } from './Admin/registeredusersreport/registeredusersreport.component';
import { ProductmarketpricereportComponent } from './Admin/productmarketpricereport/productmarketpricereport.component';
import { PurchaserequestreportComponent } from './Admin/purchaserequestreport/purchaserequestreport.component';
import { PurchasereportComponent } from './Farmer/purchasereport/purchasereport.component';
import { PaymentreportComponent } from './Farmer/paymentreport/paymentreport.component';
@NgModule({
  declarations: [
    AppComponent,

    // Admin
    AdminhomeComponent,
    AdminmasterComponent,
    DistrictComponent,
    LocationComponent,
    DistrictviewComponent,
    DistrictdetailsviewComponent,
    LocationviewComponent,
    EditdistrictComponent,
    EditlocationComponent,
    CategoryComponent,
    CategoryviewComponent,
    EditcategoryComponent,
    ShopownerverificationComponent,
    AcceptedshopownerviewComponent,

    // Guest
    GuesthomeComponent,
    GuestmasterComponent,
    LoginComponent,
    ShopownerregComponent,
    FarmerregComponent,
    BuyerregComponent,

    // Shop Owner
    ShopownermasterComponent,
    ShopownerhomeComponent,
    ShopownercategoryComponent,
    PriceupdateComponent,
    PricehistoryComponent,
    EditpriceupdateComponent,
    ViewfarmerproductsComponent,
    SendrequestComponent,
    ViewsentrequestComponent,
    PaymentComponent,
    PaymentreceiptComponent,

    // Farmer
    FarmermasterComponent,
    FarmerhomeComponent,
    ViewmarketpriceComponent,
    AddproductComponent,
    ViewproductComponent,
    EditproductComponent,
    ViewpurchaserequestComponent,
    FarmerpaymentdetailsComponent,

    // Buyer
    BuyerhomeComponent,
    BuyermasterComponent,
    BuyerproductviewComponent,
    BuyerproductdetailsComponent,
    SendpurchaserequestComponent,
    BuyerviewpurchaserequestComponent,
    BuyerpaymentComponent,
    PaymentSuccessComponent,
    BuyerfeedbackComponent,
    FarmerfeedbackComponent,
    ShopownerfeedbackComponent,
    RegisteredusersreportComponent,
    ProductmarketpricereportComponent,
    PurchaserequestreportComponent,
    PurchasereportComponent,
    PaymentreportComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],

  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }