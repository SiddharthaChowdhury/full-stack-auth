class UtilObjects {
    public compareValues = (obj1: Object, obj2: Object): boolean => {
        //TODO: to be enhanced later
        return  JSON.stringify(obj1) === JSON.stringify(obj2);
    }
}

export const utilObjects =  new UtilObjects();