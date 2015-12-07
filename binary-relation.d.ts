declare class BinaryRelation<AType, BType> {
    aToBtoTrue: HashMap<AType, HashMap<BType, boolean>>;
    bToAtoTrue: HashMap<BType, HashMap<AType, boolean>>;
    private remove_xy<XType, YType>(xToYtoTrue, x_id, y_id);
    private add_xy<XType, YType>(xToYtoTrue, x_id, y_id);
    private getYs<XType, YType>(xToYtoTrue, x_id);
    private countYs<XType, YType>(xToYtoTrue, x_id);
    remove(a_id: AType, b_id: BType): void;
    add(a_id: AType, b_id: BType): void;
    contains(a_id: AType, b_id: BType): boolean;
    getBs(a_id: AType): BType[];
    getAs(b_id: BType): AType[];
    countBs(a_id: AType): number;
    countAs(b_id: BType): number;
}

declare module "binary-relation" {
    export = BinaryRelation;
}
