export interface Payload {
    options: {};
    meta: {
        rid: string;
        ts: number;
        hasCallback: boolean;
    };
    userId?: string;
    anonymousId: string;
}
export interface TrackPayload extends Payload {
    type: 'track';
    event: string;
    properties: {
        [key: string]: any;
    };
}
export interface IdentifyPayload extends Payload {
    type: 'identify';
    traits: {
        [key: string]: any;
    };
}
export interface PagePayload extends Payload {
    type: 'page';
    properties: {
        title: string;
        url: string;
        path: string;
        hash: string;
        search: string;
        width: number;
        height: number;
        [key: string]: any;
    };
}
interface BaseData {
    snekAnalyticsId: string;
    ip: {
        callingCode: string;
        city: string;
        countryCapital: string;
        country_code: string;
        country_name: string;
        currency: string;
        currencySymbol: string;
        emojiFlag: string;
        flagUrl: string;
        ip: string;
        is_in_european_union: boolean;
        latitude: number;
        longitude: number;
        metro_code: number;
        organisation: string;
        region_code: string;
        region_name: string;
        suspiciousFactors: {
            isProxy: boolean;
            isSpam: boolean;
            isSuspicious: boolean;
            isTorNode: boolean;
        };
        time_zone: string;
        zip_code: string;
    };
    fingerprint?: string;
}
declare type Data<T> = BaseData & {
    payload: T;
};
export declare type WriteData = Data<TrackPayload> | Data<IdentifyPayload> | Data<PagePayload>;
declare const writeData: import("@snek-at/functions/dist/functions").SnekFunction<WriteData, void>;
export default writeData;
