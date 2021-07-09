import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgForm } from '@angular/forms';
import { ApiMessage } from 'src/app/constants/apiMessage';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Restaurant } from 'src/app/models/models';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogComponent } from '../../common-dialog/common-dialog.component';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('restaurantAddForm')
  restaurantAddForm!: NgForm;

  public displayedColumns: string[] = ['id', 'name', 'description', 'action'];
  public dataSource!: MatTableDataSource<Restaurant>;

  public restaurant = {
    name: null,
    pictures: null,
    isError : false
  };
  public restaurants: Restaurant[] = [];
  public dialogBody = {};

  constructor(
    private apiMsg: ApiMessage,
    private restaurantSvc: RestaurantService,
    private snackBarSvc: SnackbarService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getRestaurants();
  }

  getRestaurants(): void {
    this.restaurantSvc.getRestaurants('id').subscribe(restaurants => {
      this.restaurants = restaurants;
      this.showData();
    }, error => {
      console.log('ERROR :: ', error);
    });
  }

  showData(): void {
    this.restaurants.forEach((res: any) => {
      res.isEdit = res.isError = false;
      res.updateRestaurantName = res.name;
    });
    this.dataSource = new MatTableDataSource(this.restaurants);
    this.dataSource.paginator = this.paginator;
  }

  createRestaurant(): void {
    // this.incident.name = this.incident.name.trim();
    this.restaurantSvc.createRestaurant(this.restaurant).subscribe((data) => {
      this.restaurants.unshift(data);
      // this.getIncidentSvc.getIncidentList(this.incidents);
      this.getRestaurants();
      this.snackBarSvc.open(this.apiMsg.APPLICATION_RESULT.CREATE_RESTAURANT, 3000);
      // this.incident.name = null;
      // this.incident.start_from = null;
      this.restaurantAddForm.resetForm();
    }, error => {
      console.log('ERROR :: ', error);
    });
  }

  updateRestaurant(restaurant: any, isCancel: boolean = false): void {
    restaurant.isEdit = !restaurant.isEdit;
    if (isCancel) {
      restaurant.isError = false;
      restaurant.updateRestaurantName = restaurant.name;
      return;
    }
    if (!restaurant.isEdit) {
      restaurant.name = restaurant.updateRestaurantName.trim();
      this.restaurantSvc.updateRestaurant(restaurant.id, restaurant).subscribe((data) => {
        restaurant.updateRestaurantName = data.name;
        // if (String(incident.id) === this.incidentSvc.incidentID) {
        //   this.incidentSvc.incidentName = data.name;
        // }
        this.snackBarSvc.open(this.apiMsg.APPLICATION_RESULT.UPDATE_RESTAURANT, 3000);
        this.getRestaurants();
      }, error => {
        console.log('ERROR :: ', error);
        restaurant.updateRestaurantName = restaurant.name;
      });
    }
  }

  public deleteRestaurant(restaurant: any, index: number): void {
    console.log(">>> ", restaurant);
    this.dialogBody = {
      title: this.apiMsg.APPLICATION_CONFIRM.DELETE,
      body: restaurant,
      action: 'DELETE'
    };
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      data: this.dialogBody
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.restaurantSvc.deleteRestaurant(restaurant.id).subscribe(data => {
        // this.restaurants.splice(index, 1);
        this.restaurants.unshift(data);
        this.getRestaurants();
        this.snackBarSvc.open(this.apiMsg.APPLICATION_RESULT.HARD_DELETE_RESTAURANT);
      }, error => {
        console.log('error while deleting :: ', error);
      });
    });
  }
  
  // (input)="isNoValue(restaurant,$event.target.value)"
  public isNoValue(data: any): void {
    data.isError = !data.name.trim();
  }

}
