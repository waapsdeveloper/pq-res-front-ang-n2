import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  countries: any[] = [];

  constructor(private network: NetworkService) { }

  async getCountries(): Promise<any[]> {

    if(this.countries.length !== 0){
      return this.countries;
    }
    const res = await this.network.getCountries();
    this.countries = res.countries;
    return this.countries;
  }


}
