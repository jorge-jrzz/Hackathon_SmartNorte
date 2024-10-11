import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

const Page = () => {
    const { type } = useLocalSearchParams<{ type: string}>();
    console.log("Page | type | ", type);
    return (
        <View>
            <Text>Page</Text>
        </View>
    )
}

export default Page;