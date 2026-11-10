import { HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {
  

 constructor(private http: HttpClient) { }
 checklogin(data: any) {
    return this.http.post("http://localhost:3000/checklogin", data).toPromise()

  }
  districtreg(data: any) {
    return this.http.post("http://localhost:3000/district", data).toPromise()
  }
  districtview() {
    return this.http.get("http://localhost:3000/districtview").toPromise()
  }
  location(data: any) {
    return this.http.post("http://localhost:3000/location", data).toPromise()

  }
   getdistrictbyid(data: any) {
    return this.http.post<any>("http://localhost:3000/getdistrictbyid", data).toPromise()
  }
  locationview() {
    return this.http.get("http://localhost:3000/locationview").toPromise()

  }
  getdistrictdetails(data: any) {
    return this.http.post("http://localhost:3000/getdistrictdetails", data).toPromise()
  }
   updatedistrict(data: any) {
    return this.http.post("http://localhost:3000/updatedistrict", data).toPromise()
  }
  getlocationdetails(data: any) {
    return this.http.post("http://localhost:3000/getlocationdetails", data).toPromise()
  }
  updatelocation(data: any) {
    return this.http.post("http://localhost:3000/updatelocation", data).toPromise()
  }
  Deletedistrictdata(data: any) {
    return this.http.post("http://localhost:3000/districtdelete", data).toPromise()
  }
  deletelocation(data: any) {
  return this.http.post("http://localhost:3000/locationdelete", data).toPromise()
}
categoryreg(data: any) {
    return this.http.post("http://localhost:3000/categoryreg", data).toPromise()
  }
  upload(file: File):Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `http://localhost:3000/upload`,
      formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  getcategorydetails(data: any) {
    return this.http.post("http://localhost:3000/getcategorydetails", data).toPromise()
  }
  categoryview() {
  return this.http.get("http://localhost:3000/categoryview").toPromise()
}
  
  updatecategory(data: any) {
    return this.http.post("http://localhost:3000/updatecategory", data).toPromise()
  }
  Deletecategorydata(data: any) {
    return this.http.post("http://localhost:3000/categorydelete", data).toPromise()
  }
  
  shopownerreg(data: any) {
    return this.http.post("http://localhost:3000/shopownerreg", data).toPromise()
  }
   shopownerverification() {
    return this.http.get("http://localhost:3000/shopownerverification").toPromise()
  }
  acceptshopownerrequest(data: any) {
    return this.http.post("http://localhost:3000/acceptshopownerrequest", data).toPromise();

  }
  rejectshopownerrequest(data: any) {
    return this.http.post("http://localhost:3000/rejectshopownerrequest", data).toPromise();

  }
 acceptedshopownerview() {
  return this.http.get("http://localhost:3000/acceptedshopownerview").toPromise();
}

saveShopOwnerCategory(data:any)
{
  return this.http.post(
    'http://localhost:3000/shopownercategory',
    data,
    { responseType: 'text' }
  ).toPromise();
}
viewShopCategories(data:any)
{
  return this.http.post(
    'http://localhost:3000/priceupdate/shopcategory',
    data
  ).toPromise();
}



updatePrice(data:any)
{
  return this.http.post(
    'http://localhost:3000/priceupdate/add',
    data
  ).toPromise();
}
viewPriceHistory(data:any)
{
 return this.http.post(
 'http://localhost:3000/priceupdateview/history',
 data
 ).toPromise();
}
getpriceupdatedetails(data:any)
{
  return this.http.post(
    'http://localhost:3000/getpriceupdatedetails',
    data
  ).toPromise();
}
updateprice(data:any)
{
  return this.http.post(
    "http://localhost:3000/updateprice",
    data
  ).toPromise();
}
deletePriceUpdate(data:any)
{
  return this.http.post(
    'http://localhost:3000/deletepriceupdate',
    data
  ).toPromise();
}


 farmerreg(data: any) {
  return this.http.post("http://localhost:3000/farmerreg", data).toPromise()
}


// View Market Price - Farmer

getDistrict()
{
  return this.http.get("http://localhost:3000/viewmarketprice/district");
}

getLocation(id:any)
{
  return this.http.get("http://localhost:3000/viewmarketprice/location/"+id);
}

getCategory()
{
  return this.http.get("http://localhost:3000/viewmarketprice/category");
}

searchMarketPrice(data:any)
{
  return this.http.post("http://localhost:3000/viewmarketprice/search",data);
}

productreg(data: any) {

  return this.http.post(
    "http://localhost:3000/productreg",
    data
  ).toPromise();

}

viewProduct(data:any)
{
  return this.http.post(
    "http://localhost:3000/viewproduct",
    data
  ).toPromise();
}
getproductdetails(data:any){
  return this.http.post(
    "http://localhost:3000/getproductdetails",
    data
  ).toPromise();
}

updateproduct(data:any){
  return this.http.post(
    "http://localhost:3000/updateproduct",
    data
  ).toPromise();
}
deleteproduct(data:any){

  return this.http.post(
    "http://localhost:3000/deleteproduct",
    data
  ).toPromise();

}
 viewFarmerProducts()
{
  return this.http.post(
    "http://localhost:3000/shopownerproductview/viewproducts",
    {}
  ).toPromise();
}

sendPurchaseRequest(data:any)
{
  return this.http.post(
    "http://localhost:3000/purchaserequest/sendrequest",
    data
  ).toPromise();
}
viewPurchaseRequest(data:any)
{
  return this.http.post(
    "http://localhost:3000/purchaserequest/viewrequest",
    data
  ).toPromise();
}
acceptPurchaseRequest(data:any)
{
  return this.http.post(
    "http://localhost:3000/purchaserequest/acceptrequest",
    data
  ).toPromise();
}
rejectPurchaseRequest(data:any)
{
  return this.http.post(
    "http://localhost:3000/purchaserequest/rejectrequest",
    data
  ).toPromise();
}
viewSentRequest(data:any)
{
  return this.http.post(
    "http://localhost:3000/viewsentrequest/viewsentrequest",
    data
  ).toPromise();
}
paymentDetails(data:any)
{

return this.http.post(
"http://localhost:3000/shopowner/paymentdetails",
data
).toPromise();

}



savePayment(data:any)
{

return this.http.post(

"http://localhost:3000/shopowner/savepayment",

data

).toPromise();

}
farmerPaymentDetails(data: any)
{
    return this.http.post(
        "http://localhost:3000/farmer/farmerpaymentdetails",
        data
    ).toPromise();
}
buyerreg(data: any) {

  return this.http.post(
    "http://localhost:3000/buyerreg/buyerreg",
    data
  ).toPromise();

}
viewBuyerProducts(data: any) {
  return this.http.post(
    "http://localhost:3000/buyerproductview/viewproducts",
    data
  ).toPromise();
}
getBuyerProductDetails(data: any) {

  return this.http.post(
    "http://localhost:3000/buyerproductview/productdetails",
    data
  ).toPromise();

}
viewBuyerProductDetails(data: any) {
  return this.http.post(
    "http://localhost:3000/buyerproductview/productdetails",
    data
  ).toPromise();
}
sendRequestProductDetails(data: any) {

  return this.http.post(
    'http://localhost:3000/sendpurchaserequest/requestproductdetails',
    data
  ).toPromise();

}


sendBuyerPurchaseRequest(data: any) {

  return this.http.post(
    'http://localhost:3000/sendpurchaserequest/sendpurchaserequest',
    data
  ).toPromise();

}
viewBuyerSentRequests(data: any) {

  return this.http.post(
    "http://localhost:3000/viewbuyersentrequest/viewbuyersentrequest",
    data
  ).toPromise();

}
// BUYER PAYMENT - GET REQUEST DETAILS
buyerPaymentDetails(data: any) {
  return this.http.post(
    'http://localhost:3000/buyer/buyerpaymentdetails',
    data
  ).toPromise();
}

// BUYER PAYMENT - SAVE PAYMENT
saveBuyerPayment(data: any) {
  return this.http.post(
    'http://localhost:3000/buyer/savebuyerpayment',
    data
  ).toPromise();
}
getFeedbackRequests(data: any) {

  return this.http.post(
    'http://localhost:3000/buyer/getfeedbackrequests',
    data
  ).toPromise();

}
saveFeedback(data: any) {

  return this.http.post(
    'http://localhost:3000/buyer/savefeedback',
    data
  ).toPromise();

}
getFarmerFeedback(data: any) {

  return this.http
    .post(
      'http://localhost:3000/farmer/getfarmerfeedback',
      data
    )
    .toPromise();

}
getProductFeedback(data: any) {

  return this.http.post(
    'http://localhost:3000/buyer/getproductfeedback',
    data
  ).toPromise();

}
// =====================================================
// SHOP OWNER FEEDBACK
// =====================================================

getShopownerFeedbackRequests(data: any): Promise<any> {

  return this.http
    .post(
      'http://localhost:3000/shopowner/getshopownerfeedbackrequests',
      data
    )
    .toPromise();

}


saveShopownerFeedback(data: any): Promise<any> {

  return this.http
    .post(
      'http://localhost:3000/shopowner/saveshopownerfeedback',
      data
    )
    .toPromise();

}
// ADMIN DASHBOARD
getAdminDashboardData() {
  return this.http.get(
    "http://localhost:3000/admin/dashboard"
  ).toPromise();
}
registeredUsersReport() {
  return this.http.get("http://localhost:3000/admin/registeredusersreport");
}
productMarketPriceReport() {
  return this.http.get(
    "http://localhost:3000/admin/productmarketpricereport"
  );
}
purchaseRequestReport() {
  return this.http.get(
    "http://localhost:3000/admin/purchaserequestreport"
  );
}
purchasereport(data: any) {
  return this.http.post(
    'http://localhost:3000/farmer/purchasereport',
    data
  );
}
paymentreport(data: any) {
  return this.http.post(
    'http://localhost:3000/farmer/paymentreport',
    data
  );
}
}