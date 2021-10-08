import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminComponent } from './admin.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminService } from 'src/app/Service/admin/admin.service';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let myService;
  let mySpy: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,MatDialogModule,NgxPaginationModule,
      RouterTestingModule.withRoutes(
        [{path: 'home', component: AdminComponent}]
      )
      ],
      declarations: [ AdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should be Logout', async(() => {
    spyOn(component, 'Logout');
  
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
  
    fixture.whenStable().then(() => 
    {
      expect(component.Logout).toHaveBeenCalled();
    });
  }));

  it('should call the getbooks method', async(() => 
  {
    fixture.detectChanges();
    spyOn(component, 'getBooks').and.callThrough();
    component.ngOnInit();
    expect(component.getBooks).toHaveBeenCalledTimes(1);
  }));

  it('should call the openEditBook method', async(() => 
  {
    fixture.detectChanges();
    spyOn(component, 'openEditBook').and.callThrough();
    component.ngOnInit();
    expect(component.openEditBook).toHaveBeenCalledTimes(0);
  }));

  it('should call the openAddBook method', async(() => 
  {
    fixture.detectChanges();
    spyOn(component, 'openAddBook').and.callThrough();
    component.ngOnInit();
    expect(component.openAddBook).toHaveBeenCalledTimes(0);
  }));

  it('should call the openDeleteBook method', async(() => 
  {
    fixture.detectChanges();
    spyOn(component, 'openDeleteBook').and.callThrough();
    component.ngOnInit();
    expect(component.openDeleteBook).toHaveBeenCalledTimes(0);
  }));
});

