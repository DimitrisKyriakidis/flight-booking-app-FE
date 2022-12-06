export class SearchFlightFilters {
  filters: {
    from?: string;
    to?: string;
    dateFrom?: string;
    dateTo?: string;
    seatType?: string;
    passengers?: number;
  };
  sortColValue?: number | string;
  sortOrderValue?: string;
}
