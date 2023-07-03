import '../styles/components.css';

const ProgressBar = (maxValue: number) => {
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
        updateProgressBar();
    }

    updateProgressBar();

    return {
        element,
        setValue,
    };
};

export { ProgressBar };