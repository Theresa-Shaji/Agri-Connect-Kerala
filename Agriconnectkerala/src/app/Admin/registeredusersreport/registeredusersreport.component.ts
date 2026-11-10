import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import { DbserviceService } from 'src/app/dbservice.service';
import Chart from 'chart.js/auto';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-registeredusersreport',
  templateUrl: './registeredusersreport.component.html',
  styleUrls: ['./registeredusersreport.component.scss']
})
export class RegisteredusersreportComponent implements OnInit, AfterViewInit {

  @ViewChild('userChart') userChart!: ElementRef;

  chart: any;

  userArray: any[] = [];
  filteredUsers: any[] = [];

  totalUsers = 0;
  totalFarmers = 0;
  totalShopOwners = 0;
  totalBuyers = 0;

  searchText = '';
  selectedUserType = 'All';
  selectedDistrict = 'All';

  districtArray: any[] = [];

  constructor(private db: DbserviceService) {}

  ngOnInit(): void {
    this.loadRegisteredUsers();
  }

  ngAfterViewInit(): void {
    // Chart will be created after API data is loaded
  }


  // ==========================================
  // LOAD REGISTERED USERS
  // ==========================================

  loadRegisteredUsers() {

    this.db.registeredUsersReport().subscribe(
      (result: any) => {

        if (result.message === 'Success') {

          this.userArray = result.data || [];

          this.filteredUsers = [...this.userArray];

          // Total Users
          this.totalUsers = this.userArray.length;

          // Farmers
          this.totalFarmers = this.userArray.filter(
            user => user.usertype === 'Farmer'
          ).length;

          // Shop Owners
          this.totalShopOwners = this.userArray.filter(
            user => user.usertype === 'Shop Owner'
          ).length;

          // Buyers
          this.totalBuyers = this.userArray.filter(
            user => user.usertype === 'Buyer'
          ).length;

          // Unique Districts
          this.districtArray = [
            ...new Set(
              this.userArray
                .map(user => user.district)
                .filter(district => district)
            )
          ];

          // Create chart after DOM is ready
          setTimeout(() => {
            this.createUserChart();
          }, 100);

        }

      },
      error => {

        console.error(
          'Error loading registered users:',
          error
        );

      }
    );

  }


  // ==========================================
  // CREATE DOUGHNUT CHART
  // ==========================================

  createUserChart() {

    if (!this.userChart) {
      return;
    }

    // Destroy old chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(
      this.userChart.nativeElement,
      {
        type: 'doughnut',

        data: {

          labels: [
            'Farmers',
            'Shop Owners',
            'Buyers'
          ],

          datasets: [
            {
              data: [
                this.totalFarmers,
                this.totalShopOwners,
                this.totalBuyers
              ],

              borderWidth: 2
            }
          ]

        },

        options: {

          responsive: true,

          maintainAspectRatio: false,

          cutout: '65%',

          plugins: {

            legend: {
              position: 'bottom',

              labels: {
                padding: 18,
                usePointStyle: true
              }
            },

            tooltip: {
              callbacks: {

                label: function(context) {

                  const value =
                    context.raw as number;

                  const total =
                    context.dataset.data
                      .reduce(
                        (sum: number, current: any) =>
                          sum + Number(current),
                        0
                      );

                  const percentage =
                    total > 0
                      ? ((value / total) * 100).toFixed(1)
                      : '0';

                  return ` ${value} Users (${percentage}%)`;

                }

              }

            }

          }

        }

      }
    );

  }


  // ==========================================
  // SEARCH + FILTER
  // ==========================================

  filterUsers() {

    const search =
      this.searchText
        .toLowerCase()
        .trim();

    this.filteredUsers =
      this.userArray.filter(user => {

        const name =
          user.name
            ? user.name.toLowerCase()
            : '';

        const email =
          user.email
            ? user.email.toLowerCase()
            : '';

        const phone =
          user.phone
            ? user.phone.toString()
            : '';

        const matchesSearch =
          name.includes(search) ||
          email.includes(search) ||
          phone.includes(search);

        const matchesType =
          this.selectedUserType === 'All' ||
          user.usertype === this.selectedUserType;

        const matchesDistrict =
          this.selectedDistrict === 'All' ||
          user.district === this.selectedDistrict;

        return (
          matchesSearch &&
          matchesType &&
          matchesDistrict
        );

      });

  }


  // ==========================================
  // CLEAR FILTERS
  // ==========================================

  clearFilters() {

    this.searchText = '';

    this.selectedUserType = 'All';

    this.selectedDistrict = 'All';

    this.filteredUsers = [
      ...this.userArray
    ];

  }


  // ==========================================
  // PDF EXPORT
  // ==========================================

  exportPDF() {

    const doc =
      new jsPDF('landscape');

    // Title
    doc.setFontSize(18);

    doc.text(
      'Registered Users Report',
      14,
      15
    );

    // Subtitle
    doc.setFontSize(10);

    doc.text(
      'Agri Connect Kerala',
      14,
      22
    );

    // Total
    doc.setFontSize(9);

    doc.text(
      `Total Users: ${this.filteredUsers.length}`,
      14,
      28
    );

    // Table data
    const data =
      this.filteredUsers.map(
        (user, index) => [

          index + 1,

          user.name || '',

          user.usertype || '',

          user.email || '',

          user.phone || '',

          user.district || '',

          user.location || '',

          user.regdate
            ? new Date(
                user.regdate
              ).toLocaleDateString('en-GB')
            : '',

          user.status == 1
            ? 'Active'
            : user.status || ''

        ]
      );

    autoTable(
      doc,
      {

        head: [[
          '#',
          'Name',
          'User Type',
          'Email',
          'Phone',
          'District',
          'Location',
          'Registration Date',
          'Status'
        ]],

        body: data,

        startY: 34,

        theme: 'grid',

        styles: {
          fontSize: 8,
          cellPadding: 3
        },

        headStyles: {
          fontSize: 8,
          fontStyle: 'bold'
        }

      }
    );

    doc.save(
      'Registered_Users_Report.pdf'
    );

  }


  // ==========================================
  // EXCEL EXPORT
  // ==========================================

  exportExcel() {

    const data =
      this.filteredUsers.map(
        (user, index) => ({

          'Sl No':
            index + 1,

          'Name':
            user.name || '',

          'User Type':
            user.usertype || '',

          'Email':
            user.email || '',

          'Phone':
            user.phone || '',

          'District':
            user.district || '',

          'Location':
            user.location || '',

          'Registration Date':
            user.regdate
              ? new Date(
                  user.regdate
                ).toLocaleDateString('en-GB')
              : '',

          'Status':
            user.status == 1
              ? 'Active'
              : user.status || ''

        })
      );

    const worksheet =
      XLSX.utils.json_to_sheet(
        data
      );

    // Excel column widths
    worksheet['!cols'] = [

      { wch: 8 },
      { wch: 25 },
      { wch: 18 },
      { wch: 32 },
      { wch: 18 },
      { wch: 18 },
      { wch: 20 },
      { wch: 20 },
      { wch: 15 }

    ];

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Registered Users'
    );

    XLSX.writeFile(
      workbook,
      'Registered_Users_Report.xlsx'
    );

  }


  // ==========================================
  // DESTROY CHART
  // ==========================================

  ngOnDestroy(): void {

    if (this.chart) {
      this.chart.destroy();
    }

  }

}