import { render } from '@testing-library/react-native';
import TrainMap from '../components/TrainMap';

test('Texten "Alla förseningar på karta" ska finnas', async () => {
    const { getByText } = render(<TrainMap />);
    const header = await getByText('Alla förseningar på karta');

    expect(header).toBeDefined();
});

test('En karta ska finnas', async () => {
    const { getByTestId } = render(<TrainMap />);
    const map = await getByTestId('map of delays');

    expect(map).toBeDefined();
});
