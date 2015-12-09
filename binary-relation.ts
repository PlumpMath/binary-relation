import HashMap = require('hashmap');
import * as events from "events";

class BinaryRelation<AType,BType> extends events.EventEmitter{
  aToBtoTrue:HashMap<AType,HashMap<BType,boolean>> = new HashMap<AType,HashMap<BType,boolean>>();
  bToAtoTrue:HashMap<BType,HashMap<AType,boolean>> = new HashMap<BType,HashMap<AType,boolean>>();
  _count = 0;
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
  remove(a_id?:AType,b_id?:BType):number{
    var cnt = 0;
    if(a_id === undefined){
      if(b_id === undefined){
        this.getBs().forEach((b_id)=>{
          cnt+=this.remove(undefined, b_id);
        })
      }else{
        this.getAs(b_id).forEach((a_id)=>{
          cnt+=this.remove(a_id, b_id);
        })
      }
    }else if(b_id === undefined){
      this.getBs(a_id).forEach((b_id)=>{
        cnt+=this.remove(a_id, b_id);
      })
    }else if(this.contains(a_id,b_id)){
      this.remove_xy(this.aToBtoTrue, a_id, b_id);
      this.remove_xy(this.bToAtoTrue, b_id, a_id);
      --this._count;
      this.emit('removed', a_id, b_id);
      cnt = 1;
    }
    return cnt;
  }
  add(a_id:AType,b_id:BType):number{
    if(!this.contains(a_id,b_id)){
      this.add_xy(this.aToBtoTrue, a_id, b_id);
      this.add_xy(this.bToAtoTrue, b_id, a_id);
      ++this._count;
      this.emit('added', a_id, b_id);
      return 1;
    }else{
      return 0;
    }
  }
  count(a_id?:AType,b_id?:BType):number{
    if(a_id===undefined){
      if(b_id===undefined){
        return this._count;
      }else{
        return this.countAs(b_id);
      }
    }else if(b_id==undefined){
      return this.countBs(a_id);
    }else{
      return this.contains(a_id, b_id) ? 1 : 0;
    }
  }
  contains(a_id?:AType,b_id?:BType):boolean{
    if(a_id === undefined){
      if(b_id === undefined){
        return 0 < this._count;
      }else{
        return this.bToAtoTrue.has(b_id);
      }
    }else if(b_id === undefined){
      return this.aToBtoTrue.has(a_id);
    }else{
      var bToTrue = this.aToBtoTrue.get(a_id);
      return !!(bToTrue && bToTrue.get(b_id));
    }
  }
  get(a_id?: AType, b_id?: BType): { a_id: AType;b_id:BType}[]{
    if(a_id === undefined){
      return [].concat.apply([], this.getAs(b_id).map((a_id) => this.get(a_id,b_id)));
    }else if(b_id === undefined){
      return this.getBs(a_id).map((b_id) => ({ a_id, b_id }));
    }else{
      return this.contains(a_id,b_id)?[{ a_id, b_id }]:[];
    }
  }
  getBs(a_id?:AType):BType[]{
    return (a_id===undefined) ? this.bToAtoTrue.keys() : this.getYs(this.aToBtoTrue, a_id);
  }
  getAs(b_id?:BType):AType[]{
    return (b_id===undefined) ? this.aToBtoTrue.keys() : this.getYs(this.bToAtoTrue, b_id);
  }
  countBs(a_id?:AType):number{
    return (a_id===undefined) ? this.bToAtoTrue.count() : this.countYs(this.aToBtoTrue, a_id);
  }
  countAs(b_id?:BType):number{
    return (b_id===undefined) ? this.aToBtoTrue.count() : this.countYs(this.bToAtoTrue, b_id);
  }

}
export = BinaryRelation;
