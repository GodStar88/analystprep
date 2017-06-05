import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class PieChartService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  getData() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    return [
      {
        color: pieColor,
        description: 'Total Answers',
        stats: '2750',
        icon: 'person',
      }, {
        color: pieColor,
        description: 'percentable',
        stats: '63',
        icon: 'money',
      }
      // }, {
      //   color: pieColor,
      //   description: 'dashboard.active_users',
      //   stats: '178,391',
      //   icon: 'face',
      // }, {
      //   color: pieColor,
      //   description: 'dashboard.returned',
      //   stats: '32,592',
      //   icon: 'refresh',
      // }
    ];
  }
}
