import { render } from '@testing-library/react-native';
import AuthFields from '../components/AuthFields';

let auth = {};
const setAuth = (newAuth) => {
    auth = newAuth;
};

const mockSubmit = jest.fn();
const navigation = () => false;

test('Texten "Genom att logga in kan du välja stationer som favoriter för att få en enklare översyn om förseningar." finns på sidan där man kan logga in/registrera sig', async () => {
    const title = "Logga in";
    const { getByText } = render(<AuthFields
        auth={auth}
        setAuth={setAuth}
        submit={mockSubmit}
        title={title}
        navigation={navigation}
    />);

    const titleElements = getByText("Genom att logga in kan du välja stationer som favoriter för att få en enklare översyn om förseningar.");
    expect(titleElements).toBeDefined();
});

