import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { EventsService } from '../../services/events.service';
import { Events } from '../../interfaces/events.interface';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatTableModule, MatPaginatorModule, 
    CommonModule, MatSortModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit, AfterViewInit {
  inputValue: string = '';
  events: Events[] = [];

  displayedColumns = ['name', 'date', 'venue', 'agency', 'status', 'actions'];
  dataSource: MatTableDataSource<Events>;
  searchValue: string = '';
  currentPageIndex = 0;
  pageIndex = 0;
  pageSize = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(private eventsService: EventsService) {
    this.dataSource = new MatTableDataSource<Events>([]);
  }

  async ngOnInit(): Promise<void> {
    await this.getEvents();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async getEvents() {
    try {
      // this.events = await this.eventsService.getEvents();
      // this.dataSource.data = this.events;
      this.dataSource.data = [];
    } catch (error) {
      console.error('Error loading surveys:', error);
    }
  }

  applyFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  goToDetails(event: Events) {
    alert('Details for event: ' + event.name);
  }

  goToEdit(event: Events) {
    alert('Edit event: ' + event.name);
  }

  onDelete(event: Events) {
    alert('Delete event: ' + event.name);
  }

}
