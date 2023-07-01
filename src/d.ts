interface CurrentInfo {
    Location: {
        name: string;
        region: string;
        country: string;
    };
    Temperature: {
        celsius: number;
        farenheit: number;
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
    Updated: Date;
}

interface DayInfo {
    Date: Date;
    MaxTemperature: {
        celsius: number;
        farenheit: number;
    };
    MinTemperature: {
        celsius: number;
        farenheit: number;
    };
    Condition: {
        text: string;
        icon: string;
    };
}

interface LocationInfo {
    currentLocationInfo: CurrentInfo;
    day1LocationInfo: DayInfo;
    day2LocationInfo: DayInfo;
    day3LocationInfo: DayInfo;
    day4LocationInfo: DayInfo;
    day5LocationInfo: DayInfo;
    day6LocationInfo: DayInfo;
    day7LocationInfo: DayInfo;
}
