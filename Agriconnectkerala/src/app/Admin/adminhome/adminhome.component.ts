import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DbserviceService } from 'src/app/dbservice.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.scss']
})
export class AdminhomeComponent implements OnInit {

  @ViewChild('myChart') myChart!: ElementRef;
  @ViewChild('userChart') userChart!: ElementRef;

  // ==============================
  // DASHBOARD COUNTS
  // ==============================

  totalFarmers: number = 0;
  totalBuyers: number = 0;
  totalShopOwners: number = 0;
  totalProducts: number = 0;
  totalRequests: number = 0;
  pendingShopOwners: number = 0;

  // Purchase Request Status
  pendingRequests: number = 0;
  acceptedRequests: number = 0;
  rejectedRequests: number = 0;

  // Charts
  chart: any;
  userChartInstance: any;

  constructor(private db: DbserviceService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }


  // ==============================
  // LOAD DASHBOARD DATA
  // ==============================

loadDashboardData() {

  this.db.getAdminDashboardData().then((result: any) => {

    console.log("Dashboard Data:", result);

    if (result.status === "success") {

      // Existing dashboard data
      this.totalFarmers = result.totalFarmers;
      this.totalBuyers = result.totalBuyers;
      this.totalShopOwners = result.totalShopOwners;
      this.totalProducts = result.totalProducts;
      this.totalRequests = result.totalRequests;
      this.pendingShopOwners = result.pendingShopOwners;

      // Purchase request status data
      this.pendingRequests = result.pendingRequests;
      this.acceptedRequests = result.acceptedRequests;
      this.rejectedRequests = result.rejectedRequests;

      // DEBUG
      console.log("Pending Requests:", result.pendingRequests);
      console.log("Accepted Requests:", result.acceptedRequests);
      console.log("Rejected Requests:", result.rejectedRequests);

      // Create charts after database data is loaded
      setTimeout(() => {

        this.createSystemOverviewChart();

        this.createUserDistributionChart();

      }, 100);

    }

  }).catch((error) => {

    console.log("Dashboard Error:", error);

  });

}


  // ==============================
  // SYSTEM OVERVIEW BAR CHART
  // ==============================

  createSystemOverviewChart() {

    if (!this.myChart) {
      return;
    }

    // Destroy old chart
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(this.myChart.nativeElement, {

      type: 'bar',

      data: {

        labels: [
          'Farmers',
          'Buyers',
          'Shop Owners',
          'Products',
          'Purchase Requests',
          'Pending Requests'
        ],

        datasets: [

          {
            label: 'Total Count',

            data: [
              this.totalFarmers,
              this.totalBuyers,
              this.totalShopOwners,
              this.totalProducts,
              this.totalRequests,
              this.pendingShopOwners
            ],

            borderWidth: 0,
            borderRadius: 8,
            borderSkipped: false
          }

        ]

      },

      options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

          legend: {
            display: true,
            position: 'top'
          },

          tooltip: {
            enabled: true
          }

        },

        scales: {

          x: {

            grid: {
              display: false
            }

          },

          y: {

            beginAtZero: true,

            ticks: {
              precision: 0
            },

            grid: {
              display: true
            }

          }

        }

      }

    });

  }


  // ==============================
  // USER DISTRIBUTION DONUT CHART
  // ==============================

  createUserDistributionChart() {

    if (!this.userChart) {
      return;
    }

    // Destroy old chart
    if (this.userChartInstance) {
      this.userChartInstance.destroy();
    }

    this.userChartInstance = new Chart(this.userChart.nativeElement, {

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

            borderWidth: 0
          }

        ]

      },

      options: {

        responsive: true,

        maintainAspectRatio: false,

        cutout: '65%',

        plugins: {

          legend: {
            display: true,
            position: 'bottom'
          },

          tooltip: {
            enabled: true
          }

        }

      }

    });

  }

}