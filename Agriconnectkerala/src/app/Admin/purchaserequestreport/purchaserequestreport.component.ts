import { Component, OnInit } from '@angular/core';
import { DbserviceService } from 'src/app/dbservice.service';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-purchaserequestreport',
  templateUrl: './purchaserequestreport.component.html',
  styleUrls: ['./purchaserequestreport.component.scss']
})
export class PurchaserequestreportComponent implements OnInit {

  requestArray: any[] = [];
  filteredRequests: any[] = [];

  searchText = '';

  selectedUserType = 'All';
  selectedStatus = 'All';

  totalRequests = 0;
  pendingRequests = 0;
  acceptedRequests = 0;
  rejectedRequests = 0;

  constructor(private db: DbserviceService) {}

  ngOnInit(): void {
    this.loadPurchaseRequestReport();
  }


  // ==========================================
  // LOAD REPORT
  // ==========================================

  loadPurchaseRequestReport() {

    this.db.purchaseRequestReport().subscribe(
      (result: any) => {

        console.log('Purchase Request Report:', result);

        if (result.message === 'Success') {

          this.requestArray = result.data || [];

          this.filteredRequests = [
            ...this.requestArray
          ];

          this.calculateSummary();

        }

      },
      error => {

        console.error(
          'Error loading purchase request report:',
          error
        );

      }
    );

  }


  // ==========================================
  // SUMMARY
  // ==========================================

  calculateSummary() {

    this.totalRequests =
      this.requestArray.length;

    this.pendingRequests =
      this.requestArray.filter(
        request =>
          request.status &&
          request.status.toLowerCase() === 'pending'
      ).length;

    this.acceptedRequests =
      this.requestArray.filter(
        request =>
          request.status &&
          request.status.toLowerCase() === 'accepted'
      ).length;

    this.rejectedRequests =
      this.requestArray.filter(
        request =>
          request.status &&
          request.status.toLowerCase() === 'rejected'
      ).length;

  }


  // ==========================================
  // SEARCH + FILTER
  // ==========================================

  filterRequests() {

    const search =
      this.searchText
        .toLowerCase()
        .trim();

    this.filteredRequests =
      this.requestArray.filter(request => {

        const product =
          request.productname
            ? request.productname.toLowerCase()
            : '';

        const farmer =
          request.farmername
            ? request.farmername.toLowerCase()
            : '';

        const requester =
          request.requestername
            ? request.requestername.toLowerCase()
            : '';

        const userType =
          request.usertype
            ? request.usertype.toLowerCase()
            : '';

        const matchesSearch =
          product.includes(search) ||
          farmer.includes(search) ||
          requester.includes(search) ||
          userType.includes(search);

        const matchesUserType =
          this.selectedUserType === 'All' ||
          this.normalizeUserType(request.usertype) ===
          this.normalizeUserType(this.selectedUserType);

        const matchesStatus =
          this.selectedStatus === 'All' ||
          this.normalizeStatus(request.status) ===
          this.normalizeStatus(this.selectedStatus);

        return (
          matchesSearch &&
          matchesUserType &&
          matchesStatus
        );

      });

  }


  // ==========================================
  // NORMALIZE USER TYPE
  // ==========================================

  normalizeUserType(value: any): string {

    if (!value) {
      return '';
    }

    const type =
      value.toString().toLowerCase().replace(/\s+/g, '');

    if (type === 'shopowner') {
      return 'shopowner';
    }

    if (type === 'buyer') {
      return 'buyer';
    }

    return type;
  }


  // ==========================================
  // NORMALIZE STATUS
  // ==========================================

  normalizeStatus(value: any): string {

    if (!value) {
      return '';
    }

    return value
      .toString()
      .toLowerCase()
      .trim();

  }


  // ==========================================
  // CLEAR FILTERS
  // ==========================================

  clearFilters() {

    this.searchText = '';

    this.selectedUserType = 'All';

    this.selectedStatus = 'All';

    this.filteredRequests = [
      ...this.requestArray
    ];

  }


  // ==========================================
  // PDF
  // ==========================================

  exportPDF() {

    const doc =
      new jsPDF('landscape');

    doc.setFontSize(18);

    doc.text(
      'Purchase Request Report',
      14,
      15
    );

    doc.setFontSize(10);

    doc.text(
      'Agri Connect Kerala',
      14,
      22
    );

    doc.setFontSize(9);

    doc.text(
      `Total Requests: ${this.filteredRequests.length}`,
      14,
      28
    );


    const data =
      this.filteredRequests.map(
        (request, index) => [

          index + 1,

          request.requestid || '',

          request.productname || '',

          request.farmername || '',

          request.requestername || '',

          this.displayUserType(
            request.usertype
          ),

          request.quantity != null
            ? `${request.quantity} ${request.unit || ''}`
            : '',

          request.offeredprice != null
            ? `Rs. ${request.offeredprice}`
            : '',

          request.requestdate
            ? this.formatDate(
                request.requestdate
              )
            : '',

          request.status || ''

        ]
      );


    autoTable(
      doc,
      {

        head: [[
          '#',
          'Request ID',
          'Product',
          'Farmer',
          'Requester',
          'Type',
          'Quantity',
          'Offered Price',
          'Request Date',
          'Status'
        ]],

        body: data,

        startY: 34,

        theme: 'grid',

        styles: {
          fontSize: 7,
          cellPadding: 2.5
        },

        headStyles: {
          fontSize: 7,
          fontStyle: 'bold'
        }

      }
    );


    doc.save(
      'Purchase_Request_Report.pdf'
    );

  }


  // ==========================================
  // EXCEL
  // ==========================================

  exportExcel() {

    const data =
      this.filteredRequests.map(
        (request, index) => ({

          'Sl No':
            index + 1,

          'Request ID':
            request.requestid || '',

          'Product':
            request.productname || '',

          'Farmer':
            request.farmername || '',

          'Requester':
            request.requestername || '',

          'User Type':
            this.displayUserType(
              request.usertype
            ),

          'Email':
            request.requesteremail || '',

          'Quantity':
            request.quantity || '',

          'Unit':
            request.unit || '',

          'Offered Price':
            request.offeredprice || '',

          'Message':
            request.message || '',

          'District':
            request.district || '',

          'Location':
            request.location || '',

          'Request Date':
            request.requestdate
              ? this.formatDate(
                  request.requestdate
                )
              : '',

          'Status':
            request.status || ''

        })
      );


    const worksheet =
      XLSX.utils.json_to_sheet(data);


    worksheet['!cols'] = [

      { wch: 8 },
      { wch: 12 },
      { wch: 28 },
      { wch: 22 },
      { wch: 22 },
      { wch: 15 },
      { wch: 28 },
      { wch: 12 },
      { wch: 10 },
      { wch: 16 },
      { wch: 30 },
      { wch: 18 },
      { wch: 18 },
      { wch: 18 },
      { wch: 15 }

    ];


    const workbook =
      XLSX.utils.book_new();


    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Purchase Requests'
    );


    XLSX.writeFile(
      workbook,
      'Purchase_Request_Report.xlsx'
    );

  }


  // ==========================================
  // DISPLAY USER TYPE
  // ==========================================

  displayUserType(value: any): string {

    if (!value) {
      return 'N/A';
    }

    const type =
      value.toString().toLowerCase().replace(/\s+/g, '');

    if (type === 'shopowner') {
      return 'Shop Owner';
    }

    if (type === 'buyer') {
      return 'Buyer';
    }

    return value;

  }


  // ==========================================
  // FORMAT DATE
  // ==========================================

  formatDate(date: any): string {

    if (!date) {
      return '';
    }

    return new Date(date).toLocaleDateString(
      'en-GB'
    );

  }

}