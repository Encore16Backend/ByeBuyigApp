import axios from "axios";
axios.defaults.baseURL = 'http://35.170.126.111:8081';

export const ACCESS_KEY = 'AKIA2TGTQPFYZOPMQYPK';
export const SECRET_ACCESS_KEY = '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';
export const REGION = 'ap-northeast-2';
export const S3_BUCKET = 'byebuying';

// 'http://127.0.0.1:8081' 스프링
// http://192.168.0.208:8081 플라스크

// aws
// http://35.170.126.111:8081


export const getStringPrice = (intPrice)=>{
    if (intPrice != null || intPrice != undefined){
        const StringPrice = intPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return StringPrice;
    }
}
