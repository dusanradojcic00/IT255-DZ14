import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsoleSpy } from '../utils';
import { By } from '@angular/platform-browser';
import { FormAddValidateComponent } from './form-add-validate.component';
import { Room } from '../room/room.model';

describe('FormAddValidateComponent', () => {
  let component: FormAddValidateComponent;
  let fixture: ComponentFixture<FormAddValidateComponent>;

  let originalConsole, fakeConsole;

  let element, input, form;

  beforeEach(async () => {
    fakeConsole = new ConsoleSpy();
    originalConsole = window.console;
    (<any>window).console = fakeConsole;
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [FormAddValidateComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddValidateComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  afterAll(() => (<any>window).console = originalConsole)

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.myForm.valid).toBeFalsy();
  });

  it('Name invalid when empty', fakeAsync(() => {
    let name = component.myForm.controls['name'];
    expect(name.valid).toBeFalsy();
  }));

  it('Name invalid when not starting with a capital letter', fakeAsync(() => {
    let name = component.myForm.controls['name'];
    name.setValue('lowerCase');
    expect(name.valid).toBeFalsy();
  }));

  it('Name is valid when starting with a capital letter', fakeAsync(() => {
    let name = component.myForm.controls['name'];
    name.setValue('UpperCase');
    expect(name.valid).toBeTruthy();
  }))

  it('Price is invalid when empty', fakeAsync(() => {
    let price = component.myForm.controls['price'];
    expect(price.valid).toBeFalsy();
  }));

  it('Score is invalid when empty', fakeAsync(() => {
    let score = component.myForm.controls['score'];
    expect(score.valid).toBeFalsy();
  }));

  it('Score is valid when between 1 and 10 (including)', fakeAsync(() => {
    let score = component.myForm.controls['score'];
    score.setValue(1);
    expect(score.valid).toBeTruthy();
    score.setValue(2);
    expect(score.valid).toBeTruthy();
    score.setValue(5);
    expect(score.valid).toBeTruthy();
    score.setValue(9);
    expect(score.valid).toBeTruthy();
    score.setValue(10);
    expect(score.valid).toBeTruthy();
  }));

  it('Score is valid when lower than 1', fakeAsync(() => {
    let score = component.myForm.controls['score'];
    score.setValue(0.9);
    expect(score.valid).toBeFalsy();
    score.setValue(0);
    expect(score.valid).toBeFalsy();
    score.setValue(-1);
    expect(score.valid).toBeFalsy();
  }));

  it('Score is valid when higher than 10', fakeAsync(() => {
    let score = component.myForm.controls['score'];
    score.setValue(10.1);
    expect(score.valid).toBeFalsy();
    score.setValue(11);
    expect(score.valid).toBeFalsy();
    score.setValue(1000);
    expect(score.valid).toBeFalsy();
  }));

  it('Image is invalid when empty', fakeAsync(() => {
    let image = component.myForm.controls['image'];
    expect(image.valid).toBeFalsy();
  }));

  it('Description is invalid when empty', fakeAsync(() => {
    let description = component.myForm.controls['description'];
    expect(description.valid).toBeFalsy();
  }));

  it('handles name value changes', fakeAsync(() => {
    let name = component.myForm.controls['name'];
    name.setValue('Soba');
    tick();

    expect(fakeConsole.logs).toContain('Uneta vrednost je: \"Soba\" i ona je kraca od 6 karaktera');
  }));

  it('handles description value changes', fakeAsync(() => {
    let description = component.myForm.controls['description'];
    description.setValue('Opis');
    tick();

    expect(fakeConsole.logs).toContain('Uneta vrednost je: \"Opis\" i ona je kraca od 6 karaktera');
  }));

  it('handles description value changes (only 5 characters)', fakeAsync(() => {
    let description = component.myForm.controls['description'];
    description.setValue('Dugac');
    description.setValue('Dugacak opis');
    // tick();

    expect(fakeConsole.logs).toContain('Uneta vrednost je: \"Dugac\" i ona je kraca od 6 karaktera');
  }));

  it('Form is valid when all inputs are valid', fakeAsync(() => {
    let form = component.myForm;
    form.controls['name'].setValue('Soba');
    form.controls['price'].setValue(100);
    form.controls['image'].setValue("www.slika.com");
    form.controls['score'].setValue(7.5);
    form.controls['description'].setValue("Ovo je opis");

    expect(form.valid).toBeTruthy();
  }))

  it('Form emits a value', fakeAsync(() => {

    spyOn(component.add, 'emit');
   
    let form = component.myForm;
    form.controls['name'].setValue('Soba');
    form.controls['price'].setValue(100);
    form.controls['image'].setValue("www.slika.com");
    form.controls['score'].setValue(7.5);
    form.controls['description'].setValue("Ovo je opis");

    component.onSubmit(new Room(form.controls['name'].value, form.controls['description'].value, form.controls['price'].value, form.controls['image'].value, form.controls['score'].value));

    expect(component.add.emit).toHaveBeenCalled();
    expect(component.add.emit).toHaveBeenCalledWith(new Room(form.controls['name'].value, form.controls['description'].value, form.controls['price'].value, form.controls['image'].value, form.controls['score'].value));
  }))
});
