export class IForm {
  protected isNotComplete = false;
  protected isComplete = false;
  protected isShadowed = false;

 protected constructor() {
   if (this.constructor.name === 'IForm') {
     throw new Error(`${this.constructor.name}: can not create instance of abstract class`);
   }
 }

 protected validate(obj) { return !!obj };

 protected onComplete(obj) {
   this.isComplete = true;
   this.isNotComplete = false;
 };

 protected onNotComplete() {
   this.isNotComplete = true;
   this.isComplete = false;
 };

  protected mySubmit(obj) {
    if (this.validate(obj)) {
      this.onComplete(obj);
    } else {
      this.onNotComplete();
    }
  }
}
