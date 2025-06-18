import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Agency } from '../../interfaces/agency.interface';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AgenciesService } from '../../services/agencies.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agencies-list',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatTableModule, MatPaginatorModule, 
      CommonModule, MatSortModule],
  templateUrl: './agencies-list.component.html',
  styleUrl: './agencies-list.component.scss'
})
export class AgenciesListComponent  implements OnInit, AfterViewInit {
  inputValue: string = '';
  agencies: Agency[] = [];

  displayedColumns = ['name', 'id', 'registrationDate', 'address', 'type', 'status', 'actions'];
  dataSource: MatTableDataSource<Agency>;
  searchValue: string = '';
  currentPageIndex = 0;
  pageIndex = 0;
  pageSize = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(private eventsService: AgenciesService) {
    this.dataSource = new MatTableDataSource<Agency>([]);
  }

  async ngOnInit(): Promise<void> {
    await this.getAgencies();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async getAgencies() {
    try {
      this.agencies = await this.eventsService.getAgencies();
      this.dataSource.data = this.agencies;
    } catch (error) {
      console.error('Error loading surveys:', error);
    }
  }

  applyFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onPageChange(agency: PageEvent) {
    this.pageIndex = agency.pageIndex;
    this.pageSize = agency.pageSize;
  }

  goToDetails(agency: Agency) {
    alert('Details for event: ' + agency.name);
  }

  goToEdit(agency: Agency) {
    alert('Edit event: ' + agency.name);
  }

  onDelete(agency: Agency) {
    alert('Delete event: ' + agency.name);
  }
}
