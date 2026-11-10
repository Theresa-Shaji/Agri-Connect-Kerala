import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { LoginComponent } from './Guest/login/login.component';
import { GuesthomeComponent } from './Guest/guesthome/guesthome.component';
import { GuestmasterComponent } from './Guest/guestmaster/guestmaster.component';
import { ShopownerregComponent } from './Guest/shopownerreg/shopownerreg.component';
import { ShopownerverificationComponent } from './Admin/shopownerverification/shopownerverification.component';
import { AcceptedshopownerviewComponent } from './Admin/acceptedshopownerview/acceptedshopownerview.component';
import { ShopownermasterComponent } from './shopowner/shopownermaster/shopownermaster.component';
import { ShopownerhomeComponent } from './shopowner/shopownerhome/shopownerhome.component';
import { ShopownercategoryComponent } from './shopowner/shopownercategory/shopownercategory.component';
import { PriceupdateComponent } from './shopowner/priceupdate/priceupdate.component';
import { PricehistoryComponent } from './shopowner/pricehistory/pricehistory.component';
import { EditpriceupdateComponent } from './shopowner/editpriceupdate/editpriceupdate.component';
import { FarmermasterComponent } from './Farmer/farmermaster/farmermaster.component';
import { FarmerhomeComponent } from './Farmer/farmerhome/farmerhome.component';
import { FarmerregComponent } from './Guest/farmerreg/farmerreg.component';
import { ViewmarketpriceComponent } from './Farmer/viewmarketprice/viewmarketprice.component';
import { AddproductComponent } from './Farmer/addproduct/addproduct.component';
import { ViewproductComponent } from './Farmer/viewproduct/viewproduct.component';
import { EditproductComponent } from './Farmer/editproduct/editproduct.component';
import { ViewfarmerproductsComponent } from './shopowner/viewfarmerproducts/viewfarmerproducts.component';
import { SendrequestComponent } from './shopowner/sendrequest/sendrequest.component';
import { ViewpurchaserequestComponent } from './Farmer/viewpurchaserequest/viewpurchaserequest.component';
import { ViewsentrequestComponent } from './shopowner/viewsentrequest/viewsentrequest.component';
import { PaymentComponent } from './shopowner/payment/payment.component';
import { PaymentreceiptComponent } from './shopowner/paymentreceipt/paymentreceipt.component';
import { FarmerpaymentdetailsComponent } from './Farmer/farmerpaymentdetails/farmerpaymentdetails.component';
import { BuyerregComponent } from './Guest/buyerreg/buyerreg.component';
import { BuyermasterComponent } from './buyer/buyermaster/buyermaster.component';
import { BuyerhomeComponent } from './buyer/buyerhome/buyerhome.component';
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

const routes: Routes = [

  { path: '', redirectTo: 'guestmaster/guesthome', pathMatch: 'full' },

  {
    path: 'adminmaster',
    component: AdminmasterComponent,
    children: [
      { path: '', redirectTo: 'adminhome', pathMatch: 'full' },
      { path: 'adminhome', component: AdminhomeComponent },
      { path: 'district', component: DistrictComponent },
      { path: 'location', component: LocationComponent },
      { path: 'districtview', component: DistrictviewComponent },
      { path: 'locationview', component: LocationviewComponent },
      { path: 'editdistrict/:id', component: EditdistrictComponent },
      { path: 'editlocation/:id', component: EditlocationComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'categoryview', component: CategoryviewComponent },
      { path: 'editcategory/:id', component: EditcategoryComponent },
      { path: 'districtdetailsview', component: DistrictdetailsviewComponent },
       {path:'shopownerverification',component:ShopownerverificationComponent},
       {path:'acceptedshopownerview',component:AcceptedshopownerviewComponent},
       { path: 'registeredusersreport', component:RegisteredusersreportComponent },
       {path:'productmarketpricereport',component:ProductmarketpricereportComponent},
       {path:'purchaserequestreport',component:PurchaserequestreportComponent}

       
    ]
  },

  {
    path: 'guestmaster',
    component: GuestmasterComponent,
    children: [
      { path: 'guesthome', component: GuesthomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'shopownerreg', component: ShopownerregComponent},
       { path:'farmerreg', component:FarmerregComponent},
       { path:'buyerreg', component: BuyerregComponent},
    ]
  },
   {path:'shopownermaster',component:ShopownermasterComponent,
    children:[
      {path:'shopownerhome',component:ShopownerhomeComponent},
      {path:'shopownercategory',component:ShopownercategoryComponent},
      {path:'priceupdate',component:PriceupdateComponent},
      {path:'pricehistory',component:PricehistoryComponent},
      {path:'editpriceupdate/:id',component:EditpriceupdateComponent},
       {path:'viewfarmerproducts',component:ViewfarmerproductsComponent},
      {path:'sendrequest/:productid/:farmerid',component:SendrequestComponent},
       {path:'viewsentrequest',component:ViewsentrequestComponent},
        {path:'payment/:requestid',component:PaymentComponent},
        {path: 'paymentreceipt/:requestid',component:PaymentreceiptComponent},
        {path:'shopownerfeedback',component:ShopownerfeedbackComponent}
    //   {path:'editfarmerservice/:id',component:EditfarmerserviceComponent}
     ]
  },
  {
  path: 'farmermaster',
  component: FarmermasterComponent,
  children: [
    { path: 'farmerhome', component: FarmerhomeComponent },
     { path: 'viewmarketprice', component: ViewmarketpriceComponent },
     { path: 'addproduct', component: AddproductComponent },
     { path: 'viewproduct', component: ViewproductComponent },
     { path: 'editproduct/:id', component: EditproductComponent },
     { path: 'viewpurchaserequest', component: ViewpurchaserequestComponent },
      { path: 'farmerpaymentdetails', component:FarmerpaymentdetailsComponent },
{ path: 'purchasereport', component: PurchasereportComponent },
{ path: 'paymentreport', component: PaymentreportComponent },
{path: 'farmerfeedback',component: FarmerfeedbackComponent}
  ]
},
 {path:'buyermaster',component:BuyermasterComponent,
    children:[
      {path:'buyerhome',component:BuyerhomeComponent},
        { path: 'buyerproductview', component: BuyerproductviewComponent },
        { path:'buyerproductdetails/:productid',component:BuyerproductdetailsComponent},
        {path:'sendpurchaserequest/:productid',component:SendpurchaserequestComponent},
        {path: 'buyerviewpurchaserequest',component: BuyerviewpurchaserequestComponent},
        {path:'buyerpayment/:requestid',component:BuyerpaymentComponent},
        {path:'paymentsuccess',component:PaymentSuccessComponent},
        {path:'buyerfeedback',component:BuyerfeedbackComponent}
      
      ]
  }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }