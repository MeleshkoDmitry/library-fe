import { ErrorHandler } from '@angular/core';

export class CustomErrorHandler implements ErrorHandler {
    handleError(error) {
        console.log(`Custom Error Handler:`, error);
    }
}
