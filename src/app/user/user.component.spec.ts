import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { DataService } from '../shared/data.service';

describe('UserComponent', () => {
  let userComponent: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ]
    })
    .compileComponents(); //using CLI webpack will do this automatically
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    userComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the userComponent', () => {
    expect(userComponent).toBeTruthy();
  });

  it('should get the user name from the service', ()=>{
    const userService = fixture.debugElement.injector.get(UserService);   
    expect(userService.user.name).toEqual(userComponent.user.name);
  });

  it('should display the user name if the user is logged in',()=>{
    const compiled = fixture.debugElement.nativeElement;
    userComponent.isLoggedIn = true;
    fixture.detectChanges();
    expect(compiled.querySelector('p').textContent).toContain(userComponent.user.name);
  });


  it('shouldn\'t display the user name if the user is not logged in',()=>{
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('p').textContent).not.toContain(userComponent.user.name);
  });

  it('shouldn\'t fecth the data if not called async!', ()=>{
    // we don't not execute the getDetails it might reach out to the server and we DO NOT want to do that 
    // when Testing. Hence we create a feake call by using spyOn 
    const dataService = fixture.debugElement.injector.get(DataService);  
    //we listen whenever getDetails() is executed! and we won't run it and we will return a value of our own.
    //this will simulate a fake execution of getDetails and will return Our value Promise.resolve('Data') and it will run async.
    let spy = spyOn(dataService,'getDetails')
    .and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    expect(userComponent.data).toBe(undefined);
  });

  //1st alternative
  it('should fecth the data async! (1st alternative)', async(()=>{    
    const dataService = fixture.debugElement.injector.get(DataService);  
    let spy = spyOn(dataService,'getDetails')
    .and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    //this allow us to react when all asyn are finished
    fixture.whenStable().then(()=>{
      expect(userComponent.data).toBe('Data');
    });    
  }));
  
  //2nd alternative  
  it('should fetch data successfully if called asynchronously', fakeAsync(() => {
    //we need to recreate the component otherwise it wouldn't work
    let fixture = TestBed.createComponent(UserComponent);
    let userComponent = fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, 'getDetails')
      .and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    tick();
    expect(userComponent.data).toBe('Data');

  }));
});
