import '../styles/components.css';

const ProgressBar = (maxValue: number, symbol?: string) => {
    let currentValue = 0;

    const element = document.createElement('div');
    element.className = 'progress';

    const bar = document.createElement('div');
    bar.className = 'bar';

    const fill = document.createElement('div');
    fill.className = 'fill';
    bar.appendChild(fill);

    element.appendChild(bar);

    const value = document.createElement('div');
    value.className = 'value';
    element.appendChild(value);

    function updateProgressBar() {
        const percentage = (currentValue / maxValue) * 100;
        fill.style.width = `${percentage}%`;
    }

    function setValue(val: number) {
        if (val < 0 || val > maxValue) {
            throw new Error('Invalid value for progress bar');
        }

        currentValue = val;
        value.innerText = val.toString();
        if (symbol) value.innerText += symbol;
        updateProgressBar();
    }

    updateProgressBar();

    return {
        element,
        setValue,
    };
};

const StatusCard = (ID: string) => {
    const element = document.createElement('div');
    element.id = ID;
    element.className = 'status-card';

    const valContainer = document.createElement('div');
    element.appendChild(valContainer);

    const val = document.createElement('div');
    valContainer.appendChild(val);
    const valUnit = document.createElement('div');
    valContainer.appendChild(valUnit);

    const msgContainer = document.createElement('div');
    element.appendChild(msgContainer);

    const msg = document.createElement('div');
    msgContainer.appendChild(msg);
    let msgIcon = document.createElement('img');
    msgContainer.appendChild(msgIcon);

    function setValue(
        value: number,
        unit: string,
        message: string,
        icon?: SVGElement
    ) {
        val.innerText = value.toString();
        valUnit.innerText = unit;
        msg.innerText = message;
        if (icon) {
            msgIcon.innerHTML = '';
            msgIcon.appendChild(icon);
        }
    }

    return {
        element,
        setValue,
    };
};

export { ProgressBar, StatusCard };
