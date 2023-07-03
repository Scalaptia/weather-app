import '../styles/components.css';

const ProgressBar = () => {
    const element = document.createElement('div');
    element.className = 'progress';

    const bar = document.createElement('div');
    bar.className = 'bar';
    element.appendChild(bar);

    const val = document.createElement('span');
    element.appendChild(val);

    let currentValue = 0;
    const animationDuration = 500;

    const animate = (targetValue: number, startTime: number) => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        const remainingTime = Math.max(animationDuration - elapsedTime, 0);
        const progress = 1 - remainingTime / animationDuration;
        const animatedValue = Math.floor(
            currentValue + progress * (targetValue - currentValue)
        );

        const currentRotation = 45 + (animatedValue / 15) * 180;
        bar.style.transform = `rotate(${currentRotation}deg)`;
        val.innerText = animatedValue.toString();

        if (remainingTime > 0) {
            const frameRate = 60; // Adjust the frame rate if necessary
            const frameTime = 1000 / frameRate;
            const delay = Math.max(frameTime - (currentTime - startTime), 0);
            setTimeout(() => {
                requestAnimationFrame(() => animate(targetValue, startTime));
            }, delay);
        } else {
            currentValue = targetValue;
        }
    };

    function setProgress(targetValue: number) {
        val.innerText = targetValue.toString();
        const parsedValue = parseInt(val.innerText, 10);
        const startTime = Date.now();
        animate(parsedValue, startTime);
    }

    return {
        element,
        setProgress,
    };
};

export { ProgressBar };
