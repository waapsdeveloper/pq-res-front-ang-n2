import {
  Component,
  EventEmitter,
  HostListener,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BasePage } from '../../base-page/base-page';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-table-listing',
  standalone: false,

  templateUrl: './table-listing.component.html',
  styleUrl: './table-listing.component.scss',
})
export class TableListingComponent extends BasePage implements OnInit {
  list: any[] = [];
  filteredList: any[] = [];
  floors: any[] = [];
  restaurantId: any;
  guestCount = 0;
  branches: any[] = [];
  selectedBranch: any;
  userr: any;
  minDate = new Date().toISOString().split('T')[0];
  isGuest = false;

  selectedFloor = 'First';

  name = '';
  phone = '';

  private _params: any;
  @Input()
  public set params(v: any) {
    this._params = v;
    this.setObjectReceived(v);
  }

  public get params(): any {
    return this._params;
  }

  selectedTable = '';
  selectedDate = '';
  selectedTime = '';
  selectedGuestCount = '';
  //filteredTables: any[] = [];

  hostScreensize = -1;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateColumnClass(event.target.innerWidth);
  }

  updateColumnClass(width: number) {
    this.hostScreensize = width; //<= 1300 ? 'col-md-12' : 'col-md-9';
  }

  constructor(injector: Injector, private user: UsersService) {
    super(injector);
  }
  async ngOnInit() {
    this.initialize();
    this.updateColumnClass(window.innerWidth);
    this.restaurantId = localStorage.getItem('restaurant_id');
    const res = await this.network.allBranches();

    this.branches = res?.data;
    console.log('this is the branches', this.branches);
    setTimeout(() => {
      this.updateGuestCount(this.selectedGuestCount);
    }, 1200);
  }

  async initialize() {
    let user = await this.user.getUser();

    if (user) {
      this.userr = typeof user === 'string' ? JSON.parse(user) : user;
    }
  }

  setSelected(item: any) {
    item.selected = !item.selected;
  }

  setFloor(fl: any) {
    this.selectedFloor = fl;
    this.filteredList = this.list.filter((item: any) => {
      return item.floor === this.selectedFloor;
    });
  }

  async setObjectReceived(data: any) {
    console.log(data);

    if (data['no_of_guests']) {
      this.selectedGuestCount = data['no_of_guests'];
    }

    if (data['date']) {
      this.selectedDate = data['date'];
    }

    if (data['time']) {
      this.selectedTime = data['time'];
    }

    const restaurantId = String(localStorage.getItem('restaurant_id'));
    let obj = {
      restaurant_id: restaurantId,
    };

    obj = Object.assign(obj, data);

    const res = await this.network.getTablesByRestaurantId(
      obj,
      parseInt(restaurantId)
    );
    console.log(res);

    if (res.restaurant && res.restaurant.length > 0) {
      this.list = res.restaurant;
      this.floors = res.floors;

      this.filteredList = this.list.filter((item: any) => {
        return item.floor === this.floors[0];
      });
    }
  }

  filterFloors($event: any) {
    console.log($event);

    this.filteredList = this.list.filter((item: any) => {
      return item.floor === $event;
    });
  }

  async startBooking() {
    const user = await this.users.getUser();

    console.log(user,"this is my user");

    if (!user) {
      this.utility.presentFailureToast('Please login to book a table');
      this.nav.push('tabs/login', {
        backUrl: '/tabs/tables',
      });
      return;
    }

    // get selected tables
    const selected = this.list
      .filter((x: any) => x.selected)
      .map((x: any) => x.id);
    console.log(selected);

    if (selected.length == 0) {
      this.utility.presentFailureToast('Please select a table to book');
      return;
    }

    // prepare booking data
    if (
      this.selectedDate == '' ||
      this.selectedTime == '' ||
      this.selectedGuestCount == ''
    ) {
      this.utility.presentFailureToast(
        'Please select date, time and guest count'
      );
      return;
    }

    // let startTIme = this.selectedDate + ' ' + this.selectedTime;
    // // add 1 hour
    // let endTime =

    // Combine date and time into a single string
    let startTimeString = this.selectedDate + ' ' + this.selectedTime;

    // Create a new Date object
    let startTime = new Date(startTimeString);

    // Add 1 hour (3600000 milliseconds)
    let endTime = new Date(startTime.getTime() + 3600000);

    // Format the end time to 'YYYY-MM-DD HH:MM'
    let year = endTime.getFullYear();
    let month = String(endTime.getMonth() + 1).padStart(2, '0');
    let day = String(endTime.getDate()).padStart(2, '0');
    let hours = String(endTime.getHours()).padStart(2, '0');
    let minutes = String(endTime.getMinutes()).padStart(2, '0');

    let formattedEndTime = `${year}-${month}-${day} ${hours}:${minutes}`;

    console.log('Start Time:', startTimeString);
    console.log('End Time:', formattedEndTime);

    let bookingData = {
      name: this.userr?.name,
      phone: this.userr?.phone,
      tables: selected,
      no_of_seats: this.selectedGuestCount,
      start_time: startTimeString + ':00',
      end_time: formattedEndTime + ':00',
    };

    // get if user is logged in
    // const user = await this.users.getLoginUser();
    // console.log(user);
    // if (!user) {
    //   this.nav.push('/tabs/login');
    //   return;
    // }

    console.log(bookingData);
    const res = await this.network.setTableBooking(bookingData);
    console.log(res);

    if (res && res.booking) {
      this.nav.push('/tabs/table-booking-tracker/' + res.booking.order_number);
      this.formData = {
        no_of_guests: '',
        date: '',
        time: '',
      };
      let isGuestLogin = localStorage.getItem('guestLogin');
      if (isGuestLogin) {
        localStorage.removeItem('guestLogin');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    } else {
      this.utility.presentFailureToast(
        'Failed to book table, please try again later'
      );
    }

    // if (res && res.booking) {
    //   this.utility.presentSuccessToast(
    //     'Table booked successfully - we will contact you shortly, Thank you!'
    //   );

    //   this.formData = {
    //     no_of_guests: '',
    //     date: '',
    //     time: '',
    //   };
    //   setTimeout(() => {
    //     this.nav.pop();
    //   }, 1500);

    //   // sthis.nav.pop();
    //   // this.nav.push('/tabs/booking-checkout', { booking: JSON.stringify(res.booking) });
    // }
  }

  formData = {
    no_of_guests: '',
    date: '',
    time: '',
  };

  @Output('onAction') onAction = new EventEmitter<any>();

  async formSubmit() {
    console.log(this.formData);

    if (!this.formData.no_of_guests) {
      this.utility.presentFailureToast('Please enter number of guests');
      return;
    }

    if (!this.formData.date) {
      this.utility.presentFailureToast('Which date you are about to visit');
      return;
    }

    if (!this.formData.time) {
      this.utility.presentFailureToast('Which time you are about to visit');
      return;
    }

    this.onAction.emit(this.formData);

    // const res = await this.network.checkTableAvailability(this.formData);

    // console.log(res);
  }

  updateGuestCount($event: any) {
    console.log($event);
    if (!this.list || this.list.length === 0) {
      console.log('No tables available yet.');
      return;
    }

    this.filteredList = this.list.filter((item: any) => {
      return item.no_of_seats >= $event;
    });

    console.log('Filtered Tables:', this.filteredList);
  }
  update() {
    if (this.selectedBranch) {
      console.log('This is selected branch', this.selectedBranch);
    }
  }
  async loginUser() {
    this.nav.push('/tabs/login', {
      backUrl: 'tabs/tables',
    });
  }
}
