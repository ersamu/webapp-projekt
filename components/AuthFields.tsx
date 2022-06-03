import { Button, Text, TextInput, ScrollView } from "react-native";
import { Base, Forms, Typography } from '../styles/';

export default function AuthFields({ auth, setAuth, title, submit, navigation}) {
    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>{title}</Text>
            <Text style={Typography.normal}>Genom att logga in kan du välja stationer som favoriter för att få en enklare översyn om förseningar.</Text>
            <Text style={Forms.label}>E-post</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setAuth({ ...auth, email: content })
                }}
                value={auth?.email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={Forms.label}>Lösenord</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setAuth({ ...auth, password: content })
                }}
                value={auth?.password}
                secureTextEntry={true}
                autoCapitalize="none"
            />
            <Button
                title={title}
                onPress={() => {
                    submit();
                }}
            />
            {title === "Logga in" &&
                <Button
                    title="Registrera istället"
                    onPress={() => {
                        navigation.navigate("Registrera");
                    }}
                />
            }
        </ScrollView>
    );
};

