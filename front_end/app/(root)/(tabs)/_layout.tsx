import icons from '@/constants/icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, Redirect } from 'expo-router';
import { View, Image } from 'react-native';

const TabIcon = ({icon, color, focused}:any) => {
    return(
        <View>
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6"
            />
        </View>
    )
}
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#39c0fb', tabBarShowLabel: false }}>
        <Tabs.Screen
        name="communities"
        options={{
          title: 'Communities',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon
            icon={icons.group}
            color={color}
            name="communities"
            focused={focused}
            />
          )
        }}/>
        <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon
            icon={icons.user}
            color={color}
            name="profile"
            focused={focused}
            />
          )
        }}/>
    </Tabs>
  );
}
