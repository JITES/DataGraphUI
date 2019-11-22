import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DataTableItem {
  Period: string;
  Product: string;
  Region: string;
  Gross: string;
  Margin: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableItem[] = [
  {Period:"Q1 2019", Product:"Vindic",Region:"US",Gross:"6.2M",Margin:"6%"},
  {Period:"Q2 2019", Product:"Customary",Region:"US",Gross:"4.7M",Margin:"8%"},
  {Period:"Q3 2019", Product:"Manham",Region:"US",Gross:"9.1M",Margin:"8%"},
  {Period:"Q4 2019", Product:"Amsrott",Region:"US",Gross:"5.6M",Margin:"10%"},
  {Period:"Q1 2020", Product:"Quanpix",Region:"EMEA",Gross:"11.87M",Margin:"6%"},
  {Period:"Q2 2020", Product:"Pacemtol",Region:"EMEA",Gross:"23.42M",Margin:"10%"},
  {Period:"Q3 2020", Product:"Preqana",Region:"EMEA",Gross:"43.26M",Margin:"8%"},
  {Period:"Q4 2020", Product:"Sudol",Region:"EMEA",Gross:"7.44M",Margin:"10%"},
];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'Period': return compare(a.Period, b.Period, isAsc);
        case 'Product': return compare(+a.Product, +b.Product, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
