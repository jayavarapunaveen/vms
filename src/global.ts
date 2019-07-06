import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    inputchange(event) {
        if (event.target.value.length > 0) {
            event.target.parentNode.classList.add('form-active')
        }
        else {
            event.target.parentNode.classList.remove('form-active')
        }
    }
}