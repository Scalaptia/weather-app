interface CurrentInfo {
    Location: {
        name: string;
        region: string;
        country: string;
    };
    Temperature: {
        celsius: number;
        fahrenheit: number;
    };
    Condition: {
        text: string;
        icon: string;
    };
    Wind: {
        mph: number;
        kph: number;
        direction: string;
    };
    Humidity: number;
    Cloud: number;
    Visibility: {
        km: number;
        miles: number;
    };
    Updated: Date;
}

interface DayInfo {
    Date: Date;
    MaxTemperature: {
        celsius: number;
        fahrenheit: number;
    };
    MinTemperature: {
        celsius: number;
        fahrenheit: number;
    };
    Condition: {
        text: string;
        icon: string;
    };
    UV: number;
}

interface LocationInfo {
    currentLocationInfo: CurrentInfo;
    days: DayInfo[];
}

interface WindDirectionMapping {
    [directionCode: string]: string;
}

interface WindIcons {
    [directionCode: string]: SVGElement;
}
