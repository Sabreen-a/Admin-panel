import { Directive, Input } from "@angular/core";
import { ValidationErrors, Validator } from "@angular/forms";
import { AbstractControl, NG_VALIDATORS} from "@angular/forms";
@Directive({
    selector:'[confirmvalidator]',
    providers:[{
     provide:NG_VALIDATORS,
     useExisting:ConfirmValidatorCustom,
     multi:true
    }]
})



export class ConfirmValidatorCustom implements Validator
{
@Input() confirmvalidator:any;
validate(control:AbstractControl):{[key:string]:any}|null{
 const ControlToCompare=control.parent?.get(this.confirmvalidator);
 if(ControlToCompare &&  ControlToCompare.value !==control.value){
     return {'notEqual':true};
 }
 
 return null;
}


}