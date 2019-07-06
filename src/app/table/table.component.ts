import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { PaginationService } from '../services/pagination.service';
import { GlobalService } from 'src/global';


@Component({
  selector: 'ngx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers:[]
})
export class TableComponent implements OnInit, OnChanges {
  @Input() tableHeaders;
  @Input() dataSource;
  @Input() rowData;
  @Input() editTable;
  @Input() deleteTable;
  @Input() pipeData;
  @Input() viewTable;
  @Input() currentPage1 = 1
  @Input() moreItemsAvailable = true;
  @Input() tableupperclass = false;
  @Output() viewTab: EventEmitter<any> = new EventEmitter<any>();
  @Output() editTab: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteTab: EventEmitter<any> = new EventEmitter<any>();
  @Output() moreRecords: EventEmitter<any> = new EventEmitter<any>();
  pagedItems = [];
  currentPage = 1
  search = '';
  pager;
  displayMoreTrans = false;
  Arr = Array;
  loading: boolean = false;
  constructor(private pagerService: PaginationService, public global: GlobalService ) {
  }

  ngOnInit() {
    console.log('table headers', this.tableHeaders, 'rdd', this.rowData)

  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('ss',changes)
    if (this.currentPage1) {
      this.setPage(this.currentPage1)
    } else {
      this.setPage(this.currentPage)
    }
  }


  handleEvent(event, value, index) {
    console.log('event', event, '--', value, '--', this.pagedItems)
    if (event == 'delete') {
      this.deleteTab.emit({ value, event, index })
    }
    else if (event == 'edit') {
      this.editTab.emit({ value, event, index })
    }
    else if (event == 'view') {
      this.viewTab.emit({ value, event, index })
    }
  }


  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.rowData.length, page, 6);
    this.pagedItems = this.rowData.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log('pageditems', this.pagedItems, 'page', page, 'pager', this.pager)
    this.currentPage = page;
    // you should see show more option only when you are in last page displayMoreTrans will serve that purpose
    if (page >= this.pager.totalPages) {
      this.displayMoreTrans = true;
    } else {
      this.displayMoreTrans = false;
    }
  }

  getMoreRecords() {
    this.moreRecords.emit({
      currentPage: this.currentPage,
      totalPages: String(this.rowData.length)
    })
  }
  displaytext() {
    this.setPage(1)
    console.log(this.pager, this.pagedItems, this.currentPage)
  }
  getData() {
    console.log("this.rowdata", this.rowData)
  }
}
