import { FormControl} from '@angular/forms'

export class ZipCodeControl extends FormControl {

    setValue(value: string, options: any) {
        if(!value) {
            super.setValue('');
            return;
        }
        if(value.match(/[^0-9|\-]/gi)) {
            super.setValue(this.value, {...options, emitModelToViewChange: true});
            return;
        }
        if(value.length>6) {
            super.setValue(this.value, {...options, emitModelToViewChange: true});
            return;
        }
        if(value.length===2 && this.value.length===3) {
            super.setValue(value, {...options, emitModelToViewChange: true});
            return;
        }
        if(value.length===2) {
            super.setValue(value+'-', {...options, emitModelToViewChange: true});
            return;
        }
        super.setValue(value, {...options, emitModelToViewChange: true});
    }
}
