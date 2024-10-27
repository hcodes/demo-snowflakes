interface DefaultParams {
    container: HTMLElement;
    color: string;
    speed: number;
    count: number;
    minOpacity: number;
    maxOpacity: number;
    minSize: number;
    maxSize: number;
    rotation: boolean;
    wind: boolean;
    [key: string]: boolean | HTMLElement | number | string | undefined;
}

export const defaultParams: DefaultParams = {
    container: document.body,
    color: '#5ECDEF',
    count: 50,
    speed: 1,
    rotation: true,
    minOpacity: 0.6,
    maxOpacity: 1,
    minSize: 10,
    maxSize: 25,
    wind: true,
};
