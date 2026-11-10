import { Component, OnInit } from '@angular/core';
import { DbserviceService } from 'src/app/dbservice.service';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-productmarketpricereport',
  templateUrl: './productmarketpricereport.component.html',
  styleUrls: ['./productmarketpricereport.component.scss']
})
export class ProductmarketpricereportComponent implements OnInit {

  productArray: any[] = [];
  filteredProducts: any[] = [];

  searchText = '';
  selectedCategory = 'All';
  selectedDistrict = 'All';
  selectedStatus = 'All';

  categoryArray: string[] = [];
  districtArray: string[] = [];

  totalProducts = 0;
  availableProducts = 0;
  soldProducts = 0;
  productsWithPrice = 0;

  constructor(private db: DbserviceService) {}

  ngOnInit(): void {
    this.loadProductMarketPriceReport();
  }


  // ==========================================
  // LOAD REPORT
  // ==========================================

  loadProductMarketPriceReport() {

    this.db.productMarketPriceReport().subscribe(
      (result: any) => {

        if (result.message === 'Success') {

          this.productArray = result.data || [];

          this.filteredProducts = [
            ...this.productArray
          ];

          this.totalProducts =
            this.productArray.length;

          this.availableProducts =
            this.productArray.filter(
              product =>
                product.status === 'Available'
            ).length;

          this.soldProducts =
            this.productArray.filter(
              product =>
                product.status === 'Sold'
            ).length;

          this.productsWithPrice =
            this.productArray.filter(
              product =>
                product.marketprice !== null &&
                product.marketprice !== undefined
            ).length;


          // Categories
          this.categoryArray = [
            ...new Set(
              this.productArray
                .map(product => product.categoryname)
                .filter(category => category)
            )
          ];


          // Districts
          this.districtArray = [
            ...new Set(
              this.productArray
                .map(product => product.district)
                .filter(district => district)
            )
          ];

        }

      },
      error => {

        console.error(
          'Error loading product market price report:',
          error
        );

      }
    );

  }


  // ==========================================
  // SEARCH + FILTER
  // ==========================================

  filterProducts() {

    const search =
      this.searchText
        .toLowerCase()
        .trim();

    this.filteredProducts =
      this.productArray.filter(product => {

        const productName =
          product.productname
            ? product.productname.toLowerCase()
            : '';

        const category =
          product.categoryname
            ? product.categoryname.toLowerCase()
            : '';

        const farmer =
          product.farmername
            ? product.farmername.toLowerCase()
            : '';

        const matchesSearch =
          productName.includes(search) ||
          category.includes(search) ||
          farmer.includes(search);

        const matchesCategory =
          this.selectedCategory === 'All' ||
          product.categoryname === this.selectedCategory;

        const matchesDistrict =
          this.selectedDistrict === 'All' ||
          product.district === this.selectedDistrict;

        const matchesStatus =
          this.selectedStatus === 'All' ||
          product.status === this.selectedStatus;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesDistrict &&
          matchesStatus
        );

      });

  }


  // ==========================================
  // CLEAR FILTERS
  // ==========================================

  clearFilters() {

    this.searchText = '';

    this.selectedCategory = 'All';

    this.selectedDistrict = 'All';

    this.selectedStatus = 'All';

    this.filteredProducts = [
      ...this.productArray
    ];

  }


  // ==========================================
  // PDF EXPORT
  // ==========================================

  exportPDF() {

    const doc =
      new jsPDF('landscape');

    doc.setFontSize(18);

    doc.text(
      'Product & Market Price Report',
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
      `Total Products: ${this.filteredProducts.length}`,
      14,
      28
    );


    const data =
      this.filteredProducts.map(
        (product, index) => [

          index + 1,

          product.productname || '',

          product.categoryname || '',

          product.farmername || '',

          product.quantity
            ? `${product.quantity} ${product.unit || ''}`
            : '',

          product.quality || '',

          product.expectedprice != null
            ? `Rs. ${product.expectedprice}`
            : '',

          product.marketprice != null
            ? `Rs. ${product.marketprice}`
            : 'N/A',

          product.trend || 'N/A',

          product.district || '',

          product.status || ''

        ]
      );


    autoTable(
      doc,
      {

        head: [[
          '#',
          'Product',
          'Category',
          'Farmer',
          'Quantity',
          'Quality',
          'Expected Price',
          'Market Price',
          'Trend',
          'District',
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
      'Product_Market_Price_Report.pdf'
    );

  }


  // ==========================================
  // EXCEL EXPORT
  // ==========================================

  exportExcel() {

    const data =
      this.filteredProducts.map(
        (product, index) => ({

          'Sl No':
            index + 1,

          'Product Name':
            product.productname || '',

          'Category':
            product.categoryname || '',

          'Farmer':
            product.farmername || '',

          'Quantity':
            product.quantity || '',

          'Unit':
            product.unit || '',

          'Quality':
            product.quality || '',

          'Expected Price':
            product.expectedprice || '',

          'Market Price':
            product.marketprice != null
              ? product.marketprice
              : 'N/A',

          'Price Unit':
            product.priceunit || '',

          'Price Trend':
            product.trend || 'N/A',

          'District':
            product.district || '',

          'Location':
            product.location || '',

          'Upload Date':
            product.uploaddate
              ? new Date(
                  product.uploaddate
                ).toLocaleDateString('en-GB')
              : '',

          'Price Updated Date':
            product.priceupdatedate
              ? new Date(
                  product.priceupdatedate
                ).toLocaleDateString('en-GB')
              : 'N/A',

          'Status':
            product.status || ''

        })
      );


    const worksheet =
      XLSX.utils.json_to_sheet(data);


    worksheet['!cols'] = [

      { wch: 8 },
      { wch: 28 },
      { wch: 18 },
      { wch: 22 },
      { wch: 12 },
      { wch: 10 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 12 },
      { wch: 15 },
      { wch: 18 },
      { wch: 18 },
      { wch: 18 },
      { wch: 22 },
      { wch: 15 }

    ];


    const workbook =
      XLSX.utils.book_new();


    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Product Market Price'
    );


    XLSX.writeFile(
      workbook,
      'Product_Market_Price_Report.xlsx'
    );

  }

}