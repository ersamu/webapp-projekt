import { render } from '@testing-library/react-native';
import Start from '../components/Start';

test('Texten "Få koll på läget i tågtrafiken" ska finnas på startsidan', async () => {
    const { getByText } = render(<Start />);
    const header = await getByText('Få koll på läget i tågtrafiken');

    expect(header).toBeDefined();
});

test('Det finns en bakgrundsbild på startsidan', async () => {
    const { getByTestId } = render(<Start />);
    const backgroundImage = await getByTestId('background-image');

    expect(backgroundImage).toBeDefined();
});
