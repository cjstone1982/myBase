
export default function mylog ({dispatch,getState}){
    return next=> action =>{
       	//before
       	
        let nextValue=next(action)
        //after
        return nextValue;
    }
}