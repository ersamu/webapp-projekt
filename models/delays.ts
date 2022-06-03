const delays = {
    getDelays: async function getDelays() {
        const response = await fetch("https://trafik.emilfolino.se/delayed");
        const result = await response.json();
        const resultFilter = result.data.filter(delay => delay.FromLocation);
        return resultFilter;
    }
}

export default delays;
