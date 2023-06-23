interface LocationInfo {
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
