/**
 * Isolated test - Pipe as an example: A pipe can be tested completely independent 
 * from angular, because it has a transform function where we pass a string in and we 
 * get a string out. we could create it completely independent from a test ENV no need 
 * for TestBed or fixture.  A simple new MyPipe will do.
 */
import { Pipe } from "@angular/core";

@Pipe({
    name:'reverse'
})
export class ReversePipe{
    transform(value:string):string{
        return value.split('').reverse().join('');        
    }
}