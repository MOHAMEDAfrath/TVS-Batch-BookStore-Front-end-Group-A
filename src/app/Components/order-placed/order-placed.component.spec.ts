import { async,ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { OrderPlacedComponent } from './order-placed.component';


describe('OrderPlacedComponent', () => {
  let component: OrderPlacedComponent;
  let fixture: ComponentFixture<OrderPlacedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [ OrderPlacedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPlacedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should Call GoToHome', async(() => {
    spyOn(component, 'GoToHome');
  
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
  
    fixture.whenStable().then(() => {
      expect(component.GoToHome).toHaveBeenCalled();
    });
  }));

});
