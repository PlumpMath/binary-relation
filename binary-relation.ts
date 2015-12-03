import HashMap = require('hashmap');
class BinaryRelation<AType,BType> {
  aToBtoTrue:HashMap<AType,HashMap<BType,boolean>> = new HashMap<AType,HashMap<BType,boolean>>();
  bToAtoTrue:HashMap<BType,HashMap<AType,boolean>> = new HashMap<BType,HashMap<AType,boolean>>();
  private remove_xy<XType,YType>(xToYtoTrue:HashMap<XType,HashMap<YType,boolean>>, x_id:XType, y_id:YType) {
    var yToTrue = xToYtoTrue.get(x_id);
    if (yToTrue) {
      yToTrue.remove(y_id);
      if (!yToTrue.count()) {
        xToYtoTrue.remove(x_id);
      }
    }
  }
  private add_xy<XType,YType>(xToYtoTrue:HashMap<XType,HashMap<YType,boolean>>, x_id:XType, y_id:YType) {
    var yToTrue = xToYtoTrue.get(x_id);
    if (yToTrue) {
      yToTrue.set(y_id, true);
    } else {
      xToYtoTrue.set(x_id, new HashMap<YType,boolean>(y_id, true));
    }
  }
  private getYs<XType,YType>(xToYtoTrue:HashMap<XType,HashMap<YType,boolean>>, x_id:XType){
    var yToTrue = xToYtoTrue.get(x_id);
    return yToTrue ? yToTrue.keys() : [];
  }
  private countYs<XType,YType>(xToYtoTrue:HashMap<XType,HashMap<YType,boolean>>, x_id:XType):number{
    var yToTrue = xToYtoTrue.get(x_id);
    return yToTrue ? yToTrue.count() : 0;
  }
  remove(a_id:AType,b_id:BType):void{
    this.remove_xy(this.aToBtoTrue, a_id, b_id);
    this.remove_xy(this.bToAtoTrue, b_id, a_id);
  }
  add(a_id:AType,b_id:BType):void{
    this.add_xy(this.aToBtoTrue, a_id, b_id);
    this.add_xy(this.bToAtoTrue, b_id, a_id);
  }
  contains(a_id:AType,b_id:BType):boolean{
    var bToTrue = this.aToBtoTrue.get(a_id);
    return !!(bToTrue && bToTrue.get(b_id));
  }
  getBs(a_id:AType):BType[]{
    return this.getYs(this.aToBtoTrue, a_id);
  }
  getAs(b_id:BType):AType[]{
    return this.getYs(this.bToAtoTrue, b_id);
  }
  countBs(a_id:AType):number{
    return this.countYs(this.aToBtoTrue, a_id);
  }
  countAs(b_id:BType):number{
    return this.countYs(this.bToAtoTrue, b_id);
  }

}
export = BinaryRelation;
